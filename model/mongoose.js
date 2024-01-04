const mongoose = require('mongoose');

const dbSchema = mongoose.Schema; 

const pizza_order = new dbSchema({
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    ingredient1 : {
        type : String,
        required : true
    },
    ingredient2 : {
        type : String,
        required : true
    },
    ingredient3 : {
        type : String,
        required : true
    },
} , {timestamps :true}) 

const Pizza_order = mongoose.model('Pizza_order' , pizza_order);
module.exports = Pizza_order;