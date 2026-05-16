//defino rutas de la API para paises
import express from 'express';// Importar el framework Express para crear el servidor web
import { obtenerYProcesarPaises } from '../services/paisService.mjs';// Importar el servicio que obtiene y procesa los datos de la API externa
import paisRepository from '../repositories/paisRepository.mjs';// Importar el repositorio que guarda los datos en la base de datos
const router = express.Router();

//import { getDashboardController } from "../controllers/paisesControllers.mjs"; 

// Ruta para probar cargar la base de datos
router.get('/sincronizar', async (req, res) => {
    try {
        const datosLimpios = await obtenerYProcesarPaises(); // Llama al servicio que obtiene y procesa los datos de la API externa
        await paisRepository.guardarMuchos(datosLimpios);    // Llama al repositorio que guarda los datos en la base de datos 
        res.send("¡Base de datos de países actualizada con éxito!");
    } catch (error) {
        res.status(500).send("Error en la sincronización: " + error.message);
    }
});
export default router;






//Rutas fijas:
// //TP3-S2
// //Superheroes mayores a 30 años
// //http://localhost:3000/api/heroes/mayores-30
// router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
// //Rutas con parámetros
// //Superheroes por id
// //http://localhost:3000/api/heroes/69c6fd59d90e243b1c0fad1b
// router.get('/heroes/:id', obtenerSuperheroePorIdController);
// //Superheroes por atributo
// //http://localhost:3000/api/heroes/buscar/planetaOrigen/Tierra
// router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

// //
// //Todos los superheroes
// //GET- Mostrar todos los superheroes
// // http://localhost:3000/api/heroes
// router.get('/heroes', obtenerTodosLosSuperheroesController);

// //POST- Crear un superheroe
// //http://localhost:3000/api/heroes
// router.post('/heroes', validateSuperHeroe, crearSuperHeroeController);

// //PUT- Actualizar un superheroe por id
// //http://localhost:3000/api/heroes/:id
// router.put('/heroes/id/:id', validateSuperHeroe, actualizarSuperHeroeController);


// //DELETE- Elimnar un superheroe por id
// //http://localhost:3000/api/heroes/:id
// //http://localhost:3000/api/heroes/69e00b5f98572b8f21c7876d
// router.delete('/heroes/id/:id', eliminarSuperHeroeporIdController);

// //DELETE- Elimnar un superheroe por nombre
// router.delete('/heroes/nombre/:nombre', eliminarSuperHeroeporNombreController);

// export default router;
