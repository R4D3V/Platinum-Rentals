import { SAMPLE_PROPERTIES, SAMPLE_LANDS } from "./data";
import { db } from "./db";
import { property, land } from "./db-schema";

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

  await db().insert(property).values(values).onConflictDoNothing();
  console.log(`Seeded ${values.length} properties`);

  const landValues = SAMPLE_LANDS.map((l) => ({
    id: l.id,
    landId: l.landId,
    title: l.title,
    landType: l.landType,
    price: l.price,
    size: l.size,
    location: l.location,
    area: l.area,
    description: l.description,
    features: l.features,
    status: l.status,
    titleDocument: l.titleDocument,
    gradient: l.gradient,
  }));

  await db().insert(land).values(landValues).onConflictDoNothing();
  console.log(`Seeded ${landValues.length} lands`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
