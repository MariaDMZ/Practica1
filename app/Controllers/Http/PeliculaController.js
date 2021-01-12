'use strict'

const DB = use('Database')
const Movie = use('App/Models/Pelicula')
// const { validate } = require('indicative')
const {validate} = use('Validator')

class MovieController {
    
    async index ({params, response}){
        const {id} = params
        
        if (id){
            const movie = await Movie.find(id)
            return response.json({Pelicula:movie})
        }else {
            const movies = await Movie.all()
            return response.json({Cartelera:movies})
        }
    }

    async create ({request, response}){
        const rules = {
            Titulo    : 'required|unique:movies',
            Genero   : 'required',
            Categoria : 'required',
            Sinopsis : 'required|min:10',
            Año     : 'required|number',
            Precio    : 'required|number'
        }
        const data = request.all()
        const validation = await validate(data, rules)
        
        if (validation.fails()) {
            return response.json({
                Notificacion:'Informacion invalida',
                Error:validation.messages()})
        }

        const movie = new Movie()
        movie.Titulo    = data.Titulo
        movie.Genero   = data.Genero
        movie.Categoria = data.Categoria
        movie.Sinopsis = data.Sinopsis
        movie.Año     = data.Año
        movie.Precio    = data.Precio

        try {
            await movie.save()
            return response.json({Notificacion:'Pelicula Registrada', DatosPelicula:movie})
        } catch (error) {
            return response.json(Error)
        }      
    }

    async update({params, request, response}){
        const {id} = params
        const data = request.all()

        const movie = await Movie.find(id)
        movie.Titulo    = data.Titulo
        movie.Genero   = data.Genero
        movie.Categoria = data.Categoria
        movie.Sinopsis = data.Sinopsis
        movie.Año     = data.Año
        movie.Precio    = data.Precio

        try {
            await movie.save()
            return response.json({Notificacion:'Datos de Pelicula Actualizados', DatosPelicula:movie})
        } catch (error) {
            return response.json(Error)
        }

    }

    async delete({params, response}){
        const {id} = params
        const movies = await Movie.all()  

        const movie = await Movie.find(id)
        await movie.delete()

        return response.json({Notificacion:'La pelicula - ' + movie.Titulo + ' - fue eliminada', PeliculasRegistradas:movies})
    }
}

module.exports = MovieController
