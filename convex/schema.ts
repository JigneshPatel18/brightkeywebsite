import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    password: v.string(), // In a real app, use hashed passwords!
  }).index("by_email", ["email"]),

  inventory: defineTable({
    userId: v.id("users"), // Foreign key to users table
    product: v.string(),
    key: v.string(),
    purchaseDate: v.string(),
    vendor: v.string(),
    serial: v.string(),
    name: v.string(),
    mobile: v.string(),
    date: v.string(), // Sale date
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
