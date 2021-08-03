const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
  "workout-log",
  process.env.dbName,
  process.env.dbPass,
  {
    host: "localhost",
    dialect: "postgres",
  }
)

async function sqlize() {
  try {
    await sequelize.authenticate()  
    console.log(`🔥 Connection to ${sequelize.config.database} has been established successfully. 🔥`)
  } catch (err) {
    console.error(`😱 Unable to connect to ${sequelize.config.database}: 😱`, err)       
  }
}

sqlize()

module.exports = sequelize