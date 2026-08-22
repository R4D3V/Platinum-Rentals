import { db } from "@/lib/db";
import { property, user, land } from "@/lib/db-schema";
import { count, eq } from "drizzle-orm";
import { Building2, Users, Home, Tag, Map } from "lucide-react";

async function getStats() {
  const [propertyCount] = await db()
    .select({ value: count() })
    .from(property);
  const [userCount] = await db()
    .select({ value: count() })
    .from(user);
  const [availableCount] = await db()
    .select({ value: count() })
    .from(property)
    .where(eq(property.status, "Available"));
  const [letCount] = await db()
    .select({ value: count() })
    .from(property)
    .where(eq(property.status, "Let"));
  const [landCount] = await db()
    .select({ value: count() })
    .from(land);

  return {
    totalProperties: propertyCount.value,
    totalUsers: userCount.value,
    availableProperties: availableCount.value,
    letProperties: letCount.value,
    totalLands: landCount.value,
  };
}

const statCards = [
  { label: "Total Properties", key: "totalProperties", icon: Building2 },
  { label: "Available", key: "availableProperties", icon: Home },
  { label: "Let", key: "letProperties", icon: Tag },
  { label: "Land Listings", key: "totalLands", icon: Map },
  { label: "Total Users", key: "totalUsers", icon: Users },
] as const;

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-extrabold sm:text-3xl">Admin Dashboard</h1>
      <p className="mt-1 text-sm" style={{ color: "var(--color-ink-soft)" }}>
        Overview of your property listings and users
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = stats[card.key as keyof typeof stats];
          return (
            <div
              key={card.key}
              className="surface-raised flex flex-col gap-2 rounded-2xl p-5"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} style={{ color: "var(--color-accent)" }} />
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  {card.label}
                </span>
              </div>
              <span className="text-3xl font-extrabold">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
