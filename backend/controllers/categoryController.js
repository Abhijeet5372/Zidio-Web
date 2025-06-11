// // backend/controllers/categoryController.js
// import asyncHandler from '../middleware/asyncHandler.js';
// import Category from '../models/categoryModel.js';

// // @desc    Fetch all categories
// // @route   GET /api/categories
// // @access  Public
// const getCategories = asyncHandler(async (req, res) => {
//   const categories = await Category.find({});
//   res.json(categories);
// });

// // @desc    Fetch single category by ID
// // @route   GET /api/categories/:id
// // @access  Public
// const getCategoryById = asyncHandler(async (req, res) => {
//   const category = await Category.findById(req.params.id);

//   if (category) {
//     return res.json(category);
//   } else {
//     res.status(404);
//     throw new Error('Category not found');
//   }
// });

// // @desc    Create a category
// // @route   POST /api/categories
// // @access  Private/Admin
// const createCategory = asyncHandler(async (req, res) => {
//   const { name, description } = req.body;

//   const categoryExists = await Category.findOne({ name: name });
//   if (categoryExists) {
//     res.status(400);
//     throw new Error('Category with this name already exists');
//   }

//   const category = new Category({
//     name,
//     description: description || '',
//   });

//   const createdCategory = await category.save();
//   res.status(201).json(createdCategory);
// });

// // @desc    Update a category
// // @route   PUT /api/categories/:id
// // @access  Private/Admin
// const updateCategory = asyncHandler(async (req, res) => {
//   const { name, description } = req.body;

//   const category = await Category.findById(req.params.id);

//   if (category) {
//     // Check if new name already exists and is not the current category's name
//     if (name && name !== category.name) {
//       const categoryExists = await Category.findOne({ name: name });
//       if (categoryExists) {
//         res.status(400);
//         throw new Error('Category with this name already exists');
//       }
//     }

//     category.name = name || category.name;
//     category.description = description !== undefined ? description : category.description;

//     const updatedCategory = await category.save();
//     res.json(updatedCategory);
//   } else {
//     res.status(404);
//     throw new Error('Category not found');
//   }
// });

// // @desc    Delete a category
// // @route   DELETE /api/categories/:id
// // @access  Private/Admin
// const deleteCategory = asyncHandler(async (req, res) => {
//   const category = await Category.findById(req.params.id);

//   if (category) {
//     await Category.deleteOne({ _id: category._id });
//     res.json({ message: 'Category removed' });
//   } else {
//     res.status(404);
//     throw new Error('Category not found');
//   }
// });

// export {
//   getCategories,
//   getCategoryById,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// };


// backend/controllers/categoryController.js
import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @desc    Fetch single category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    return res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  // --- IMPORTANT DEBUGGING STEP ---
  console.log('Backend: Received payload for category creation:', req.body);
  // ---------------------------------

  const { name, description } = req.body;

  // Basic validation (can be more robust with express-validator)
  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400);
    throw new Error('Category name is required and must be a non-empty string');
  }

  const categoryExists = await Category.findOne({ name: name.trim() });
  if (categoryExists) {
    res.status(400);
    throw new Error(`Category with name "${name.trim()}" already exists`);
  }

  const category = new Category({
    name: name.trim(), // Ensure name is trimmed
    description: description ? description.trim() : '', // Use trimmed description, default to empty string if not provided
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    // Check if new name already exists and is not the current category's name
    if (name && name.trim() !== category.name) {
      const categoryExists = await Category.findOne({ name: name.trim() });
      if (categoryExists) {
        res.status(400);
        throw new Error('Category with this name already exists');
      }
    }

    category.name = name ? name.trim() : category.name;
    category.description = description !== undefined ? description.trim() : category.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await Category.deleteOne({ _id: category._id });
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};