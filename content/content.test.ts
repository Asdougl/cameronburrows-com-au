import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { Metadata } from '../src/types/metadata'

describe('content validation', () => {
  it('should have correct content attributes', async () => {
    const [techfilenames, travelfilenames, miscfilenames] = await Promise.all([
      fs.readdir(path.resolve(process.cwd(), 'content/tech')),
      fs.readdir(path.resolve(process.cwd(), 'content/travel')),
      fs.readdir(path.resolve(process.cwd(), 'content/misc')),
    ])

    const filenames = [...techfilenames, ...miscfilenames, ...travelfilenames]

    const filecontents = await Promise.all(
      filenames
        .filter((file) => path.extname(file) === '.md')
        .map((file) =>
          fs.readFile(path.resolve(process.cwd(), 'content', file))
        )
    )

    for (const file of filecontents) {
      const { data } = matter(file.toString())
      const parse = Metadata.safeParse(data)
      expect(parse.success).toBe(true)
    }
  })
})
