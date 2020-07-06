import resolver from './basic.resolvers'

describe('basic resolver', () => {
  it('can response', () => {
    const result = resolver.Query.probe()
    expect(result).toBe('exist')
  })
})
