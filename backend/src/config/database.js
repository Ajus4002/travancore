const { Sequelize } = require('sequelize');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
require('dotenv').config();

const sqlitePath = path.join(__dirname, '../../travancore_dev.sqlite');

function autoStartPostgres() {
  const pgDataPath = path.join(__dirname, '../../pgdata');
  if (!fs.existsSync(pgDataPath)) return;

  const socketFile = path.join(pgDataPath, '.s.PGSQL.5432');
  const pgCtlPaths = [
    '/usr/lib/postgresql/16/bin/pg_ctl',
    '/usr/lib/postgresql/15/bin/pg_ctl',
    'pg_ctl'
  ];

  let pgCtl = pgCtlPaths.find(p => {
    try {
      if (p.startsWith('/')) return fs.existsSync(p);
      execSync('which pg_ctl 2>/dev/null');
      return true;
    } catch {
      return false;
    }
  }) || 'pg_ctl';

  let isRunning = false;
  try {
    const status = execSync(`${pgCtl} -D "${pgDataPath}" status`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    if (status.includes('server is running')) {
      isRunning = true;
    }
  } catch (e) {
    if (e.stdout && e.stdout.includes('server is running')) {
      isRunning = true;
    }
  }

  if (isRunning) {
    return;
  }

  // PostgreSQL is not running: clean up stale socket and pid files if any exist
  try {
    if (fs.existsSync(path.join(pgDataPath, 'postmaster.pid'))) {
      fs.unlinkSync(path.join(pgDataPath, 'postmaster.pid'));
    }
    if (fs.existsSync(socketFile)) {
      fs.unlinkSync(socketFile);
    }
    if (fs.existsSync(socketFile + '.lock')) {
      fs.unlinkSync(socketFile + '.lock');
    }
  } catch (e) {
    // Ignore cleanup errors
  }

  try {
    execSync(`${pgCtl} -D "${pgDataPath}" -o "-k ${pgDataPath} -p 5432" -l "${pgDataPath}/postgres.log" start`, { stdio: 'ignore' });
  } catch (e) {
    // Ignore background start errors
  }

  // Wait up to 3 seconds for socket file to appear
  for (let i = 0; i < 15; i++) {
    if (fs.existsSync(socketFile)) break;
    try {
      execSync('sleep 0.2');
    } catch {}
  }
}

let sequelize;

if (process.env.DB_NAME && process.env.DB_USER) {
  autoStartPostgres();

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
      retry: {
        max: 3
      }
    }
  );
} else {
  console.log(`[Database] Using SQLite local database at ${sqlitePath}`);
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: sqlitePath,
    logging: false
  });
}

module.exports = sequelize;
