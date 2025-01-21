import Product from "../Models/ProductSchema.js";

export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find()
        console.log(products,'products');
        
        return res.status(200).json({products: products,message: 'Product fetched successfully'})
    } catch (error) {
        console.log('Error getProduct',error)
        res.status(400).json({error:'Error getting products'})
    }
}

export const getSingleProduct = async(req,res)=>{
    const {productId} = req.params
    try {
        const product = await Product.findOne({_id: productId});
        return res.status(200).json({ product: product, message: 'Product fetched successfully' })
    } catch (error) {
        console.error('Error getSingleProduct',error);
        
    }
}

export const createProduct = async(req,res)=>{
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);
    const {name, description, price, color,condition, contactNumber} = req.body;
    
    try {
        if(!name || !description || !price || !color || !contactNumber){
            return res.status(400).json({
                message:'Validation error: All field are required',
                missingField:{
                    all: !name && !description && !price && color ? 'All fields are required' : null,
                    name: !name ? 'name is required' : null,
                    description: !description ? 'Descritption is required' : null,
                    price: !price ? 'Price is required' : null,
                    condition: !condition ? 'Condition is required' : null,
                    color: !color ? 'price is required' : null,
                    contactNumber: !contactNumber ? 'contact number is required' : null,
                },
            });
        }
        const image = req.file?.filename

        console.log(contactNumber);
        if(contactNumber.length !=10){
            return res.status(400).json({error: 'Number length must be 10'})
        }

        if(price <= 0){
            return res.status(400).json({error: 'Price can`t be belwo Below or Zero'})
        }

        await Product.create({name, description, price, condition, color, image, contactNumber})
        
        return res.status(201).json({message: "Product added successfully"})
    } catch (error) {
        console.log('error in create product',error);
        
    }
}