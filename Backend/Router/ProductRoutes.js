import express from 'express'
// import { login, register } from '../controllers/userController.js';
// import {createProduct, getProducts, getSingleProduct} from '../Controller/ProductController.js'
import {createProduct} from '../Controller/ProductController.js'

import uploadImage from '../Helpers/multer.js'
// import { validateRegistration, handleValidationErrors } from '../middleware/authMiddleware.js';
const router = express.Router();

// router.get('/get-products', getProducts)
// router.get('/product/:productId', getSingleProduct)
router.post('/create-product', uploadImage, createProduct)
// router.post('/login',login)
// router.post('/register',register)

export default router