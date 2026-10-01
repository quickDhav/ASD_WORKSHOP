const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");
const cacheMiddleware = require("../middleware/cacheMiddleware");

// Route → Middleware → Controller → Service → Database

// GET routes use the cache middleware
router.get("/", cacheMiddleware, controller.getAllProducts);
router.get("/:id", cacheMiddleware, controller.getProductById);

// Write routes — no cache middleware needed; they invalidate cache inside the controller
router.post("/", controller.createProduct);
router.put("/:id", controller.replaceProduct);
router.patch("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
