//La capa de controladores gestiona las solicitudes del cliente y llama
//a la capa de servicios para realizar las operaciones necesarias
// El controlador es el encargado de recibir las solicitudes del cliente, procesarlas (si es necesario) y llamar a los servicios 
// para obtener los datos o realizar las operaciones necesarias. Luego, devuelve la respuesta al cliente, ya sea renderizando una vista o enviando un JSON.
import {
}
    from "../services/paisService.mjs";

//importa vistas para renderizar respuestas
import { renderizarListaPaises, renderizarPais }
    from "../views/responseViews.mjs";  
    
 
// Nuevo controlador para renderizar el dashboard
export async function getDashboardController(req, res) {
    const paises = await obtenerTodos(); // Llama al servicio que obtiene los países de la base de datos        
    //vista a renderizar con los datos de los países
    //console.log(paises);
    res.render("dashboard", { paises, title: 'Dashboard de Países' });    
}   



