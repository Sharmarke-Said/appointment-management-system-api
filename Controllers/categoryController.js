const CategoryModel = require("../models/CategoryModel");
const categoryValidation = require("../validations/categoryValidation");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const data = await CategoryModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Get a single category by ID
const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .send({ status: false, message: "Category not found" });
    }
    res.status(200).send({ status: true, data: category });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { error } = categoryValidation(req.body);
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error.message });
    }

    const category = new CategoryModel(req.body);
    await category.save();
    res.status(200).send({
      status: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { error } = categoryValidation(req.body);
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error.message });
    }

    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res
        .status(404)
        .send({ status: false, message: "Category not found" });
    }

    res.status(200).send({
      status: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(
      req.params.id
    );
    if (!category) {
      return res
        .status(404)
        .send({ status: false, message: "Category not found" });
    }
    res.status(200).send({
      status: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
