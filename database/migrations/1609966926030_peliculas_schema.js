'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovieSchema extends Schema {
  up () {
    this.create('Peliculas', (table) => {
      table.increments()
      table.string('Titulo').notNullable().unique()
      table.string('Genero').notNullable()
      table.string('Categoria').notNullable()
      table.text('Sinopsis').notNullable()
      table.integer('Año').notNullable()
      table.float('Precio').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('Peliculas')
  }
}

module.exports = MovieSchema
