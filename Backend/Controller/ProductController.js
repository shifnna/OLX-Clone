import Product from "../Models/ProductSchema.js";
import User from "../Models/UserSchema.js";

export const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    return res
      .status(200)
      .json({ product, message: "Product fetched successfully" });
  } catch (error) {
    console.error("Error getSingleProduct", error);
    res.status(400).json({ error: "Error getting single product" });
  }
};

export const createProduct = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);

  const { name, description, price, color, condition, contactNumber } =
    req.body;

  try {
    if (!name || !description || !price || !color || !contactNumber) {
      return res.status(400).json({
        message: "Validation error: All fields are required",
        missingField: {
          name: !name ? "Name is required" : null,
          description: !description ? "Description is required" : null,
          price: !price ? "Price is required" : null,
          condition: !condition ? "Condition is required" : null,
          color: !color ? "Color is required" : null,
          contactNumber: !contactNumber ? "Contact number is required" : null,
        },
      });
    }

    if (contactNumber.length !== 10) {
      return res
        .status(400)
        .json({ error: "Contact number must be 10 digits" });
    }

    if (price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    const image = req.file?.filename;

    await Product.create({
      name,
      description,
      price,
      condition,
      color,
      image,
      contactNumber,
    });

    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error in createProduct", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  const { search } = req.query;
  try {
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// export const addWishlist = async (req, res) => {
//     console.log("Request body:", req.body); // Log the request body

//     const { productId, action ,user } = req.body;

//     try {
//       if (!user) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }

//       const userId = user.id; // Get the userId from the JWT token

//       if (action === "add") {
//         // Add product to wishlist
//         await Wishlist.create({ userId, productId });
//         return res.status(200).json({ message: "Product added to wishlist" });
//       } else if (action === "remove") {
//         // Remove product from wishlist
//         await Wishlist.findOneAndDelete({ userId, productId });
//         return res.status(200).json({ message: "Product removed from wishlist" });
//       }

//       res.status(400).json({ error: "Invalid action" });
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//       res.status(500).json({ error: "Server error" });
//     }
//   };


export const addWishlist = async (req, res) => {
  console.log("Request body:", req.body); // Debug log

  const { productId, action } = req.body;
  const userId = req.body.user.id;

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (action === "add") {
      // Check if product already exists in wishlist
      const existingItem = foundUser.wishlist.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        return res.status(400).json({ error: "Product already in wishlist" });
      }

      // Fetch product details from the database
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Add product to wishlist
      foundUser.wishlist.push({
        productId: product._id,
        name: product.name,
        price: product.price,
      });

      await foundUser.save();
      return res.status(200).json({
        message: "Product added to wishlist",
        wishlist: foundUser.wishlist,
      });
    } else if (action === "remove") {
      // Remove product from wishlist
      foundUser.wishlist = foundUser.wishlist.filter(
        (item) => item.productId.toString() !== productId
      );
      await foundUser.save();
      return res.status(200).json({
        message: "Product removed from wishlist",
        wishlist: foundUser.wishlist,
      });
    }

    return res.status(400).json({ error: "Invalid action" });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!userId || userId === "undefined") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId).populate("wishlist.productId"); // Ensure correct population
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};


