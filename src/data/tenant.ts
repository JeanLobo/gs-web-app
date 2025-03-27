import { db } from "@/lib/db";

export const getTenantBySlug = async (slug: string) => {
  try {
    const tenant = await db.tenant.findUnique({
      where: { slug }
    });

    return tenant;
  } catch {
    return null;
  }
};

export const getTenantsByUserId = async (userId: string) => {
  try {
    const userTenants = await db.usersOnTenants.findMany({
      where: { userId },
      include: {
        tenant: true
      }
    });

    return userTenants.map(ut => ({
      ...ut.tenant,
      role: ut.role
    }));
  } catch {
    return [];
  }
};

export const getUserTenants = async (userId?: string) => {
  if (!userId) return [];
  
  try {
    const userTenants = await db.usersOnTenants.findMany({
      where: { userId },
      include: {
        tenant: true
      }
    });

    return userTenants;
  } catch {
    return [];
  }
};