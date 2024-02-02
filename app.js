const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const auth = require('./routes/auth')
const crud = require('./routes/crud')

const app = express();

mongoose.connect('mongodb+srv://Alexis:Alexis_31@cluster0.laqodw2.mongodb.net/?retryWrites=true&w=majority',
{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());
app.use(auth);
app.use(crud);

module.exports = app;