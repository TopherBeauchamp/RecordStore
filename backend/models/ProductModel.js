import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({ 
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    rating: { 
        type: Number,
        required: true,
    },
    comment: {
        type: String, 
        required: true,
    }, 
}, {
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    artist: {
        type: String, 
        required: true, 
    },
    title: {
        type: String, 
        required: true,
    },
    lable: { 
        type: String,
    },
    format: {
        type: String, 
        required: true,
    },
    releaseDate: {
        type: Number, 
    },
    price: {
        type: Number, 
        required: true,
    },
    reviews: [reviewSchema], 
    rating: {
        type: Number, 
        default: 0,
    },
    numReviews: { 
        type: Number,
        default: 0,
    },
    countInStock: { 
        type: Number, 
        required: true, 
        default: 0,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;