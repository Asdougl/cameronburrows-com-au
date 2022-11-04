import fs from 'fs/promises'
import path from 'path'

// recursively read all markdown files in a directory
export const getFiles = async (dir: string): Promise<string[]> => {
  const filenames = await fs.readdir(path.resolve(process.cwd(), dir))
  const files = await Promise.all(
    filenames.map(async (filename) => {
      const filepath = path.resolve(process.cwd(), dir, filename)
      const stat = await fs.stat(filepath)
      if (stat.isDirectory()) {
        return getFiles(filepath)
      } else {
        return filepath
      }
    })
  )
  return files.flat()
}
