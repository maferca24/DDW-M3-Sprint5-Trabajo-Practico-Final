import express from 'express';// Importar el framework Express para crear el servidor web
import { getDashboardController } from "../controllers/paisController.mjs"; // Importar el 
// controlador para mostrar el dashboard con la lista de países
const router = express.Router();
//Ruta para mostrar el dashboard la lista de paises desde el controlador nuevo
router.get("/", getDashboardController);

//Ruta para mostrar el formulario de creación de un nuevo pais
router.get("/nuevo", (req, res) => {
    res.render("addPais", { title: 'Agregar País' });// Renderiza la vista addPais.ejs para mostrar el formulario de creación de un nuevo país
});

//ruta para mostrar el formulario de edición de un pais existente, obteniendo los datos del pais desde la API
router.get("/modificar/:id", async (req, res) => {
    console.log("ID recibido en la ruta de edición:", req.params.id); // Verifica que el ID se reciba correctamente en la ruta   
    const respuesta = await fetch(
        `${req.protocol}://${req.get("host")}/api/paises/${req.params.id}`
        // `http://localhost:3000/api/paises/${req.params.id}`,     
    );
    console.log("Respuesta de la API:", respuesta); // Verifica que se reciba una respuesta de la API
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
