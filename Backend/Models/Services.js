const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        Contact: {
            type: String,
            required: true,
        },
        ServiceName: {
            type: String,
            required: true,
        },
        ServiceComments: {
            type: String,
            required: true,
        },
        Status: {
            type: String,
            required: false,
        }
    });

const Services = mongoose.model("Services", ServiceSchema)
module.exports = Services;
