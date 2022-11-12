import { getFiles } from './files'

describe('files helpers', () => {
  it('should get all markdown files in a directory', async () => {
    const files = await getFiles('content')
    expect(files.length).toBeGreaterThan(0)
  })
})
