
const carsSchema = require('../models/carModel');


// Add car to database
const addCar = (req, res) => {
    const body = req.body;
    if(!body){
        return res
                .status(400)
                .json({success: false, error: 'Please enter a Car'});
    }

    const newCar = new carsSchema(body)

    if(!newCar){
        return res.status(400).json({
            success: false,
            error: err
        });
    }

    newCar.save()
           .then(() => {
               return res.status(201).json({
                   success: true,
                   id: newCar._id,
                   message: 'Sucessfully added a new car'
               });
           })
           .catch(error => {
               return res.status(400).json({
                   error,
                   message: 'Car not added'
               });
           })
};


// Get all cars from database
const getAllCars = (req, res) => {
    carsSchema.find({}, function(err, foundCars){
        if(err){
          return res
                    .status(400)
                    .json({success: false, error: err});
        }else{
        
            return res
                .status(200)
                .json({success: true, data: foundCars});
        }
      }).catch(err => console.log(err));
};


// Get all car makes from database
const getAllMakes = async (req, res) => {

    await carsSchema.distinct('make', (err, foundMakes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({success: true, data: foundMakes});
    }).catch(err => console.log(err));

};


// Get all cars by selected year from database
const getAllCarsByYear = async (req, res) => {

    selectedYear = req.params.carYear;
    await carsSchema.find(
        {year: selectedYear}, 
        function(err, foundMakes){
            if(err){
                return res
                          .status(400)
                          .json({success: false, error: err});
            }else{
                return res
                          .status(200)
                          .json({success: true, data: foundMakes});
            }
    }).catch(err => console.log(err));
}


// Get all distinct makes by year from database
const getAllDistinctMakesByYear = async (req, res) => {

    selectedYear = req.params.carYear;
    await carsSchema.distinct('make',{year: selectedYear}, (err, foundMakes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({success: true, data: foundMakes});
    }).catch(err => console.log(err));

};


// Get all models of selected car make from database
const getAllModelsofMake = async (req, res) => {

    selectedMake = req.params.carMake;
    await carsSchema.find(
        {make: selectedMake}, 
        function(err, foundModels){
            if(err){
                return res
                          .status(400)
                          .json({success: false, error: err});
            }else{
                return res
                          .status(200)
                          .json({success: true, data: foundModels});
            }
    }).catch(err => console.log(err));
}


// Get all models of car make by year from database
const getAllModelsofMakeByYear = async (req, res) => {

    selectedMake = req.params.carMake;
    selectedYear = req.params.carYear;
    await carsSchema.find(
        {make: selectedMake, year: selectedYear},
        function(err, foundModels){
            if(err){
                return res
                          .status(400)
                          .json({success: false, error: err});
            }else{
                return res
                          .status(200)
                          .json({success: true, data: foundModels});
            }
    }).catch(err => console.log(err));
}


// Get all distinct car years from database
const getAllDistictYears = async (req, res) => {

    await carsSchema.distinct('year', (err, foundYears) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({success: true, data: foundYears});
    }).catch(err => console.log(err));
}



module.exports = {
    addCar,
    getAllCars,
    getAllMakes,
    getAllCarsByYear,
    getAllModelsofMake,
    getAllModelsofMakeByYear,
    getAllDistictYears,
    getAllDistinctMakesByYear,
};