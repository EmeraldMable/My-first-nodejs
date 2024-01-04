const exp = require('constants');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Pizza_order = require('./model/mongoose');



const dbURL = 'mongodb+srv://Arsi:99887766@node-projectdb.el5w6gn.mongodb.net/pizza_order?retryWrites=true&w=majority';

mongoose.connect(dbURL)
.then(result => {app.listen(process.env.PORT || 3000)})
.catch(err => {console.log(err)})



app.set('view engine' , 'ejs')

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}))


app.get('/' , (req,res) => {
    res.redirect('/orders')
})

app.get('/order/create' , (req,res) => {
    
    res.render('order')
})

app.get('/orders' , (req,res) => {
    Pizza_order.find().sort({createdAt : -1})
    .then(result => {
        res.render('index' , {pizzas: result})
    })
})

app.post('/orders' , (req,res) => {
    const newOrder = new Pizza_order(req.body);
    newOrder.save()
    .then(result => {
        res.redirect('/orders')
    })
    .catch(err =>{
        console.log(err)
    })
})

app.delete('/orders/:id' , (req,res) => {
    const id = req.params.id;

    Pizza_order.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect : '/orders'})
    })
    .catch(err => {
        console.log(err);
    })
})

app.get('/orders/:id' , (req,res) => {
    const id = req.params.id;
  
    Pizza_order.findById(id)
    .then(result => {
        res.render('details' , {title : 'Details Page' , pizza : result})
      
    })
    .catch(err => {
        console.log(err);
    })
   
})


//404 page
app.use((req,res)=>{
    res.render('404' , {title: '404 - Not found'})
})







