import express from 'express';
import { createProduct } from '../Controller/ProductController.js';
import upload from '../Helpers/multer.js';

const router = express.Router();

router.post('/create-product', upload.single('image'), createProduct);

export default router;
