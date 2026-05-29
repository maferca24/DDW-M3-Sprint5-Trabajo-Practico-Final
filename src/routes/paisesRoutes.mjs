//defino rutas de la API para paises
import express from 'express';// Importar el framework Express para crear el servidor web
import { validatePais } from '../middlewares/middlewarePais.mjs';// Importar el middleware de validación para los países    
import {body, validationResult} from 'express-validator';// Importar funciones de express-validator para validar los datos de entrada

import { obtenerYProcesarPaises, crearPais, actualizarPais, obtenerPaisPorId, eliminarPaisporId } from '../services/paisService.mjs';// Importar el servicio que obtiene y procesa los datos de la API externa
import paisRepository from '../repositories/paisRepository.mjs';// Importar el repositorio que guarda los datos en la base de datos
const router = express.Router();

import { getDashboardController, crearPaisController, actualizarPaisController, obtenerPaisPorIdController, eliminarPaisporIdController } from "../controllers/paisController.mjs"; 

// Ruta para agregar un nuevo país (desde el formulario del frontend)
router.post('/paises', validatePais, crearPaisController);

// Ruta para editar un pais existente (desde el formulario del frontend)
router.put('/paises/id/:id', validatePais, actualizarPaisController);

//Ruta para obtener un país por ID (para mostrar los datos en el formulario de edición)
// http://localhost:3000/api/paises/69c6fd59d90e243b1c0fad1b
router.get('/paises/:id', obtenerPaisPorIdController);

//ruta para eliminar un país por ID (desde el botón de eliminar en el frontend)
router.delete('/paises/id/:id', eliminarPaisporIdController);

// Ruta para probar cargar la base de datos con los datos de la API externa, 
// usando el servicio que obtiene y procesa los datos.
router.post('/sincronizar', async (req, res) => {
    try {
        //Obtenemos los datos procesados desde el servicio (Axios)
        const datosLimpios = await obtenerYProcesarPaises(); 
        
        // Guardamos en la base de datos mediante tu repositorio
        await paisRepository.guardarMuchos(datosLimpios);    
        
        // Respondemos con un objeto JSON estructurado y estado 201 (Created) o 200 (OK)
        res.status(200).json({
            success: true,
            message: "¡Base de datos de países actualizada con éxito!",
            count: datosLimpios.length // Opcional: muestra cuántos países procesó
        });
        
    } catch (error) {
        console.error("Error en la ruta de sincronización:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error en la sincronización: " + error.message 
        });
    }
});
//http://localhost:3000/api/sincronizar
//Usar esta ruta solo para cargar la base de datos por primera vez, 
// o para actualizarla con los datos de la API externa cuando sea necesario.
//Use GET para que sea facil de mostrar por navegador
//router.get('/sincronizar', async (req, res) => {
//     try {
//         const datosLimpios = await obtenerYProcesarPaises(); // Llama al servicio que obtiene y procesa los datos de la API externa
//         await paisRepository.guardarMuchos(datosLimpios);    // Llama al repositorio que guarda los datos en la base de datos 
//         res.send("¡Base de datos de países actualizada con éxito!");
//     } catch (error) {
//         res.status(500).send("Error en la sincronización: " + error.message);
//     }
// });



export default router;
