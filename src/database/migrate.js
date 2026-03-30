const fs = require('fs')
const path = require('path')
const database = require('../infra/database')

async function runMigrations () {
  const migrationDir = path.join(__dirname, 'migrations')
  const migrationFiles = fs
    .readdirSync(migrationDir)
    .filter(file => file.endsWith('.sql'))
    .sort()

  for (const fileName of migrationFiles) {
    const filePath = path.join(migrationDir, fileName)
    const sql = fs.readFileSync(filePath, 'utf8')
    await database.none(sql)
    console.log(`migration applied: ${fileName}`)
  }
}

runMigrations()
  .then(function () {
    database.$pool.end()
    console.log('migrations finished')
  })
  .catch(function (error) {
    database.$pool.end()
    console.error('migration error:', error.message)
    process.exit(1)
  })
