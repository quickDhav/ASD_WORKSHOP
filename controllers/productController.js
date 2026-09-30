const productService = require("../services/productService");
const cacheStore = require("../middleware/cache");

// GET /products
async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

// GET /products/:id
async function getProductById(req, res) {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

// POST /products
async function createProduct(req, res) {
  try {
    const newProduct = await productService.createProduct(req.body);
    cacheStore.invalidate(); // Invalidate all cache — list is now stale
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
}

// PUT /products/:id
async function replaceProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const updated = await productService.replaceProduct(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    cacheStore.invalidate(); // Invalidate all cache
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to replace product" });
  }
}

// PATCH /products/:id
async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const updated = await productService.updateProduct(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    cacheStore.invalidate(); // Invalidate all cache
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
}

// DELETE /products/:id
async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const deleted = await productService.deleteProduct(id);
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    cacheStore.invalidate(); // Invalidate all cache
    res.json({ message: "Product deleted", product: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
