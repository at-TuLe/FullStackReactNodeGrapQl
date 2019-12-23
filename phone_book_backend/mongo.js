const mongoose = require('mongoose')
require('dotenv').config()

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const url =process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)
if (process.argv[3]) {
  const person = new Person({
    name: process.argv[3], 
    number: process.argv[4],
  })
  person.save().then(res => {
    console.log(res)
    mongoose.connection.close()
  })
}

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
    mongoose.connection.close()
  })
})
