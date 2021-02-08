const env = require("./env.js");

let sequelize = new Sequelize(env.database, env.username, env.password, {
    host:             env.host,
    dialect:          env.dialect,
    operatorsAliases: false,
    pool: {
        max:          env.max,
        min:          env.pool.min,
        acquire:      env.pool.acquire,
        idle:         env.pool.idle
    }
}); 

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
