import gql from 'graphql-tag'
import { createTestClient } from 'apollo-server-testing'
import { apollo } from './apollo'

describe('Queries', () => {
  it('should response exist', async () => {
    const { query } = createTestClient(apollo)
    const res = await query({
      query: gql`
        query probe {
          probe
        }
      `,
    })

    expect(res).toMatchSnapshot()
  })
})
