const asyncHandler = require('express-async-handler');

const ServiceRecord = require('../models/servicerecordsModel')


// @desc    Fetch all records
// @route   GET /api/records
// @access  Private/Admin
const getServiceRecords = asyncHandler(async (req, res) => {

    const qSearch=req.query.search
    //testing
    //console.log(qSearch)
    let servicerecords

    if(qSearch){
        servicerecords = await ServiceRecord.find(
            {
                $text: {$search: qSearch}
            }
        )
    }
    else{
        servicerecords = await ServiceRecord.find();
    }

    
    res.status(200).json(servicerecords);

})
  
// @desc    Fetch logged in user record
// @route   GET /api/records/:id
// @access  Private
const getServiceRecordById = asyncHandler(async (req, res) => {
    const servicerecord = await ServiceRecord.findById(req.params.id)
  
    if (servicerecord) {
        res.status(200).json(servicerecord)
    } else {
        res.status(404)
        throw new Error('Service Record not found')
    }
})
  
// @desc    Create record
// @route   POST /api/records
// @access  Private
const addServiceRecord = asyncHandler(async (req, res) => {
    
    const {recordId,serviceName,customerName,vetName,petType,date,serviceCharge} = req.body;

    const servicerecord = new ServiceRecord({
        recordId: req.body.recordId,
        serviceName: req.body.serviceName,
        customerName: req.body.customerName,
        vetName: req.body.vetName,
        petType: req.body.petType,
        date: req.body.date,
        serviceCharge:req.body.serviceCharge,
    })

    const savedServiceRecord = await servicerecord.save();

    res.status(200).json(savedServiceRecord); 
})
  
// @desc    Update record
// @route   PUT /api/record/:id
// @access  Private
const updateServiceRecord = asyncHandler(async (req, res) => {

    const servicerecord = await ServiceRecord.findById(req.params.id)
  
    if (servicerecord) {
  
        const updatedServiceRecord = await ServiceRecord.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedServiceRecord)

    } else {
        res.status(404)
        throw new Error('Service Record not found')
    }
  })

// @desc    Delete record
// @route   DELETE /api/record/:id
// @access  Private
const deleteServiceRecord = asyncHandler(async (req, res) => {
    const servicerecord = await ServiceRecord.findById(req.params.id)
  
    if (servicerecord) {
        await servicerecord.deleteOne();
        res.status(200).json({message: 'Service Record removed'})
    } else {
        res.status(404)
        throw new Error('Service Record not found')
    }
})

module.exports = {getServiceRecords, getServiceRecordById, addServiceRecord, updateServiceRecord, deleteServiceRecord}