CREATE TABLE "link_to_tags" (
	"link_id" serial NOT NULL,
	"tag_id" serial NOT NULL,
	CONSTRAINT "link_to_tags_link_id_tag_id_pk" PRIMARY KEY("link_id","tag_id")
);
--> statement-breakpoint
DROP TABLE "link_tags" CASCADE;--> statement-breakpoint
ALTER TABLE "link_to_tags" ADD CONSTRAINT "link_to_tags_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "link_to_tags" ADD CONSTRAINT "link_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;