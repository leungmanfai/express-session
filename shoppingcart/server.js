const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const SECRETKEY = 'I want to pass COMPS381F';

//`app.use(fileUpload());
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));app.use(session({
	secret: SECRETKEY,
	resave: true,
	saveUninitialized: true
}));

const products = [
	{name: 'Apple iPad Pro', stock: 100, price: 7000, id:'001'},
	{name: 'Apple iPhone 7', stock: 50, price: 7800, id:'002'},
	{name: 'Apple Macbook', stock: 70, price: 11000, id: '003'}
];

app.set('view engine', 'ejs');

app.get('/',function(req,res) {
	res.redirect('/read');
});

app.get('/read', function(req,res) {
	res.render('list', {c: products});
});

app.get('/showdetails', (req,res) => {
	let product2show = null;
	if (req.query.id) {
		products.forEach((product) => {
			if (product.id == req.query.id) {
				product2show = product
			}
		})
		if (product2show) {
			res.render('details', {c: product2show});							
		} else {
			res.status(500).end(req.query.id + ' not found!');
		}
	} else {
		res.status(500).end('id missing!');
	}
});

app.get('/shoppingcart', (req,res) => {
	res.end('coming soon!')
});

app.get('/add2cart', (req,res) => {
	res.end('coming soon!')
})

app.get('/emptycart', (req,res) => {
	res.end('coming soon!')
})

app.listen(process.env.PORT || 8099);
