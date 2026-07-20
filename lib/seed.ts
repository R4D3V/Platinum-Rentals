import { SAMPLE_PROPERTIES } from "./data";
import { db } from "./db";
import { property } from "./db-schema";

async function seed() {
  const values = SAMPLE_PROPERTIES.map((p) => ({
    id: p.id,
    propertyId: p.propertyId,
    title: p.title,
    type: p.type,
    price: p.price,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    parking: p.parking,
    size: p.size,
    location: p.location,
    area: p.area,
    description: p.description,
    features: p.features,
    status: p.status,
    availableFrom: p.availableFrom ?? null,
    gradient: p.gradient,
  }));

  await db.insert(property).values(values).onConflictDoNothing();
  console.log(`Seeded ${values.length} properties`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
