import path from 'path'
import { getFiles } from './files'

describe('files helpers', () => {
  it('should get all markdown files in a directory', async () => {
    const files = await getFiles('content')
    console.log(files)
    console.log(files.map((file) => path.parse(file)))
    expect(files.length).toBeGreaterThan(0)
  })
})
