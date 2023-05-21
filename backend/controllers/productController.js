const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel')


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {

    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qSearch = req.query.search;
 
    let products;

    if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
        products = await Product.find({
            'categories.categoryA': qCategory
        })
    } else if (qSearch) {
        products = await Product.find({
            $text: { $search: qSearch }
        });
    } else {
        products = await Product.find();
    }

    res.status(200).json(products);

})
  
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
})
  
// @desc    Add a product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = asyncHandler(async (req, res) => {

    const { productName, brand, categories, quantity, price, description, SKU, image } = req.body;
  
    const product = new Product({ productName, brand, categories, quantity, price, description, SKU, image });

    const savedProduct = await product.save();

    res.status(200).json(savedProduct); 
})
  
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
  
    if (product) {
    
        // const { productName, brand, categories, quantity, Price, description, image } = req.body;

        // // Update the fields of the product object
        // product.productName = productName;
        // product.brand = brand;
        // product.categories = categories;
        // product.quantity = quantity;
        // product.price = Price;
        // product.description = description;
        // product.image = image;
    
        // // Save the updated product object to the database
        // const updatedProduct = await product.save();
  
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true, 
            runValidators: true,
        });
       
        res.status(200).json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
  })

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
        await product.deleteOne();
        res.status(200).json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Get product count by categories
// @route   GET /api/orders/insights/productCount
// @access  Private/Admin
const getProductCountByCategory = asyncHandler(async (req, res) => {

    const counts = await Product.aggregate([
      {
        $group: {
          _id: {
            categoryA: "$categories.categoryA",
            categoryB: "$categories.categoryB"
          },
          count: { $sum: 1 }
        }
      }
    ]);
  
    const categoryCounts = {};

    counts.forEach((item) => {

      const categoryA = item._id.categoryA;
      const categoryB = item._id.categoryB;
      
      categoryA.forEach((categoryAItem) => {

        if (!categoryCounts[categoryAItem]) {
          categoryCounts[categoryAItem] = {};
        }

        if (!categoryCounts[categoryAItem][categoryB]) {
          categoryCounts[categoryAItem][categoryB] = 0;
        }

        categoryCounts[categoryAItem][categoryB] += item.count;

      });
    });
  
    const categoryA = ["Dog", "Cat", "Fish", "Rabbit", "Bird", "Cattle", "Pig", "Hamster", "Other"];
    const categoryB = ["Food", "Accessory", "Toy"];
  
    const data = [];

    categoryA.forEach((categoryAItem) => {

      const item = { categoryA: categoryAItem };

      categoryB.forEach((categoryBItem) => {
        item[categoryBItem] = categoryCounts[categoryAItem]?.[categoryBItem] || 0;
      });

      data.push(item);

    });
  
    res.status(200).json(data);
});


// @desc    Get total product count
// @route   GET /api/orders/insights/totalOrderCount
// @access  Private/Admin
const getProductStats = asyncHandler(async (req, res) => {

  // Use countDocuments() to count the total number of products
  const totalProducts = await Product.countDocuments();

  res.status(200).json({ totalProducts });
});


module.exports = {getProducts, getProductById, addProduct, updateProduct, deleteProduct, getProductCountByCategory, getProductStats}