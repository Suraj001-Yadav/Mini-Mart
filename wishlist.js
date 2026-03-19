const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');

// Get wishlist
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('wishlist');
        res.json(user.wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add to wishlist
router.post('/add/:productId', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(req.user._id);
        
        // Check if product is already in wishlist
        if (user.wishlist.includes(req.params.productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        user.wishlist.push(req.params.productId);
        await user.save();

        res.json(user.wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // Check if product is in wishlist
        if (!user.wishlist.includes(req.params.productId)) {
            return res.status(400).json({ message: 'Product not in wishlist' });
        }

        user.wishlist = user.wishlist.filter(
            productId => productId.toString() !== req.params.productId
        );
        
        await user.save();
        res.json(user.wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Move from wishlist to cart
router.post('/move-to-cart/:productId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // Check if product is in wishlist
        if (!user.wishlist.includes(req.params.productId)) {
            return res.status(400).json({ message: 'Product not in wishlist' });
        }

        // Remove from wishlist
        user.wishlist = user.wishlist.filter(
            productId => productId.toString() !== req.params.productId
        );

        // Add to cart
        const existingCartItem = user.cart.items.find(
            item => item.product.toString() === req.params.productId
        );

        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            user.cart.items.push({
                product: req.params.productId,
                quantity: 1
            });
        }

        await user.save();
        res.json({
            wishlist: user.wishlist,
            cart: user.cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Clear wishlist
router.delete('/clear', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.wishlist = [];
        await user.save();
        res.json(user.wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 