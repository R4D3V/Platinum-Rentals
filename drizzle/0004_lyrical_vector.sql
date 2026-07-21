CREATE TABLE "notification" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"link" text,
	"read" text DEFAULT 'false' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "push_subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"endpoint" text NOT NULL,
	"keys" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
