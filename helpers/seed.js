const Roles = require('../models/role')
const db = require('../DB/index')

const roles = [{role:'admin'}, {role:'user'}]

const seed = () => {
   Roles.bulkCreate(roles).then(role => Promise.all(role))
}


db.sync().then(seed).then(console.log('Tutto aposto'))
.catch(error => console.log('Tutto male'))