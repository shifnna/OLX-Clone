import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      // required: true 
    },
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", // Assuming you have a Product model for your products
      required: true 
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
export default Wishlist;
