const asyncHandler = require('express-async-handler');

const Service = require('../models/serviceModel')


// @desc    Fetch all records
// @route   GET /api/services
// @access  Private/Admin
const getServices = asyncHandler(async (req, res) => {
    const qSearch=req.query.search
    //testing
    //console.log(qSearch)
    let services

    if(qSearch){
        services = await Service.find(
            {
                $text: {$search: qSearch}
            }
        )
    }
    else{
        services = await Service.find();
    }
    
    res.status(200).json(services);

})
  
// @desc    Fetch logged in user record
// @route   GET /api/records/:id
// @access  Private/Admin
const getServiceById = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id)
  
    if (service) {
        res.status(200).json(service)
    } else {
        res.status(404)
        throw new Error('Service not found')
    }
})
  
// @desc    Create record
// @route   POST /api/records
// @access  Private
const addService = asyncHandler(async (req, res) => {
    
    const {serviceId,serviceName,serviceCharge,serviceDescription,serviceImage} = req.body;

    const services = new Service({
        serviceId: req.body.serviceId,
        serviceName: req.body.serviceName,
        serviceCharge:req.body.serviceCharge,
        serviceDescription: req.body.serviceDescription,
        serviceImage: req.body.serviceImage,
    })

    const savedService = await services.save();

    res.status(200).json(savedService); 
})
  
// @desc    Update record
// @route   PUT /api/records/:id
// @access  Private
const updateService = asyncHandler(async (req, res) => {

    const services = await Service.findById(req.params.id)
  
    if (services) {
  
        const updatedService = await Service.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedService)

    } else {
        res.status(404)
        throw new Error('Service not found')
    }
  })

// @desc    Delete record
// @route   DELETE /api/records/:id
// @access  Private
const deleteService = asyncHandler(async (req, res) => {
    const services = await Service.findById(req.params.id)
  
    if (services) {
        await services.deleteOne();
        res.status(200).json({message: 'Service removed'})
    } else {
        res.status(404)
        throw new Error('Service not found')
    }
})

module.exports = {getServices, getServiceById, addService, updateService, deleteService}