import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/ProductModel.js';

// @desc  Fetch all products 
// @route Get /api/products 
// @access  Public 
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


// @desc  Fetch a products
// @route Get /api/products/:id
// @access  Public  
const getProductByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        res.json(product);
    }else{ 
        res.status(404);
        throw new Error('Resource not Found');
    }
  
});

export  { getProducts, getProductByID }; 