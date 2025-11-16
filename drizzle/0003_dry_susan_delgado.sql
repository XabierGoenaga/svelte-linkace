ALTER TABLE "link_tags" ADD CONSTRAINT "link_tags_link_id_tag_id_pk" PRIMARY KEY("link_id","tag_id");--> statement-breakpoint
ALTER TABLE "link_tags" DROP COLUMN "createdAt";