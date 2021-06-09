
const mongoose = require('mongoose');


const carsSchema = new mongoose.Schema({
    year: Number,
    make: String,
    model: String,
});


module.exports = mongoose.model('cars', carsSchema);