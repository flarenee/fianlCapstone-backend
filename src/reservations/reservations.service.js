const knex = require('../db/connection')

const list = (date) => {
  console.log(date)
  return knex('reservations')
    .select('*')
    .where({ reservation_date: date })
    .whereNotIn('status', ['cancelled', 'finished'])
    .orderBy('reservation_time')
}
const show = (data) => {
  return knex('reservations').select('*')
}

const listByMobileNumber = (mobile_number) => {
  return knex('reservations')
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, '')}%`
    )
    .orderBy('reservation_date')
}

const read = (id) => {
  return knex('reservations').select('*').where({ reservation_id: id })
}

const create = (reservation) => {
  return knex('reservations').insert(reservation, '*')
}

const updateStatus = (reservation_id, status) => {
  return knex('reservations')
    .where({ reservation_id: reservation_id })
    .update({ status: status })
    .returning('status')
}

const update = (reservation_id, updatedReservation) => {
  return knex('reservations')
    .where({ reservation_id: reservation_id })
    .update(updatedReservation)
    .returning('*')
}

module.exports = {
  list,
  show,
  read,
  create,
  updateStatus,
  listByMobileNumber,
  update,
}
