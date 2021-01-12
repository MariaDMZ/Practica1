'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Movie extends Model {
    static get table (){ return 'pelicula' }
}

module.exports = Movie
