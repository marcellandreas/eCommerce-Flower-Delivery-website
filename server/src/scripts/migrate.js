// src/scripts/migrate.js
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');

const migrationsDir = path.join(__dirname, '../migrations');

const executeSqlFile = async (filePath) => {
  const sql = fs.readFileSync(filePath, 'utf8');
  
  // Split by empty lines to separate UP and DOWN migrations
  const sections = sql.split(/--\s*DOWN Migration/i);
  const upMigration = sections[0].replace(/--\s*UP Migration/i, '').trim();
  
  return upMigration;
};

const runMigrations = async (direction = 'up') => {
  try {
    console.log(`\n🚀 Running migrations (${direction})...\n`);

    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    if (direction === 'down') {
      files.reverse();
    }

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      console.log(`📄 Processing: ${file}`);

      try {
        const sql = await executeSqlFile(filePath);
        
        if (direction === 'up') {
          await sequelize.query(sql);
          console.log(`✅ ${file} - UP migration completed`);
        } else {
          // For down migrations, extract DROP statements
          const fullSql = fs.readFileSync(filePath, 'utf8');
          const downSection = fullSql.split(/--\s*DOWN Migration/i)[1];
          
          if (downSection) {
            const dropStatements = downSection
              .split('\n')
              .filter(line => line.trim().startsWith('DROP'))
              .join('\n');
            
            if (dropStatements) {
              await sequelize.query(dropStatements);
              console.log(`✅ ${file} - DOWN migration completed`);
            }
          }
        }
      } catch (error) {
        console.error(`❌ Error in ${file}:`, error.message);
        throw error;
      }
    }

    console.log(`\n✨ All migrations completed successfully!\n`);
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
};

// Get direction from command line
const direction = process.argv[2] || 'up';

if (!['up', 'down'].includes(direction)) {
  console.error('Usage: node migrate.js [up|down]');
  process.exit(1);
}

runMigrations(direction);