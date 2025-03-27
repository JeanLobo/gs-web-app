"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getTenantBySlug } from "@/data/tenant";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Campos inválidos!" };
    }

    const { email, password, name, companyName } = validatedFields.data;
    
    // Generate slug from company name
    const slug = companyName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "E-mail já está em uso!" };
    }

    // Check if tenant slug already exists
    const existingTenant = await getTenantBySlug(slug);
    if (existingTenant) {
      return { error: "Nome da empresa já está em uso!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create tenant, user, and company in a transaction
    const result = await db.$transaction(async (tx) => {
      // Create tenant
      const tenant = await tx.tenant.create({
        data: {
          name: companyName,
          slug,
        },
      });

      // Create user
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "ADMIN",
          tenants: {
            create: {
              tenantId: tenant.id,
              role: "ADMIN",
            },
          },
        },
      });

      // Create initial company
      await tx.company.create({
        data: {
          name: companyName,
          tenantId: tenant.id,
          users: {
            create: {
              userId: user.id,
              role: "ADMIN",
            },
          },
        },
      });

      return { tenant, user };
    });

    // Generate and send verification token
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      name,
    );

    return { 
      success: "Conta criada com sucesso! Verifique seu e-mail.",
      user: result.user,
      tenant: result.tenant
    };
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error instanceof Error) {
      // Handle specific database errors
      if (error.message.includes("Unique constraint")) {
        if (error.message.includes("email")) {
          return { error: "E-mail já está em uso!" };
        }
        if (error.message.includes("slug")) {
          return { error: "Nome da empresa já está em uso!" };
        }
      }
    }
    
    return { error: "Erro ao criar conta. Por favor, tente novamente." };
  }
};