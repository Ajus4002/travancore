const {
  sequelize,
  User,
  OnboardingDetails,
  BankAccount,
  UserTradingSetup,
  MarketInstrument,
  Position,
  Transaction,
  ReferralRecord,
  LoginHistory,
  Notification,
  ResearchCall,
  ResearchNews
} = require('./models');
const seedDatabase = require('./seed');

async function createAllTables() {
  try {
    console.log('====================================================');
    console.log('TRAVANCORE PLATFORM — POSTGRESQL TABLE CREATION');
    console.log('====================================================\n');

    console.log('[PostgreSQL] Connecting to PostgreSQL database server...');
    await sequelize.authenticate();
    console.log('[PostgreSQL] Connected successfully!\n');

    console.log('[PostgreSQL] Creating & Synchronizing all database tables (FORCE SYNC)...');
    await sequelize.sync({ force: true });
    console.log('[PostgreSQL] All 12 tables created successfully in PostgreSQL!\n');

    console.log('[PostgreSQL] Populating tables with initial data...');
    await seedDatabase();
    console.log('[PostgreSQL] Initial data seeded successfully!\n');

    // Query & Verify PostgreSQL Tables
    console.log('====================================================');
    console.log('VERIFYING CREATED POSTGRESQL TABLES & ROW COUNTS');
    console.log('====================================================');

    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    console.log(`Total PostgreSQL Tables Created: ${tables.length}\n`);

    for (const t of tables) {
      const tableName = t.table_name;
      const [counts] = await sequelize.query(`SELECT COUNT(*) as count FROM "${tableName}"`);
      const rowCount = counts[0].count;
      console.log(` ✓ Table: ${tableName.padEnd(25)} | Rows: ${rowCount}`);
    }

    console.log('\n====================================================');
    console.log('POSTGRESQL TABLE CREATION COMPLETED SUCCESSFULLY!');
    console.log('====================================================');

  } catch (error) {
    console.error('[PostgreSQL Error] Table creation failed:', error);
    process.exit(1);
  }
}

createAllTables();
