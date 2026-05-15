import express from 'express';// Importar el framework Express para crear el servidor web
import path from 'path';// Importar el módulo 'path' para manejar rutas de archivos y directorios
import expressLayouts from 'express-ejs-layouts';// Importar el middleware 'express-ejs-layouts' para usar layouts con EJS
import { connectDB } from './config/dbConfig.mjs';// Importar la función 'connectDB' para conectar a la base de datos MongoDB
//import paisesRoutes from './routes/paisesRoutes.mjs';// Importar las rutas de la API para paises
import paisesfront from './routes/paisesFront.mjs';// Importar las rutas del frontend para paises

const app = express();// Crear instancia de Express
const PORT = process.env.PORT || 3000;// Definir el puerto para el servidor, usando una variable de entorno o el puerto 3000 por defecto

//Configuración del motor de plantillas y vistas
app.set("view engine", "ejs");// Configurar ejs como motor de plantillas
app.set("views", path.resolve("./views")); //Especificar la carpeta donde se encuentran las vistas (plantillas ejs)

// Configuración de Layouts,se configura express-ejs-layouts para usar un layout común en las vistas
app.use(expressLayouts);
app.set('layout', 'layout'); // Busca views/layout.ejs- Indica que use layout.ejs por defecto para todas las vistas

// Archivos estáticos y Middlewares
app.use(express.static(path.resolve("./public")));// Servir archivos estáticos desde la carpeta "public" (para CSS, JS, imágenes, etc.)
app.use(express.json()); // Para procesar JSON en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true })); // Útil si envías datos por formularios simples ????

// Conexión a MongoDB
connectDB();

// Definimo Rutas
// Página de inicio (Landing Page)
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Inicio' //paso el titulo a la vista index.ejs para que se muestre en el navegador
    });
});

// Rutas de la API (Backend)
app.use('/api', paisesRoutes);// Configurar las rutas de la API para paises, que se encuentran en el archivo paisesRoutes.mjs

// Rutas del Dashboard (Frontend/Vistas)
//Guia para configurar rutas- API y Frontend
app.use("/dashboard", paisesfront);// Configurar la ruta para el dashboard, que renderiza las vistas del frontend para paises   

// Manejo de errores 404 (Página no encontrada)
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

//Importante: Para levantar el servidor en render es necesario configurar el puerto http al que render va escuchar
app.listen(PORT, '0.0.0.0', () => {//
    console.log(`Servidor levantado en el puerto ${PORT}`);
});