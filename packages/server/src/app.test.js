import request from 'supertest'
import { app } from './app'

describe('app', () => {
  it('should exist', done => {
    request(app)
      .get('/probe')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })
})
