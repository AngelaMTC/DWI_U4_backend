const express = require("express");
const Producto = require("../models/Producto");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find({ deleted: false });
    res.json(productos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const producto = new Producto({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    });
    const productoSaved = await producto.save();
    res.json(productoSaved);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      updatedAt: Date.now(),
    });
    res.json(updatedProducto);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/complete/:id", async (req, res) => {
  try {
    const currentProducto = await Producto.findById(req.params.id);
    const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, {
      completed: !currentProducto.completed,
      updatedAt: Date.now(),
    });
    res.json(updatedProducto);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/delete/:id", async (req, res) => {
  try {
    const productoDeleted = await Producto.findByIdAndUpdate(req.params.id, {
      deleted: true,
      deletedAt: Date.now(),
    });
    res.json(productoDeleted);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProducto = await Producto.deleteOne({ _id: req.params.id });
    res.json(deletedProducto);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
