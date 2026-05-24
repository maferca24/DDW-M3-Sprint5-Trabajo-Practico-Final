import express from 'express'; // Importar el framework Express para crear el servidor web
import path from 'path'; // Importar el módulo 'path' para manejar rutas de archivos y directorios
import expressLayouts from 'express-ejs-layouts'; // Importar el middleware 'express-ejs-layouts' para usar layouts con EJS
import { connectDB } from './config/dbConfig.mjs'; // Importar la función 'connectDB' para conectar a la base de datos MongoDB
import paisesRoutes from './routes/paisesRoutes.mjs'; // Importar las rutas de la API para paises
//import { paisesRoutes } from './routes/paisesRoutes.mjs'; // Importar las rutas de la API para paises
import paisesfront from './routes/paisesFront.mjs'; // Importar las rutas del frontend para paises

const app = express(); // Crear instancia de Express
const PORT = process.env.PORT || 3000; // Definir el puerto para el servidor

// Identificar la raíz actual de ejecución (src) para configurar correctamente las rutas de archivos estáticos y vistas
const __dirname = path.resolve(); 
//console.log("-> Ruta base actual (__dirname):", __dirname); 

//Configuración de archivos estáticos (CSS, JS, imágenes, etc.) 
app.use(express.static(path.join(__dirname, '..', 'public')));// Como __dirname es 'src', usamos '..' para salir a la raíz del proyecto y encontrar 'public'

//Configuración de vistas y motor de plantillas (EJS) 
// Como las vistas están dentro de 'src/views', y __dirname ya es 'src', las unimos directamente
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Configurar ejs como motor de plantillas

// Configuración de Layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Busca views/layout.ejs por defecto

// Middlewares para procesar datos
app.use(express.json()); // Para procesar JSON
app.use(express.urlencoded({ extended: true })); // Para procesar formularios simples

// Conexión a MongoDB
connectDB();

// ==========================================
// DEFINICIÓN DE RUTAS
// ==========================================

// Página de inicio (Landing Page)
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Gestión de Países' // Título dinámico para el head
    });
});

app.get("/acerca-de", (req, res) => {
    res.render("about", { title: 'Acerca de' 

    });// Renderiza la vista about.ejs para mostrar la página de "Acerca de"
});

// Rutas de la API (Backend)
app.use('/api', paisesRoutes);

// Rutas del Dashboard (Frontend/Vistas)
app.use("/dashboard", paisesfront);

// Manejo de errores 404 (Página no encontrada)
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

// // Levantar el servidor
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Servidor levantado con éxito en el puerto ${PORT}`);
// });

// Rutas de la API (Backend)
app.use('/api', paisesRoutes);// Configurar las rutas de la API para paises, que se encuentran en el archivo paisesRoutes.mjs

// Rutas del Dashboard (Frontend/Vistas)
app.use("/dashboard", paisesfront);// Configurar la ruta para el dashboard, que renderiza las vistas del frontend para paises   

// Manejo de errores 404 (Página no encontrada)
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

//Importante: Para levantar el servidor en render es necesario configurar el puerto http al que render va escuchar
app.listen(PORT, '0.0.0.0', () => {//
    console.log(`Servidor levantado en el puerto ${PORT}`);
});

