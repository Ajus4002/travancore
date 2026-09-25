const { Sequelize } = require('sequelize');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config();

const pgDataPath = path.join(__dirname, '../../pgdata');
const socketFile = path.join(pgDataPath, '.s.PGSQL.5432');

function probeSocketSync(socketPath) {
  if (!fs.existsSync(socketPath)) return false;
  try {
    execSync(`python3 -c "import socket, sys; s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM); s.settimeout(0.5); s.connect('${socketPath}'); sys.exit(0)" 2>/dev/null`, { stdio: 'pipe' });
    return true;
  } catch (e) {
    return false;
  }
}

function ensurePostgresRunning() {
  if (!fs.existsSync(pgDataPath)) {
    console.error(`[Database Error] PostgreSQL data directory does not exist at ${pgDataPath}`);
    return;
  }

  // 1. Synchronously probe Unix socket
  if (probeSocketSync(socketFile)) {
    return; // PostgreSQL is active and accepting connections
  }

  console.log('[Database] PostgreSQL is not running. Launching PostgreSQL cluster...');

  const pgctl = fs.existsSync('/usr/lib/postgresql/16/bin/pg_ctl') 
    ? '/usr/lib/postgresql/16/bin/pg_ctl'
    : fs.existsSync('/usr/lib/postgresql/15/bin/pg_ctl')
    ? '/usr/lib/postgresql/15/bin/pg_ctl'
    : 'pg_ctl';

  // 2. Stop lingering processes and force-remove all stale lock files
  try {
    execSync(`"${pgctl}" -D "${pgDataPath}" stop -m immediate 2>/dev/null`, { stdio: 'pipe' });
  } catch (e) {}

  fs.rmSync(path.join(pgDataPath, 'postmaster.pid'), { force: true });
  fs.rmSync(socketFile, { force: true });
  fs.rmSync(socketFile + '.lock', { force: true });
  fs.rmSync('/tmp/.s.PGSQL.5432', { force: true });
  fs.rmSync('/tmp/.s.PGSQL.5432.lock', { force: true });

  // 3. Start PostgreSQL with socket-only binding (-h '')
  try {
    execSync(`"${pgctl}" -D "${pgDataPath}" -o "-h '' -k ${pgDataPath} -p 5432" -l "${pgDataPath}/postgres.log" start`, { stdio: 'pipe' });
  } catch (e) {
    try {
      execSync(`nohup /usr/lib/postgresql/16/bin/postgres -D "${pgDataPath}" -h "" -k "${pgDataPath}" -p 5432 > "${pgDataPath}/postgres.log" 2>&1 &`, { stdio: 'ignore' });
    } catch (err) {}
  }

  // 4. Loop wait up to 5 seconds for PostgreSQL socket to accept connections
  let connected = false;
  for (let i = 0; i < 25; i++) {
    if (probeSocketSync(socketFile)) {
      connected = true;
      break;
    }
    try { execSync('sleep 0.2'); } catch {}
  }

  if (connected) {
    console.log('[Database] PostgreSQL engine started and ready!');
  } else {
    console.error('[Database Error] Failed to start PostgreSQL engine after 5 seconds.');
  }
}

// Guarantee PostgreSQL server is running before Sequelize exports
ensurePostgresRunning();

const dbName = process.env.DB_NAME || 'travancore_db';
const dbUser = process.env.DB_USER || 'aju';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = (process.env.DB_HOST && process.env.DB_HOST.startsWith('/')) ? process.env.DB_HOST : pgDataPath;
const dbPort = process.env.DB_PORT || 5432;

console.log(`[Database] Connecting exclusively to PostgreSQL database '${dbName}' at socket path ${dbHost}...`);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: false,
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  retry: { max: 5 }
});

module.exports = sequelize;
