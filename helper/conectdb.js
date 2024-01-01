const mongoose = require('mongoose')
const { base_url } = require('./utils')

const base = 'mongodb+srv://onwunemechukwuma:bigtiger123@cluster0.nibafpu.mongodb.net/dashx?retryWrites=true&w=majority'
const coonectdb = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(base)
.then((result) => console.log('base connetced'))
.catch((err) => console.log(err))
}


module.exports = {
    coonectdb
}