const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = new express();

mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

app.use(express.static('public'));
app.use(expressEdge.engine);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// methods for routing the views depending on the links

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/index.html', (req,res) => {
    res.render('index');
});

app.get('/about.html', (req, res) => {
    res.render('about');
});

app.get('/contact.html', (req, res) => {
    res.render('contact');
});

app.get('/adminpost', (req, res) => {
    res.render('adminpost');
});

//setting up a post method for storing information in Mongoose
app.post('posts/store', (req,res) => {
    console.log(req.body)
    res.redirect('/')
})

app.listen(4000, () => {
    console.log('App is listening on port 4000')
});