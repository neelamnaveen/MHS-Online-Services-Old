const express = require('express');
const router = express.Router();
const services = require('../Models/Services');

//Inserting(Creating) Data:
router.post("/insertservice", async (req, res) => {
    const { Name, Contact, ServiceName, ServiceComments } = req.body;

    try {
        // const pre = await services.findOne({ Contact: Contact })
        // console.log(pre);

        // if (pre) {
        //     res.status(422).json("Service is already added.")
        // }
        // else {
            const addService = new services({ Name, Contact, ServiceName, ServiceComments, Status:"Pending" })

            await addService.save();
            res.status(201).json(addService)
            console.log(JSON.stringify(addService))
        // }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/services', async (req, res) => {

    try {
        const getServices = await services.find({})
        console.log(getServices);
        res.status(201).json(getServices);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/services/:id', async (req, res) => {

    try {
        const getService = await services.findById(req.params.id);
        console.log(getService);
        res.status(201).json(getService);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updateservice/:id', async (req, res) => {
    const { Status, ServiceName, serviceComments, Contact } = req.body;

    try {
        const updateServices = await services.findByIdAndUpdate(req.params.id, { Status, ServiceName, serviceComments, Contact }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateServices);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deleteservice/:id', async (req, res) => {

    try {
        const deleteService = await services.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteService);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;