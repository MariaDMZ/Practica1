'use strict'

/*
|--------------------------------------------------------------------------
| MovieSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Movie = use('App/Models/Pelicula')
const Database = use('Database')

class MovieSeeder {
  async run () {
    // const movie = await Movie
    // console.log(movie)

    // await Movie.insert
    await Database.table('Peliculas').insert([
      {
        Titulo: 'La lista de Shindler',
        Genero: 'Drama',
        Categoria: '5 estrella(s)',
        Sinopsis: 'En el apogeo de la Alemania Nazi un empresario simpatisante del partido cuida de las personas que trabajan para el',
        Año: 2008,
        Precio: 150.00
      },
      {
        Titulo: 'Son como niños',
        Genero: 'Comedia',
        Categoria: '4.5 estrella(s)',
        Sinopsis: 'Otra pelicula de Adam Sandler actuando como Adam Sandler',
        Año: 2016,
        Precio: 119.99
      }
    ])

    const movies = await Factory.model('App/Models/Pelicula').createMany(8)
  }
}

module.exports = MovieSeeder
