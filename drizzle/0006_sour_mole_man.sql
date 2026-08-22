CREATE TABLE "land" (
	"id" text PRIMARY KEY NOT NULL,
	"land_id" text NOT NULL,
	"title" text NOT NULL,
	"land_type" text NOT NULL,
	"price" integer NOT NULL,
	"size" integer NOT NULL,
	"location" text NOT NULL,
	"area" text NOT NULL,
	"description" text NOT NULL,
	"features" text[] NOT NULL,
	"status" text DEFAULT 'Available' NOT NULL,
	"title_document" text DEFAULT 'Freehold' NOT NULL,
	"gradient" text NOT NULL,
	"images" text[] DEFAULT '{}' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"landlord_id" text,
	CONSTRAINT "land_land_id_unique" UNIQUE("land_id")
);
--> statement-breakpoint
ALTER TABLE "land" ADD CONSTRAINT "land_landlord_id_user_id_fk" FOREIGN KEY ("landlord_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;