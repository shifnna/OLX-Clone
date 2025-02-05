import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishlist: [{
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }, // Reference to Product
        name: { type: String, required: true }, // Name of the product
        price: { type: Number, required: true }, // Price of the product
    }]
});

const User = mongoose.model("User", UserSchema);
export default User;
