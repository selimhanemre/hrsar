import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string(),
    features: z.array(z.string()),
    heroTitle: z.string(),
    heroBody: z.string(),
    whyUs: z.array(z.string()),
    ctaTitle: z.string(),
  }),
});

const reviews = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    town: z.string(),
    service: z.string(),
    stars: z.number().default(5),
    text: z.string(),
  }),
});

const trustedBy = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    textOnly: z.boolean().default(false),
  }),
});

export const collections = { services, reviews, trustedBy };
