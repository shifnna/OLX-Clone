import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      location: formData.location,
      images: formData.images.map((file) => file.name), // Assuming image file names are used
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Product added successfully");
        console.log(data.product);
      } else {
        console.error("Failed to add product:", data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <div className="post-ad-page">
      <h1 className="post-ad-title">Post Your Ad</h1>
      <form onSubmit={handleSubmit} className="post-ad-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter the title"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter the description"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter the price"
            required
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter your location"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="images">Upload Images</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
          />
          <div className="image-preview">
            {formData.images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="image-preview-thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Post Ad
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
