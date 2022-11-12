import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { Metadata } from '../src/types/metadata'

const readCategory = async (category: string) => {
  const dir = path.join(process.cwd(), 'content', category)
  const content = await fs.readdir(dir)
  return content
    .filter((file) => path.extname(file) === '.md')
    .map((file) =>
      fs.readFile(path.resolve(process.cwd(), 'content', category, file))
    )
}

describe('content validation', () => {
  it('should have correct content attributes', async () => {
    const [techfilenames, travelfilenames, miscfilenames] = await Promise.all([
      readCategory('tech'),
      readCategory('travel'),
      readCategory('misc'),
    ])

    const content = [...techfilenames, ...miscfilenames, ...travelfilenames]

    const filecontents = await Promise.all(content)

    for (const file of filecontents) {
      const { data } = matter(file.toString())
      const parse = Metadata.safeParse(data)
      expect(parse.success).toBe(true)
    }
  })
})
