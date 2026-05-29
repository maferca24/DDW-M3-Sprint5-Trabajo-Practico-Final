import express from 'express';// Importar el framework Express para crear el servidor web
import { getDashboardController } from "../controllers/paisController.mjs"; // Importar el 
// controlador para mostrar el dashboard con la lista de países
const router = express.Router();// Crear un router de Express para definir las rutas relacionadas con el frontend de países
//Ruta para mostrar el dashboard la lista de paises desde el controlador nuevo
router.get("/", getDashboardController);// Configurar la ruta raíz del dashboard para mostrar la lista de países utilizando el controlador getDashboardController

//Ruta para mostrar el formulario de creación de un nuevo pais
router.get("/nuevo", (req, res) => {
    res.render("addPais", { title: 'Agregar País' });// Renderiza la vista addPais.ejs para mostrar el formulario de creación de un nuevo país
});

//Ruta para mostrar el formulario de edición de un pais existente, obteniendo los datos del pais desde la API
router.get("/modificar/:id", async (req, res) => {
    //console.log("ID recibido en la ruta de edición:", req.params.id); // Verifica que el ID se reciba correctamente en la ruta   
    const respuesta = await fetch(
        `${req.protocol}://${req.get("host")}/api/paises/${req.params.id}`//modifique esta linea para usar la ruta relativa 
        // en lugar de la ruta absoluta, ya que el servidor y la API están en el mismo dominio y puerto. 
        // Esto hace que el código sea más flexible para diferentes entornos (desarrollo, producción, etc.).
        // `http://localhost:3000/api/paises/${req.params.id}`,     
    );
    //console.log("Respuesta de la API:", respuesta); // Verifica que se reciba una respuesta de la API
    if (!respuesta.ok) {
        return res.status(404).send("Error al obtener el país");
    }
    const pais = await respuesta.json();
    if (!pais) {
        return res.status(404).send("País no encontrado en la API");
    }
    //renderiza la vista editPais.ejs para mostrar el formulario de edición del país, 
    // pasando los datos del país obtenido de la API y un título dinámico para el head
    res.render("editPais", {
        pais,
        title: 'Editar País'
    });
});

export default router;

// Para tener en cuenta:
// Backend → usar rutas dinámicas //${req.protocol}://${req.get("host")}
// Frontend → usar rutas relativas //fetch('/api/heroes')