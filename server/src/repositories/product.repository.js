import Product from "../models/product.model.js";

const buildSearchFilter = ({
  search,
  category,
  brand,
  minPrice,
  maxPrice,
  rating,
}) => {
  const filter = {};

  if (search) {
    filter.$or = ["title", "description", "brand", "category"].map((field) => ({
      [field]: { $regex: search, $options: "i" },
    }));
  }

  if (category) {
    filter.category = { $regex: `^${category}$`, $options: "i" };
  }

  if (brand) {
    filter.brand = { $regex: `^${brand}$`, $options: "i" };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      filter.price.$lte = maxPrice;
    }
  }

  if (rating !== undefined) {
    filter.rating = { $gte: rating };
  }

  return filter;
};

const getSortOption = (sort) => {
  switch (sort) {
    case "price":
      return { price: 1, createdAt: -1 };
    case "rating":
      return { rating: -1, reviewCount: -1, createdAt: -1 };
    case "latest":
    default:
      return { createdAt: -1 };
  }
};

const findProducts = async (query) => {
  const filter = buildSearchFilter(query);
  const page = query.page || 1;
  const limit = query.limit || 12;
  const skip = (page - 1) * limit;

  const [products, totalItems] = await Promise.all([
    Product.find(filter).sort(getSortOption(query.sort)).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  return { products, totalItems };
};

const findProductById = async (productId) => Product.findById(productId);

const createProduct = async (payload) => Product.create(payload);

const updateProductById = async (productId, payload) =>
  Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });

const deleteProductById = async (productId) =>
  Product.findByIdAndDelete(productId);

export default {
  findProducts,
  findProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
