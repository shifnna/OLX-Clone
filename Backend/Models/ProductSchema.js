import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  condition: { type: String },
  color: { type: String },
  image: { type: String },
  contactNumber: { type: Number },
  postedDate: { type: Date, default: Date.now }
})


const Product = mongoose.model('Product', productSchema)
export default Product;