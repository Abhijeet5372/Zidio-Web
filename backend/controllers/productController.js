// // backend/controllers/productController.js
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from '../models/productModel.js';

// // @desc    Fetch all products
// // @route   GET /api/products
// // @access  Public
// const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = process.env.PAGINATION_LIMIT || 10; // Products per page
//   const page = Number(req.query.pageNumber) || 1; // Current page number

//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: 'i', // Case-insensitive
//         },
//       }
//     : {}; // If no keyword, an empty object

//   const count = await Product.countDocuments({ ...keyword }); // Total number of products matching keyword
//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1)); // Pagination logic

//   res.json({ products, page, pages: Math.ceil(count / pageSize) });
// });

// // @desc    Fetch single product by ID
// // @route   GET /api/products/:id
// // @access  Public
// const getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     return res.json(product);
//   } else {
//     res.status(404);
//     throw new Error('Product not found');
//   }
// });

// // @desc    Create a product
// // @route   POST /api/products
// // @access  Private/Admin
// const createProduct = asyncHandler(async (req, res) => {
//   const product = new Product({
//     name: 'Sample Name',
//     price: 0,
//     user: req.user._id, // The user who created the product (from protect middleware)
//     image: '/images/sample.jpg',
//     brand: 'Sample Brand',
//     category: 'Sample Category',
//     countInStock: 0,
//     numReviews: 0,
//     description: 'Sample description',
//   });

//   const createdProduct = await product.save();
//   res.status(201).json(createdProduct);
// });

// // @desc    Update a product
// // @route   PUT /api/products/:id
// // @access  Private/Admin
// const updateProduct = asyncHandler(async (req, res) => {
//   const { name, price, description, image, brand, category, countInStock } =
//     req.body;

//   const product = await Product.findById(req.params.id);

//   if (product) {
//     product.name = name;
//     product.price = price;
//     product.description = description;
//     product.image = image;
//     product.brand = brand;
//     product.category = category;
//     product.countInStock = countInStock;

//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } else {
//     res.status(404);
//     throw new Error('Product not found');
//   }
// });

// // @desc    Delete a product
// // @route   DELETE /api/products/:id
// // @access  Private/Admin
// const deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     await Product.deleteOne({ _id: product._id }); // Use deleteOne
//     res.json({ message: 'Product removed' });
//   } else {
//     res.status(404);
//     throw new Error('Product not found');
//   }
// });

// // @desc    Create new review
// // @route   POST /api/products/:id/reviews
// // @access  Private
// const createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body;

//   const product = await Product.findById(req.params.id);

//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     );

//     if (alreadyReviewed) {
//       res.status(400);
//       throw new Error('Product already reviewed');
//     }

//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     };

//     product.reviews.push(review);

//     product.numReviews = product.reviews.length;

//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();
//     res.status(201).json({ message: 'Review added' });
//   } else {
//     res.status(404);
//     throw new Error('Product not found');
//   }
// });

// // @desc    Get top rated products
// // @route   GET /api/products/top
// // @access  Public
// const getTopProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({}).sort({ rating: -1 }).limit(3); // Sort by rating descending, limit to 3
//   res.json(products);
// });

// export {
//   getProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   createProductReview,
//   getTopProducts,
// };

// backend/controllers/productController.js
// Assuming necessary imports like asyncHandler, Product, and Category (if needed for default category)
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
// import Category from '../models/categoryModel.js'; // Might need this if you set a default category ID

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT || 8; // Assuming a pagination limit from .env or default
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name'); // Populate category name
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product (for Admin)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // --- IMPORTANT DEBUGGING STEP ---
  console.log('Backend: Received payload for product creation:', req.body);
  // ---------------------------------

  // Default values for a new product
  // These values satisfy the 'required: true' constraints in the schema.
  // The admin user will then update these in the ProductEditScreen.
  const defaultProduct = {
    name: 'Sample Name',
    price: 0,
    user: req.user._id, // This is crucial. It comes from the 'protect' middleware.
    image: '/images/sample.jpg', // Placeholder image
    brand: 'Sample Brand',
    // You need a valid Category ID here. If you don't have one,
    // you might need to fetch the first category or create a default one
    // in your seeding script. For now, I'll use a placeholder.
    // If you always have at least one category, you could fetch it:
    // const defaultCategory = await Category.findOne({});
    // category: defaultCategory ? defaultCategory._id : 'SOME_DEFAULT_CATEGORY_ID',
    category: '60c72b2f9c1b7e0015f8a2f3', // Placeholder: **REPLACE WITH A REAL CATEGORY ID FROM YOUR DB**
                                         // Or fetch dynamically as commented above.
    countInStock: 0,
    description: 'Sample description',
    rating: 0,
    numReviews: 0,
  };

  const product = new Product(defaultProduct);

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product (for Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product (for Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3); // Get top 3
  res.json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};