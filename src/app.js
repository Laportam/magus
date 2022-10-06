const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

// ¿Está el admin loggueado?
const adminLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// Rutas requeridas
const mainRoutes = require('./routes/mainRoutes');
const catalogoRoutes = require('./routes/catalogoRoutes');
const presupuestadorRoutes = require('./routes/presupuestadorRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(session({
    secret:'Shhh, es un secreto',
    resave: false,
    saveUninitialized: false
}));

app.use(cookies());

app.use(adminLoggedMiddleware);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './src/views');

// app.set('port', process.env.PORT || 3000);
app.listen(3000, () => console.log("El servidor está levantado en el puerto 3000"));

app.use('/', mainRoutes);
app.use('/catalogo', catalogoRoutes);
app.use('/presupuestador', presupuestadorRoutes);
app.use('/admin', adminRoutes);