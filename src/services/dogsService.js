const dogsData = require('../data/dogsData')
const axios = require('axios')

exports.getDogs = function () {
  return dogsData.getDogs()
}

exports.getDog = function (id) {
  return dogsData.getDog(id)
}

exports.saveDog = async function (dog) {
  const photo = await getImg(dog.breeds)
  dog.photo = photo
  return dogsData.saveDog(dog)
}

exports.updateDog = function (id, data) {
  return dogsData.updateDog(id, data)
}

exports.deleteDog = function (id) {
  return dogsData.deleteDog(id)
}

async function getImg (breeds) {
  if (!breeds) return null
  const breedsLowerCase = breeds.toLowerCase()
  try {
    const response = await axios.get(`https://dog.ceo/api/breed/${breedsLowerCase}/images/random`)
    return response.data.message || null
  } catch (error) {
    return null
  }
}
