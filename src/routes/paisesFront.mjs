import express from 'express';// Importar el framework Express para crear el servidor web
const router = express.Router();
//Ruta para mostrar el dashboard la lista de paises desde el controlador nuevo
//router.get("/", getDashboardController); 
//Ruta para mostrar el formulario de creación de un nuevo pais
router.get("/nuevo", (req, res) => {
    res.render("addPais", { title: 'Agregar País' });// Renderiza la vista addPais.ejs para mostrar el formulario de creación de un nuevo país
});
//ruta para mostrar el formulario de edición de un pais existente, obteniendo los datos del pais desde la API
router.get("/modificar/:id", async (req, res) => {      
    const respuesta = await fetch(
    `${req.protocol}://${req.get("host")}/api/paises/${req.params.id}`//`http://localhost:3000/api/paises/${req.params.id}`,    
    //`https://ddw-m3-sprint4-trabajopractico1.onrender.com/api/paises/${req.params.id}`,
);  
if (!respuesta.ok) {
    return res.status(404).send("Error al obtener el país");
}       
const pais = await respuesta.json();
    if (!pais) {
        return res.status(404).send("País no encontrado en la API");
    }   
    res.render("editPais", {
        pais,
        title: 'Editar País'
    });
});

export default router;  


//Guia para importar rutas- API y Frontend
// import express from "express";
// import { getDashboardController } from "../controllers/superheroesControllers.mjs";

// const router = express.Router();
// // // //Ruta para mostrar el dashboard con la lista de heroes desde el controlador nuevo
// router.get("/", getDashboardController);

// //Ruta para mostrar el formulario de creación de un nuevo heroe
// router.get("/nuevo", (req, res) => {
//     res.render("addSuperhero", { title: 'Agregar Superhéroe' });// Renderiza la vista addSuperhero.ejs para mostrar el formulario de creación de un nuevo superhéroe
// });
// //ruta para mostrar el formulario de edición de un heroe existente, obteniendo los datos del heroe desde la API
// router.get("/modificar/:id", async (req, res) => {

//     //console.log("ID del héroe a modificar:", req.params.id);
//     const respuesta = await fetch(
//     `${req.protocol}://${req.get("host")}/api/heroes/${req.params.id}`//`http://localhost:3000/api/heroes/${req.params.id}`,    
//     //`https://ddw-m3-sprint4-trabajopractico1.onrender.com/api/heroes/${req.params.id}`,
// );
// //Consejo:
// // Backend → usar rutas dinámicas //${req.protocol}://${req.get("host")}
// //Frontend → usar rutas relativas //fetch('/api/heroes')

// if (!respuesta.ok) {
//     return res.status(404).send("Error al obtener el héroe");
// }

// const heroe = await respuesta.json();

//     if (!heroe) {
//         return res.status(404).send("Superhéroe no encontrado en la API");
//     }

//     res.render("editSuperhero", {
//         heroe,
//         title: 'Editar Superhéroe'
//     });

// });

// export default router;
