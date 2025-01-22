import Product from '../Models/ProductSchema.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products, 'products');
        return res.status(200).json({ products, message: 'Products fetched successfully' });
    } catch (error) {
        console.error('Error getProducts', error);
        res.status(400).json({ error: 'Error getting products' });
    }
};

export const getSingleProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        return res.status(200).json({ product, message: 'Product fetched successfully' });
    } catch (error) {
        console.error('Error getSingleProduct', error);
        res.status(400).json({ error: 'Error getting single product' });
    }
};

export const createProduct = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    const { name, description, price, color, condition, contactNumber } = req.body;

    try {
        if (!name || !description || !price || !color || !contactNumber) {
            return res.status(400).json({
                message: 'Validation error: All fields are required',
                missingField: {
                    name: !name ? 'Name is required' : null,
                    description: !description ? 'Description is required' : null,
                    price: !price ? 'Price is required' : null,
                    condition: !condition ? 'Condition is required' : null,
                    color: !color ? 'Color is required' : null,
                    contactNumber: !contactNumber ? 'Contact number is required' : null,
                },
            });
        }

        if (contactNumber.length !== 10) {
            return res.status(400).json({ error: 'Contact number must be 10 digits' });
        }

        if (price <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }

        const image = req.file?.filename;

        await Product.create({ name, description, price, condition, color, image, contactNumber });

        return res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error in createProduct', error);
        res.status(500).json({ error: 'Server error' });
    }
};
