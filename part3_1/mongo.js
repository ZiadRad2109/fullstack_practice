const mongoose = require('mongoose')

const password = process.argv[2]
const nameIn = process.argv[3]
const numIn = process.argv[4]
const url = `mongodb+srv://ziadhradwan2109_db_user:${password}@cluster0.ztjzru7.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const main = async () => {
  try {
    await mongoose.connect(url, { family: 4 })

    const contact = new Contact({
      name: nameIn,
      number: numIn,
    })
    await contact.save().then(() => {
      console.log(`added ${nameIn} number ${numIn} to phonebook`)
    }).catch((error) => {
      console.log(error)
    })
  }
  catch (error) {
    console.error('Error:', error.message)
  }
  finally {
    Contact.find({}).then((found) => {
      found.forEach((cont) => {
        console.log(cont)
      })
      mongoose.connection.close()
    })
  }
}

main()
