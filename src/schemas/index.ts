import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string().length(6, {
    message: "Code must be 6 digits"
  })),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
});

export const TenantSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  slug: z.string().min(3, {
    message: "Slug must be at least 3 characters",
  })
  .regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens",
  }),
});

export const CompanySchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  tenantId: z.string().min(1, {
    message: "Tenant is required",
  }),
});

export const InviteUserSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  role: z.enum([UserRole.ADMIN, UserRole.USER], {
    message: "Invalid role",
  }),
  tenantId: z.string().min(1, {
    message: "Tenant is required",
  }),
});