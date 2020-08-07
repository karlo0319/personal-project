require('dotenv').config();
const cors = require("cors")
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const stripe = require("stripe")("sk_test_51HCbk0GbfOcJRAjdbdEVO1IPeR5NDoWqAKlHWAXii8JIL2iCsA5ARL7TcuQUWAprKS2T1JrGslS5Q2O5Uzfayuta00Q5oZEAsV")
const authCtrl = require('./controllers/authController')
const menuCtrl = require('./controllers/menuController')
const checkoutCtrl = require('./controllers/checkoutController')
const app = express();

app.use(express.json());
app.use(cors());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));


massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
})
    .then(db => {
        app.set("db", db);
        console.log("db connected");
    })
    .catch(err => console.log(err));

//Auth Endpoints
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

//Menu Endpoints
app.get('/api/menu', menuCtrl.getMenu);
app.get('/api/menu/:id', menuCtrl.getItemById);
app.get('/history', menuCtrl.getOrderHistory)
app.post('/api/cart/', menuCtrl.insertItem);
app.delete('/deletecart/:id', menuCtrl.deleteCart);
app.put('/updatecart/:id', menuCtrl.updateCart)

//Checkout
app.post('/checkout', checkoutCtrl.getMoney);


app.listen(SERVER_PORT, () => console.log(`Server running in port ${SERVER_PORT}`));