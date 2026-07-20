CREATE TABLE "property" (
	"id" text PRIMARY KEY NOT NULL,
	"property_id" text NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"price" integer NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"parking" integer NOT NULL,
	"size" integer NOT NULL,
	"location" text NOT NULL,
	"area" text NOT NULL,
	"description" text NOT NULL,
	"features" text[] NOT NULL,
	"status" text DEFAULT 'Available' NOT NULL,
	"available_from" text,
	"gradient" text NOT NULL,
	"landlord_id" text,
	CONSTRAINT "property_property_id_unique" UNIQUE("property_id")
);
--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_landlord_id_user_id_fk" FOREIGN KEY ("landlord_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;