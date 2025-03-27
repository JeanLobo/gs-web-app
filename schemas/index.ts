import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "E-mail é obrigatório",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatória",
  }),
  code: z.optional(z.string().length(6, {
    message: "Código deve ter 6 dígitos"
  })),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  email: z.string().email({
    message: "E-mail é obrigatório",
  }),
  password: z.string().min(8, {
    message: "Mínimo de 8 caracteres",
  }),
  companyName: z.string().min(2, {
    message: "Nome da empresa é obrigatório",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "E-mail é obrigatório",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Mínimo de 8 caracteres",
  }),
});

export const TenantSchema = z.object({
  name: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres",
  }),
  slug: z.string().min(3, {
    message: "Slug deve ter pelo menos 3 caracteres",
  })
  .regex(/^[a-z0-9-]+$/, {
    message: "Slug pode conter apenas letras minúsculas, números e hífens",
  }),
});

export const CompanySchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres",
  }),
  tenantId: z.string().min(1, {
    message: "Tenant é obrigatório",
  }),
});

export const InviteUserSchema = z.object({
  email: z.string().email({
    message: "E-mail é obrigatório",
  }),
  role: z.enum([UserRole.ADMIN, UserRole.USER], {
    message: "Função inválida",
  }),
  tenantId: z.string().min(1, {
    message: "Tenant é obrigatório",
  }),
});