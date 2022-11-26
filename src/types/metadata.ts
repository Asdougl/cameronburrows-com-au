import { z } from 'zod'

export const Category = z.enum(['travel', 'tech', 'misc'])
export type Category = z.infer<typeof Category>

export const Metadata = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.string().array().default([]),
  summary: z.string(),
  packages: z.string().array().optional(),
  category: Category.default('misc'),
})
export type Metadata = z.infer<typeof Metadata>
