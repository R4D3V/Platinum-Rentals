export interface Property {
  id: string;
  propertyId: string;
  title: string;
  type: "Apartment" | "Villa" | "Townhouse" | "Studio" | "Commercial";
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  size: number;
  location: string;
  area: string;
  description: string;
  features: string[];
  status: "Available" | "Let" | "Under Offer";
  availableFrom?: string;
  gradient: string;
  images: string[];
  featured?: boolean;
  landlordId?: string;
}

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "kololo-luxury-2br",
    propertyId: "PR-1001",
    title: "Luxury 2-Bedroom Apartment",
    type: "Apartment",
    price: 3500000,
    bedrooms: 2,
    bathrooms: 2,
    parking: 2,
    size: 120,
    location: "Plot 14, Kololo Hill Lane",
    area: "Kololo",
    description:
      "A modern two-bedroom apartment in the heart of Kololo with open-plan living, fitted kitchen, and panoramic city views. The building offers 24-hour security, backup generator, and shared rooftop terrace. Walking distance to embassies, restaurants, and Kololo Airstrip.",
    features: [
      "Fitted kitchen with oven and hob",
      "Air conditioning in bedrooms",
      "Private balcony with city views",
      "24-hour security and CCTV",
      "Backup power generator",
      "Covered parking for two vehicles",
      "Rooftop terrace access",
      "Fibre internet ready",
    ],
    status: "Available",
    availableFrom: "August 2026",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    images: [],
  },
  {
    id: "bugolobi-family-3br",
    propertyId: "PR-1002",
    title: "Spacious 3-Bedroom Family Home",
    type: "Villa",
    price: 5000000,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    size: 250,
    location: "Lukuli Road, Bugolobi",
    area: "Bugolobi",
    description:
      "A detached three-bedroom family home set on a walled compound in Bugolobi. Features include a private garden, domestic staff quarter, and covered carport. Quiet residential street within easy reach of Bugolobi shopping centre, garden city mall, and the bypass.",
    features: [
      "Private walled garden",
      "Domestic staff quarter",
      "Covered carport for two cars",
      "Fitted kitchen with pantry",
      "En-suite master bedroom",
      "Perimeter wall with electric fence",
      "Borehole water backup",
      "Laundry room",
    ],
    status: "Available",
    availableFrom: "September 2026",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    images: [],
  },
  {
    id: "nakasero-studio",
    propertyId: "PR-1003",
    title: "Furnished Studio Apartment",
    type: "Studio",
    price: 1800000,
    bedrooms: 0,
    bathrooms: 1,
    parking: 1,
    size: 45,
    location: "Impala Avenue, Nakasero",
    area: "Nakasero",
    description:
      "A fully furnished studio apartment on a quiet lane in Nakasero, ideal for a single professional or diplomat. The unit includes a kitchenette, modern bathroom, and built-in wardrobe. Close to Nakasero Market, Serena Hotel, and government offices.",
    features: [
      "Fully furnished and equipped",
      "Kitchenette with microwave and fridge",
      "Modern fitted bathroom",
      "Built-in wardrobe",
      "24-hour security",
      "Shared laundry facility",
      "Walking distance to amenities",
      "Suitable for short or long let",
    ],
    status: "Available",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    images: [],
  },
  {
    id: "munyonyo-waterfront-4br",
    propertyId: "PR-1004",
    title: "Waterfront 4-Bedroom Villa",
    type: "Villa",
    price: 12000000,
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    size: 450,
    location: "Lake Victoria Shore, Munyonyo",
    area: "Munyonyo",
    description:
      "An exceptional four-bedroom villa on the shores of Lake Victoria in Munyonyo. The property features expansive living areas, a private swimming pool, landscaped gardens, and direct lake views. Fully serviced with borehole, generator, and staff quarters.",
    features: [
      "Private swimming pool",
      "Lake Victoria waterfront views",
      "Landscaped gardens",
      "En-suite bedrooms with walk-in closets",
      "Modern fitted kitchen with island",
      "Domestic staff quarters (2 rooms)",
      "Standby generator and borehole",
      "Triple covered parking",
    ],
    status: "Under Offer",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    images: [],
  },
  {
    id: "ntinda-2br-modern",
    propertyId: "PR-1005",
    title: "Modern 2-Bedroom Flat",
    type: "Apartment",
    price: 2200000,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    size: 95,
    location: "Ntinda-Kisaasi Road",
    area: "Ntinda",
    description:
      "A well-maintained two-bedroom flat in a secure compound in Ntinda. Open-plan living and dining area, fitted kitchen, and spacious bedrooms. Close to Metroplex Mall, schools, and the Northern Bypass.",
    features: [
      "Open-plan living and dining",
      "Fitted kitchen",
      "Spacious bedrooms with wardrobes",
      "Shared compound with security guard",
      "Covered parking",
      "Pre-paid electricity meter",
      "Borehole water supply",
      "Children's play area",
    ],
    status: "Available",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    images: [],
  },
  {
    id: "kisaasi-townhouse",
    propertyId: "PR-1006",
    title: "Elegant 3-Bedroom Townhouse",
    type: "Townhouse",
    price: 4500000,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    size: 180,
    location: "Kisaasi Main Road",
    area: "Kisaasi",
    description:
      "A stylish three-bedroom townhouse in a gated community in Kisaasi. Features a private terrace, modern finishes throughout, and shared amenities including a gym and children's playground. Excellent access to schools and the city.",
    features: [
      "Gated community with security",
      "Private rooftop terrace",
      "Modern finishes throughout",
      "En-suite master bedroom",
      "Fitted kitchen with dishwasher",
      "Shared gym and playground",
      "Two covered parking spaces",
      "Solar water heating",
    ],
    status: "Available",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    images: [],
  },
];

export async function getAllProperties(): Promise<Property[]> {
  const { db } = await import("./db");
  const { property: propertyTable } = await import("./db-schema");
  const rows = await db().select().from(propertyTable);
  return rows.map((row) => ({
    id: row.id,
    propertyId: row.propertyId,
    title: row.title,
    type: row.type as Property["type"],
    price: row.price,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    parking: row.parking,
    size: row.size,
    location: row.location,
    area: row.area,
    description: row.description,
    features: row.features,
    status: row.status as Property["status"],
    availableFrom: row.availableFrom ?? undefined,
    gradient: row.gradient,
    images: row.images ?? [],
    featured: row.featured ?? false,
    landlordId: row.landlordId ?? undefined,
  }));
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  const { db } = await import("./db");
  const { property: propertyTable } = await import("./db-schema");
  const { eq } = await import("drizzle-orm");
  const rows = await db()
    .select()
    .from(propertyTable)
    .where(eq(propertyTable.id, id));
  const row = rows[0];
  if (!row) return undefined;
  return {
    id: row.id,
    propertyId: row.propertyId,
    title: row.title,
    type: row.type as Property["type"],
    price: row.price,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    parking: row.parking,
    size: row.size,
    location: row.location,
    area: row.area,
    description: row.description,
    features: row.features,
    status: row.status as Property["status"],
    availableFrom: row.availableFrom ?? undefined,
    gradient: row.gradient,
    images: row.images ?? [],
    featured: row.featured ?? false,
    landlordId: row.landlordId ?? undefined,
  };
}

export async function getSimilarProperties(property: Property): Promise<Property[]> {
  const { db } = await import("./db");
  const { property: propertyTable } = await import("./db-schema");
  const { eq, ne, or, and } = await import("drizzle-orm");
  const rows = await db()
    .select()
    .from(propertyTable)
    .where(
      and(
        ne(propertyTable.id, property.id),
        or(
          eq(propertyTable.area, property.area),
          eq(propertyTable.type, property.type),
        ),
      ),
    )
    .limit(3);
  return rows.map((row) => ({
    id: row.id,
    propertyId: row.propertyId,
    title: row.title,
    type: row.type as Property["type"],
    price: row.price,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    parking: row.parking,
    size: row.size,
    location: row.location,
    area: row.area,
    description: row.description,
    features: row.features,
    status: row.status as Property["status"],
    availableFrom: row.availableFrom ?? undefined,
    gradient: row.gradient,
    images: row.images ?? [],
    featured: row.featured ?? false,
    landlordId: row.landlordId ?? undefined,
  }));
}

export function formatPrice(price: number): string {
  return `UGX ${(price / 1000000).toFixed(1)}M`;
}
