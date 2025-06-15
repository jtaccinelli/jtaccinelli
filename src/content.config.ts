import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Generic Types

const link = z.object({
  url: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  blurb: z.string().optional(),
});

// Collections

const links = defineCollection({
  loader: file("src/content/links.json"),
  schema: z.object({
    items: z.array(link),
  }),
});

const roles = defineCollection({
  loader: file("src/content/roles.json"),
  schema: z.object({
    title: z.string(),
    employer: z.string(),
    link: z.string(),
    start: z.string(),
    end: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: file("src/content/projects.json"),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    type: z.string(),
    url: z.string(),
    tools: z.string().array(),
  }),
});

// Actual Collections

export const collections = {
  links,
  roles,
  projects,
};
