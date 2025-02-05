import React, { useState } from "react";
import axios from "axios";
import "./SellProduct.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SellProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    condition: "",
    color: "",
    image: null,
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.price.trim()) {
      newErrors.price = "Price is required.";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price.";
    }
    if (!formData.condition.trim()) newErrors.condition = "Condition is required.";
    if (!formData.color.trim()) newErrors.color = "Color is required.";
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Enter a valid 10-digit contact number.";
    }
    if (!formData.image) newErrors.image = "Please upload an image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validateForm()) return;

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        if (formData.image) form.append(key, formData.image);
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      await axios.post("http://localhost:5000/create-product", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error uploading data");
    }
  };

  return (
    <div className="sell-product-overlay">
      <div className="sell-product-modal">
        <h2 className="sell-product-title">Add New Product</h2>
        <form onSubmit={handleSubmit} className="sell-product-form">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange}></textarea>
          {errors.description && <p className="error-message">{errors.description}</p>}

          <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
          {errors.price && <p className="error-message">{errors.price}</p>}

          <input type="text" name="condition" placeholder="Condition" value={formData.condition} onChange={handleInputChange} />
          {errors.condition && <p className="error-message">{errors.condition}</p>}

          <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleInputChange} />
          {errors.color && <p className="error-message">{errors.color}</p>}

          <input type="file" name="image" onChange={handleImageChange} />
          {errors.image && <p className="error-message">{errors.image}</p>}

          <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleInputChange} />
          {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}

          <div className="sell-product-buttons">
            <button type="button" onClick={() => navigate("/")} className="cancel-button">
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
