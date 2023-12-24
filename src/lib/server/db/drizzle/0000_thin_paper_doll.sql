CREATE TABLE IF NOT EXISTS "user" (
	"id" bigint PRIMARY KEY NOT NULL,
	"email" varchar(100) NOT NULL,
	"first_name" varchar(253) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "user" ("email");