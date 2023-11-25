import app from '../server'
import supertest from 'supertest'

const request = supertest(app)

describe('Test app.ts', () => {
  test('Catch-all route', async () => {
    const res = await request.get('/')
    expect(res.body).toEqual({ message: 'Allo! Catch-all route.' })
  })
})

describe('/test endpoint', () => {
  it('should return a response', async () => {
    const response = await request.get('/test')
    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello world')
  })
})
