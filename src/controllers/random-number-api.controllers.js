const RandomNumber = require('../models/random-number-api.models');

exports.generateRandomNumber = async (req, res) => {
    try {
        const number = Math.floor(Math.random() * 100) + 1;
        const randomNumber = await RandomNumber.create({ number });
        console.log(`${randomNumber}`);
        res.status(201).json(randomNumber);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to generate random number'});
    }
}

exports.getAllRandomNumbers = async (req, res) => {
    try {
        const randomNumbers = await RandomNumber.find();
        res.json(randomNumbers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve random numbers'});
    }
};

exports.getRandomNumbersById = async (req, res) => {
    try {
        const randomNumber = await RandomNumber.findById(req.params.id);
        if (!randomNumber) {
            return res.status(404).json({ error: 'Random number not found!'});
        }
        console.log(`Found! \n${randomNumber}`);
        res.json(randomNumber);
    } catch (error) {
        console.error(error);
        res.status(500).json;
    }
}

exports.deleteRandomNumberById = async (req, res) => {
    try {
        const randomNumber = await RandomNumber.findByIdAndDelete(req.params.id);
        if(!randomNumber) {
            return res.status(404).json({ error:"Random number not found!"});
        }
        console.log(`Deleted! ${randomNumber}`);
        res.json({ message: ` ${randomNumber._id} : ${randomNumber.number} | Random number deleted successfully`});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete random number'});
    }
};