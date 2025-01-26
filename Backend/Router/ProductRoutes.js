import express from 'express';
import { getAllProducts,createProduct,getSingleProduct,addWishlist } from '../Controller/ProductController.js';
import upload from '../Helpers/multer.js';

const router = express.Router();

router.post('/create-product', upload.single('image'), createProduct);
router.get('/products/:productId', getSingleProduct);
router.get('/products', getAllProducts);
router.post('/wishlist',addWishlist);

export default router;
