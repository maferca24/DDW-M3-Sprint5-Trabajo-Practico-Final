// El repositorio es el encargado de interactuar con la base de datos. En este caso, con MongoDB a través de Mongoose.
// Aquí definimos las funciones para guardar los países obtenidos de la API externa, para obtener los países guardados en la base de datos.

import Pais from '../models/paisModel.mjs';// Importamos el modelo de Mongoose para poder interactuar con la base de datos

class PaisRepository {
    // Esta función recibe el array que generó el Servicio que toma los datos de la API externa y lo guarda en la base de datos. 
    // Si el país ya existe (mismo nombre oficial y creador), lo actualiza; si no, lo crea (upsert).
    async guardarMuchos(paises) {
        try {
            const promesas = paises.map(pais => {
                // Buscamos por nombre oficial y creador
                // Si existe, actualiza; si no, lo crea (upsert)
                return Pais.findOneAndUpdate(
                    { nombreOficial: pais.nombreOficial, creador: "Fernanda" },
                    pais,
                    { upsert: true, new: true, runValidators: true }// upsert: true crea si no existe, 
                    // new: true devuelve el documento actualizado, runValidators: true para validar con el esquema de Mongoose 
                    // (por ejemplo, para asegurarnos de que el nombre oficial tenga entre 3 y 90 caracteres)                     
                );
            });

            return await Promise.all(promesas);// Esperamos a que todas las operaciones de guardado/actualización se completen
        } catch (error) {
            console.error("Error al guardar en BD:", error);
            throw error;
        }
    }

    // Busca todos los países creados por mi. "Fernanda" para mostrarlos en el Dashboard
    async obtenerTodos() {
        return await Pais.find({ creador: "Fernanda" });
    }
}

export default new PaisRepository();