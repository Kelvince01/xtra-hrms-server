import request from 'supertest'
import app from '../../server'

const AUTH_ROUTE = '/api/auth/login'

describe('#1 Return ERROR when credential is missing', () => {
  test('should throw error when there is no credentials', async () => {
    const res = await request(app).post(AUTH_ROUTE).send({})
    expect(res.body.status).toBe('error')
    expect(res.body.message).toBe('missing account and password')
  })

  test('should throw error when there is no account', async () => {
    let CREDENTIALS_NO_ACCOUNT
    const res = await request(app).post(AUTH_ROUTE).send(CREDENTIALS_NO_ACCOUNT)
    expect(res.body.status).toBe('error')
    expect(res.body.message).toBe('missing account')
  })

  test('should throw error when there is account but no password', async () => {
    let CREDENTIALS_NO_PASSWORD
    const res = await request(app)
      .post(AUTH_ROUTE)
      .send(CREDENTIALS_NO_PASSWORD)
    expect(res.body.status).toBe('error')
    expect(res.body.message).toBe('missing password')
  })
})

describe('#2 Return success, username and accessToken when credential is valid', () => {
  test('should return with username and accessToken when the credentials are valid', async () => {
    let CORRECT_CREDENTIALS
    const res = await request(app).post(AUTH_ROUTE).send(CORRECT_CREDENTIALS)
    expect(res.body.status).toBe('success')
    expect(res.body).toHaveProperty('username')
    expect(res.body).toHaveProperty('accessToken')
  })
})

describe('POST /users', () => {
  describe('when passed a username and password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/users').send({
        username: 'username',
        password: 'password',
      })
      expect(response.statusCode).toBe(200)
    })
  })
})

describe('when the username or password is missing', () => {
  test('should specify json as the content type in the http header', async () => {
    const response = await request(app).post('/users').send({
      username: 'username',
      password: 'password',
    })
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    )
  })

  test('should contain a userId in the response body', async () => {
    const response = await request(app).post('/users').send({
      username: 'username',
      password: 'password',
    })
    expect(response.body.userId).toBeDefined()
  })

  test('should return a 400 status code', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'username' })
    expect(response.statusCode).toBe(400)
  })
})
