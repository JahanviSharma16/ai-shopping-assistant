import { z } from "zod";

const specificationSchema = z.object({
  key: z.string().trim().min(1, "Specification key is required"),
  value: z.string().trim().min(1, "Specification value is required"),
});

const buyLinkSchema = z.object({
  label: z.string().trim().min(1, "Buy link label is required"),
  url: z.url("Buy link URL must be valid").trim(),
});

const baseProductSchema = {
  title: z.string().trim().min(1, "Title is required"),
  brand: z.string().trim().min(1, "Brand is required"),
  category: z.string().trim().min(1, "Category is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  currency: z.string().trim().min(1, "Currency is required").default("INR"),
  discountPrice: z.coerce.number().min(0).nullable().optional(),
  images: z.array(z.url("Image URL must be valid")).default([]),
  specifications: z.array(specificationSchema).default([]),
  rating: z.coerce.number().min(0).max(5).default(0),
  reviewCount: z.coerce.number().int().min(0).default(0),
  buyLinks: z.array(buyLinkSchema).default([]),
  source: z.string().trim().min(1).nullable().optional(),
  stockStatus: z.string().trim().min(1).default("in_stock"),
  tags: z.array(z.string().trim().min(1)).default([]),
};

export const createProductSchema = z
  .object(baseProductSchema)
  .superRefine((data, context) => {
    if (
      data.discountPrice !== null &&
      data.discountPrice !== undefined &&
      data.discountPrice > data.price
    ) {
      context.addIssue({
        code: "custom",
        path: ["discountPrice"],
        message: "Discount price cannot be greater than price",
      });
    }
  });

export const updateProductSchema = z
  .object({
    title: baseProductSchema.title.optional(),
    brand: baseProductSchema.brand.optional(),
    category: baseProductSchema.category.optional(),
    description: baseProductSchema.description.optional(),
    price: baseProductSchema.price.optional(),
    currency: baseProductSchema.currency.optional(),
    discountPrice: baseProductSchema.discountPrice,
    images: baseProductSchema.images.optional(),
    specifications: baseProductSchema.specifications.optional(),
    rating: baseProductSchema.rating.optional(),
    reviewCount: baseProductSchema.reviewCount.optional(),
    buyLinks: baseProductSchema.buyLinks.optional(),
    source: baseProductSchema.source,
    stockStatus: baseProductSchema.stockStatus.optional(),
    tags: baseProductSchema.tags.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .superRefine((data, context) => {
    if (
      data.discountPrice !== null &&
      data.discountPrice !== undefined &&
      data.price !== undefined &&
      data.discountPrice > data.price
    ) {
      context.addIssue({
        code: "custom",
        path: ["discountPrice"],
        message: "Discount price cannot be greater than price",
      });
    }
  });

export const productSearchQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  brand: z.string().trim().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  sort: z
    .enum(["price", "rating", "latest"])
    .optional()
    .default("latest"),
});
