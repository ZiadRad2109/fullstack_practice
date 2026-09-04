const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
// const password = process.argv[2]
// const url = `mongodb+srv://ziadhradwan2109_db_user:${password}@cluster0.ztjzru7.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 }).then(
  () => { console.log('connected') },
)
  .catch((error) => {
    console.log('error', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: { type: String, minLength: 8, required: true, validate: { validator: value => /^[0-9]{2,3}[-][0-9]{5,}$/.test(value), message: 'Invalid phone number format. Expected format: XX-XXXXXXX or XXX-XXXXXXX' } },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
