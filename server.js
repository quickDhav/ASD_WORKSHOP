const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 3000;

// Parse incoming JSON bodies
app.use(express.json());

// Mount product routes
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});