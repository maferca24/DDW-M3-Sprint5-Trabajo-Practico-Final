// El repositorio es el encargado de interactuar con la base de datos. En este caso, con MongoDB a través de Mongoose.
// Aquí definimos las funciones para guardar los países obtenidos de la API externa, para obtener los países guardados en la base de datos.
import Pais from '../models/paisModel.mjs';// Importamos el modelo de Mongoose para poder interactuar con la base de datos
import IRepository from './IRepository.mjs' // Importamos la interfaz para asegurarnos de implementar los métodos necesarios


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
    // Función para obtener un país por ID, para mostrar los datos en el formulario de edición
    async obtenerPorId(id) {
        try {   
            const pais = await Pais.findById(id);
            if (!pais) {
                throw new Error('País no encontrado');
            }   
            return pais;
        } catch (error) {
            console.error("Error al obtener el país por ID:", error);
            throw new Error('Error al obtener el país de la base de datos');
        }
        return await Pais.findById(id);
    }

    // Función para crear un nuevo país a través del formulario del frontend
    async crear(pais) {
        try {
            // Usamos 'pais' que es lo que recibe la función
            const nuevoPais = new Pais(pais);

            // Lo guardamos en MongoDB
            console.log('Pais creado con exito');
            //console.log(datosPais);
            return await nuevoPais.save();

        } catch (error) {
            // Es buena idea imprimir el error real en consola para debuguear
            console.error("Error en Repository:", error);
            throw new Error('Error al guardar el pais en la base de datos');
        }

    }
    // Función para actualizar un país existente a través del formulario del frontend
    async actualizar(id, datosActualizados) {
         try {
            return await Pais.findByIdAndUpdate(
                id,
                { $set: datosActualizados },
                { returnDocument:"after" }
            );
        } catch (error) {
            throw new Error('Error al actualizar el país en la base de datos');
        }


        // try {
        //     // Usamos 'datosActualizados' que es lo que recibe la función
        //     const paisActualizado = await Pais.findByIdAndUpdate(
        //         id,
        //         datosActualizados,
        //         { new: true, runValidators: true } // Devuelve el documento actualizado y ejecuta validaciones
        //     );      
        //     if (!paisActualizado) {
        //         throw new Error('País no encontrado');
        //     }   
        //     console.log('País actualizado con éxito');
        //     return paisActualizado;
        // } catch (error) {
        //     console.error("Error en Repository:", error);
        //     throw new Error('Error al actualizar el país en la base de datos');
        // }       
    }
}
export default new PaisRepository();// Exportamos una instancia de la clase para usarla en el servicio y el controlador



