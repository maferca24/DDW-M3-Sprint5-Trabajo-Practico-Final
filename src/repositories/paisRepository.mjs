// El repositorio es el encargado de interactuar con la base de datos. En este caso, con MongoDB a través de Mongoose.
// Aquí definimos las funciones para guardar los países obtenidos de la API externa, para obtener los países guardados en la base de datos.

import Pais from '../models/paisModel.mjs';// Importamos el modelo de Mongoose para poder interactuar con la base de datos
import IRepository from './IRepository.mjs'; // Importamos la interfaz para asegurarnos de implementar los métodos necesarios

class PaisRepository extends IRepository {
    // Esta función recibe el array que generó el Servicio que toma los datos de la API externa y lo guarda en la base de datos. 
    // Si el país ya existe (mismo nombre oficial y creador), lo actualiza; si no, lo crea (upsert).
    async guardarMuchos(paises) {
        try {
            const promesas = paises.map(pais => {
                // Buscamos por nombre oficial y creador
                // Si existe, actualiza; si no, lo crea (upsert)
                return Pais.findOneAndUpdate(
                    { nombreOficial: pais.nombreOficial, creador: "Fernanda", tipoDocumento: "pais" },
                    { ...pais, tipoDocumento: "pais" }, // Nos aseguramos de que viaje el campo tipoDocumento para que se guarde correctamente, 
                    // ya que es importante para filtrar los países en el futuro
                    { upsert: true, returnDocument: 'after', runValidators: true }
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
        // return await Pais.find({ creador: "Fernanda" });
        // Agregamos el filtro por creador y tipoDocumento para asegurarnos de que solo traemos documentos que son países, 
        // ya que estamos usando una colección compartida (Grupo-04)
        return await Pais.find({ creador: "Fernanda", tipoDocumento: "pais" });
    }
}

export default new PaisRepository();