// backend/models/categoryModel.js
import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Category names should be unique
      trim: true,
    },
    description: {
      type: String,
      required: false, // Description is optional
    },
    // You could add an image field for categories if needed
    // image: {
    //   type: String,
    //   required: false,
    // },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;