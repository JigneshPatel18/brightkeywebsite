import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const signup = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("Email already registered");
    }

    // Insert new user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      password: args.password,
    });

    return userId;
  },
});

export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Incorrect Gmail ID or Password");
    }

    if (user.password !== args.password) {
      throw new Error("Incorrect Gmail ID or Password");
    }

    return user._id;
  },
});
