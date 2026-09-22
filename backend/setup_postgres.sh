#!/bin/bash
echo "=== Travancore Trading Platform — PostgreSQL Setup ==="

# 1. Start PostgreSQL Service
echo "[1/3] Starting PostgreSQL service..."
sudo service postgresql start || sudo pg_ctlcluster 16 main start || sudo pg_ctlcluster 15 main start

# 2. Create Database & User
echo "[2/3] Creating PostgreSQL database 'travancore_db' and user..."
sudo -u postgres psql -c "CREATE DATABASE travancore_db;" 2>/dev/null || echo "Database travancore_db already exists or created."
sudo -u postgres psql -c "CREATE USER travancore_user WITH PASSWORD 'travancore_pass';" 2>/dev/null || echo "User travancore_user already exists."
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE travancore_db TO travancore_user;" 2>/dev/null
sudo -u postgres psql -d travancore_db -c "GRANT ALL ON SCHEMA public TO travancore_user;" 2>/dev/null

# 3. Seed Database
echo "[3/3] Running database migrations & seed data..."
cd "$(dirname "$0")"
node src/seed.js

echo "=== Setup Completed Successfully! ==="
