const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const methodOverride = require("method-override");

router.use(express.urlencoded({ extended: true }));
router.use(methodOverride("_method"));


router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.render("products/index", { products });
});

//  new route
router.get("/products/new", async (req, res) => {
  res.render("products/new");
});

// Create Route
router.post("/products", async (req, res) => {
  const product = new Product(req.body.product);
  await product.save();
  res.redirect("/products");
});
// Show Routes
router.get("/products/:id", async (req, res) => {
  let { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show.ejs", { product });
});
// edit Route
router.get("/products/:id/edit", async (req, res) => {
  let { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit.ejs", { product });
});
// update product
router.put("/products/:id", async (req, res) => {
  let { id } = req.params;
  await Product.findByIdAndUpdate(id, { ...req.body.product });
  res.redirect("/products");
});
// delete product
router.delete('/products/:id', async(req,res)=>{
    let { id } = req.params;
    await Product.findByIdAndDelete(id, { ...req.body.product });
    res.redirect("/products");

})


module.exports = router;
