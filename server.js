const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

dotenv.config();

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'yoursecretkey', // use env variable or a hardcoded secret
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set view engine and static folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');          // Home, About, Contact, etc.
// const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const wishlistRoutes = require('./routes/wishlist');
const adminAuthRoutes = require('./routes/adminAuth');
// const User = require('./models/User');
// const paymentRoutes = require('./routes/payment');

// Use routes
app.use('/', indexRoutes);           // Main pages & home
app.use('/auth', authRoutes);        // Authentication (login, register)
// app.use('/cart', cartRoutes);        // Cart routes
app.use('/', orderRoutes);      // Order routes
app.use('/products', productRoutes); // Product CRUD & listing
app.use('/wishlist', wishlistRoutes);
app.use('/',adminAuthRoutes);
// app.use('/payment', paymentRoutes);  // Payment processing
// await User.findOneAndUpdate({ email: 'admin@example.com' }, { role: 'admin' });

// 404 handler
// app.use((req, res) => {
//     res.status(404).render('404', { title: 'Page Not Found' });
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
