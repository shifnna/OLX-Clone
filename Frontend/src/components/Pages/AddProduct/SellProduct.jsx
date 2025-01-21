import React, { useState } from "react";
import axios from "axios";
import "./SellProduct.css";

const SellProduct = ({ onClose, toast, getProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    condition: "",
    color: "",
    image: null,
    contactNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("color", formData.color);
    form.append("contactNumber", formData.contactNumber);
    form.append("condition", formData.condition);

    if (formData.image) {
      form.append("productPhoto", formData.image);
    }

    try {
      await axios.post("http://localhost:5000/create-product", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully");
      onClose();
      getProducts()
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error uploading data"
      );
    }
  };

  return (
    <div className="sell-product-overlay">
      <div className="sell-product-modal">
        <h2 className="sell-product-title">Add New Product</h2>
        <form onSubmit={handleSubmit} className="sell-product-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="condition"
            placeholder="Condition"
            value={formData.condition}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />
          <div className="sell-product-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellProduct;