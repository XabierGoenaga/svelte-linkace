import { relations } from 'drizzle-orm';
import { boolean, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from './auth.schema';

export const links = pgTable('links', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	url: text('url').notNull(),
	description: text('description'),
	favorite: boolean('favorite').notNull().default(false),
	favicon: text('favicon'),
	coverImage: text('cover_image'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const linksRelations = relations(links, ({ many }) => ({
	tags: many(tags)
}));

export const tags = pgTable('tags', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const tagsRelations = relations(tags, ({ many }) => ({
	links: many(links)
}));

export const linkTags = pgTable(
	'link_tags',
	{
		linkId: serial('link_id')
			.notNull()
			.references(() => links.id, { onDelete: 'cascade' }),
		tagId: serial('tag_id')
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade' })
	},
	(t) => [primaryKey({ columns: [t.linkId, t.tagId] })]
);

export const linkTagsRelations = relations(linkTags, ({ one }) => ({
	link: one(links, {
		fields: [linkTags.linkId],
		references: [links.id]
	}),
	tag: one(tags, {
		fields: [linkTags.tagId],
		references: [tags.id]
	})
}));
