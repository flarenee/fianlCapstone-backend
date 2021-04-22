/* eslint-disable strict */

const reservations = require('../seedData/00-reservations')

exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE reservations RESTART IDENTITY CASCADE')
    .then(() => knex('reservations').insert(reservations))
}
