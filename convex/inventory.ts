import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("inventory")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
    
    // Sort by createdAt descending since order("desc") sorts by _creationTime by default
    return records.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const add = mutation({
  args: {
    userId: v.id("users"),
    product: v.string(),
    key: v.string(),
    purchaseDate: v.string(),
    vendor: v.string(),
    serial: v.string(),
    name: v.string(),
    mobile: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inventory", {
      userId: args.userId,
      product: args.product,
      key: args.key,
      purchaseDate: args.purchaseDate,
      vendor: args.vendor,
      serial: args.serial,
      name: args.name,
      mobile: args.mobile,
      date: args.date,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("inventory"),
    userId: v.id("users"),
    product: v.string(),
    key: v.string(),
    purchaseDate: v.string(),
    vendor: v.string(),
    serial: v.string(),
    name: v.string(),
    mobile: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing || existing.userId !== args.userId) {
      throw new Error("Record not found or unauthorized");
    }

    await ctx.db.patch(args.id, {
      product: args.product,
      key: args.key,
      purchaseDate: args.purchaseDate,
      vendor: args.vendor,
      serial: args.serial,
      name: args.name,
      mobile: args.mobile,
      date: args.date,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("inventory"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing || existing.userId !== args.userId) {
      throw new Error("Record not found or unauthorized");
    }
    
    await ctx.db.delete(args.id);
  },
});
