import { z } from "zod";

export const createItemSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  dueDate: z.coerce.date()
});

export const updateItemSchema = z.object({
  title: z.string().min(1).trim().optional(),
  dueDate: z.coerce.date().optional(),
  completed: z.boolean().optional()
});

export const idCheckSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID format")
});