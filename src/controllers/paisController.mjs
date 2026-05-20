//La capa de controladores gestiona las solicitudes del cliente y llama
//a la capa de servicios para realizar las operaciones necesarias
// El controlador es el encargado de recibir las solicitudes del cliente, procesarlas (si es necesario) y llamar a los servicios 
// para obtener los datos o realizar las operaciones necesarias. Luego, devuelve la respuesta al cliente, ya sea renderizando una vista o enviando un JSON.
import { obtenerTodosLosPaises, crearPais }
    from "../services/paisService.mjs";

//importa vistas para renderizar respuestas
 import { renderizarListaPaises, renderizarPais }
     from "../views/responseViews.mjs";  
    
 
// Nuevo controlador para renderizar el dashboard
export async function getDashboardController(req, res) {
    const paises = await obtenerTodosLosPaises(); // Llama al servicio que obtiene los países de la base de datos        
    //vista a renderizar con los datos de los países
    console.log(paises);
    res.render("dashboard", { paises, title: 'Dashboard de Países' });    
}   
export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();
        const paisesFormateados = renderizarListaPaises(paises);
        res.status(200).json(paisesFormateados);

    } catch (error) {

        res.status(500).send({
            mensaje: 'Error al obtener los países',
            error: error.message
        });
    }
}
// Controlador para crear un nuevo país
export async function crearPaisController(req, res) {
    try {
        const pais = req.body;
        const nuevoPais = await crearPais(pais);

        // Respondemos con el objeto creado y un código 201 (Creado)
        res.status(201).send({
            mensaje: 'País creado con éxito',
            datos: nuevoPais
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al crear el país',
            error: error.message
        });
    }
}
// Controlador para actualizar un país existente
export async function actualizarPaisController(req, res) {
    try {
       
        //console.log("Cuerpo recibido:", req.body); // Verifica que el cuerpo de la solicitud se reciba correctamente
        const { id } = req.params; // Toma el ID que viene en la URL /api/heroes/:id
        const datosActualizados = req.body;

        const pais = await actualizarPais(id, datosActualizados);

        if (!pais) {
            return res.status(404).send({ mensaje: "País no encontrado" });
        }
        // Respondemos con el objeto actualizado y un código 200 (Actualizado)
        res.status(200).send({
            mensaje: 'País actualizado con éxito',
            datos: superheroe
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al actualizar el país',
            error: error.message
        });
    }
}







