const db = require("../database/db");

// GET all products
async function getAllProducts() {
  return await db.readAll();
}

// GET single product by id
async function getProductById(id) {
  const products = await db.readAll();
  return products.find((p) => p.id === id) || null;
}

// POST — create a new product
async function createProduct(productData) {
  const products = await db.readAll();
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...productData };
  products.push(newProduct);
  await db.writeAll(products);
  return newProduct;
}

// PUT — replace a product entirely
async function replaceProduct(id, productData) {
  const products = await db.readAll();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { id, ...productData };
  await db.writeAll(products);
  return products[index];
}

// PATCH — partially update a product
async function updateProduct(id, productData) {
  const products = await db.readAll();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...productData };
  await db.writeAll(products);
  return products[index];
}

// DELETE — remove a product
async function deleteProduct(id) {
  const products = await db.readAll();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const [deleted] = products.splice(index, 1);
  await db.writeAll(products);
  return deleted;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
