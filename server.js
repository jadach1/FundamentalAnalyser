const env = require("./config/env.js")
const db  = require("./main.js")

const { Pool, Client } = require('pg')

const pool = new Pool({
  user: env.username,
  host: env.host,
  database: env.database,
  password: env.password,
  port: env.port,
})


let data = db.dataFilling().then(e => {
  e.forEach(element => {
    pool.query(element, (err,res) => {
      if(err){
        console.log("error inserting " + err)
      } else {
        console.log("success on inserting " + element)
      }
    })
  })
});
//sort by date

// let array = db.createTables();
// array.then(e=>{
//   e.forEach(element => {
//     pool.query(element,(err,res) => {
//       if(err){
//         console.log("error creating table " + err);
//       } 
//       else {
//         console.log("successfully created table")  
//       }
//     })
//   })
// })

// pool.query('select * from assets', (err, res) => {
//   if(err){
//     console.log("error connecting to db " + err);
//   }
//   else {
//     //console.log(res)
//   }
//   //pool.end()
// })





// const client = new Client({
//   user: env.username,
//   host: env.host,
//   database: env.database,
//   password: env.password,
//   port: env.port,
// })
// client.connect()
// client.query('create table finance.x()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })