const crypto = require('crypto')
const axios = require('axios')
const app = require('../app')
const database = require('../infra/database')

const dogsService = require('../services/dogsService')

let server

beforeAll(async function () {
  await new Promise(function (resolve) {
    server = app.listen(3333, resolve)
  })
})

beforeEach(async function () {
  await database.none('truncate table dogs_adoption restart identity')
})

afterAll(async function () {
  if (server) {
    await new Promise(function (resolve, reject) {
      server.close(function (error) {
        if (error) return reject(error)
        resolve()
      })
    })
  }
  await database.$pool.end()
})

const generate = function () {
  return crypto.randomBytes(5).toString('hex')
}

const request = function (url, method, data) {
  return axios({ url, method, data })
}

test('should get dogs', async function () {
  const dog1 = await dogsService.saveDog({
    name: generate(),
    age: '1',
    characteristics: generate(),
    health: generate(),
    gender: generate(),
    size: generate(),
    primary_color: generate(),
    photo: generate(),
    id_dog_adoption_center: '1',
    breeds: 'affenpinscher'
  })
  const response = await request('http://localhost:3333/dogs', 'get')
  const dogs = response.data
  expect(dogs).toHaveLength(1)
  await dogsService.deleteDog(dog1.id)
})

test('should save a dog', async function () {
  const data = {
    name: generate(),
    age: '1',
    characteristics: generate(),
    health: generate(),
    gender: generate(),
    size: generate(),
    primary_color: generate(),
    photo: generate(),
    id_dog_adoption_center: '1',
    breeds: 'affenpinscher'
  }
  const response = await request('http://localhost:3333/dogs', 'post', data)
  const dog = response.data
  expect(dog.name).toBe(data.name)
  expect(dog.breeds).toBe(data.breeds)
  await dogsService.deleteDog(dog.id)
})

test('should update a dog', async function () {
  const dog = await dogsService.saveDog({
    name: generate(),
    age: '1',
    characteristics: generate(),
    health: generate(),
    gender: generate(),
    size: generate(),
    primary_color: generate(),
    photo: generate(),
    id_dog_adoption_center: '1',
    breeds: 'affenpinscher'
  })
  dog.name = generate()
  dog.age = '2'
  dog.characteristics = generate()
  dog.health = generate()
  dog.gender = generate()
  dog.size = generate()
  dog.primary_color = generate()
  dog.photo = null
  dog.id_dog_adoption_center = '1'
  dog.breeds = 'beagle'

  await request(`http://localhost:3333/dog/${dog.id}`, 'put', dog)
  const updateDog = await dogsService.getDog(dog.id)

  expect(updateDog.name).toBe(dog.name)
  expect(updateDog.age).toBe(dog.age)
  expect(updateDog.characteristics).toBe(dog.characteristics)
  expect(updateDog.health).toBe(dog.health)
  expect(updateDog.gender).toBe(dog.gender)
  expect(updateDog.size).toBe(dog.size)
  expect(updateDog.primary_color).toBe(dog.primary_color)
  expect(updateDog.photo).toBe(dog.photo)
  expect(updateDog.id_dog_adoption_center.toString()).toBe(dog.id_dog_adoption_center)
  expect(updateDog.breeds).toBe(dog.breeds)

  await dogsService.deleteDog(dog.id)
})

test('should delete a dog', async function () {
  const dog = await dogsService.saveDog({
    name: generate(),
    age: '1',
    characteristics: generate(),
    health: generate(),
    gender: generate(),
    size: generate(),
    primary_color: generate(),
    photo: generate(),
    id_dog_adoption_center: '1',
    breeds: 'affenpinscher'
  })

  await request(`http://localhost:3333/dog/${dog.id}`, 'delete')
  const dogs = await dogsService.getDogs()
  expect(dogs).toHaveLength(0)
})
