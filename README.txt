Objetivo del Proyecto:
Construir una aplicación web que consuma datos de una API externa (REST Countries) para mostrar información relevante sobre los países hispanohablantes del continente americano. La aplicación permite a los usuarios explorar, agregar, editar y eliminar países, integrando validaciones tanto en el frontend como en el backend para garantizar la integridad de los datos. 
Tecnologías Utilizadas:
-Backend & Base de Datos
    Node.js & Express: Entorno de ejecución y framework para la construcción de la API REST.
    MongoDB & Mongoose: Base de Datos NoSQL y modelado de esquemas para los documentos de países.
    Express-Validator: Middleware encargado de la sanitización y validación de datos en el servidor.
-Frontend & Diseño
    EJS (Embedded JavaScript): Motor de plantillas para renderizar vistas dinámicas desde el servidor.
    Tailwind CSS: Framework utilitario para un diseño moderno, responsivo y estilizado.
- Para levantar el proyecto localmente, sigue estos pasos:
    -Abrir en local la consola de comandos y clonar el repositorio
        git clone https://github.com/maferca24/DDW-M3-Sprint5-Trabajo-Practico-Final.git
    -Ingresar a visual studio code
        code
    -Instalar las dependencias del proyecto
        npm install
    -Configurar conexión a la base de datos
        modificar en config/dbConfig.mjs
    -Ingresar al directorio del proyecto
        cd src/
    -Iniciar el servidor
        node app.mjs
    -Acceder a la aplicación en el navegador
        localhost:3000
    
    IMPORTANTE- Instrucción de inicialización (SINCRONIZAR API):
    Para poblar la base de datos automáticamente con los países hispanohablantes
    filtrados por el servicio de Axios, ejecuta una petición POST mediante
    Postman:
    POST http://localhost:3000/api/sincronizar
 
 - Consideraciones Especiales
    Doble Capa de Validación : La aplicación cuenta con validaciones en el Frontend (HTML5 y JavaScript) para guiar al usuario de manera ágil. 
    Adicionalmente, cuenta con un middleware en el Backend desarrollado con express-validator, impidiendo la inyección de datos corruptos o peticiones maliciosas externas a la base de datos.
 
 - Consideraciones de Arquitectura- Mejoras 

Con el objetivo de priorizar los tiempos de entrega del proyecto final, y para agilizar las pruebas de integración del flujo Axios-Mongoose
se tomaron ciertas decisiones de diseño centralizadas, que se reconocen deberian modificarse de acuerdo al patrón MVC. 

-Separar del Enrutador, la capa de controladores
Estado Actual: La lógica de control del endpoint `/sincronizar` (que coordina el servicio de Axios y el guardado en la base de datos) 
se encuentra definida directamente dentro del archivo de rutas (`paisesRoutes.mjs`).
* Se deberia extraer esta lógica hacia un método llamado `sincronizarPaisesController` dentro de la capa de Controladores. 
Con esto, el enrutador cumplirá con su única responsabilidad: definir los endpoints y delegar el flujo inmediatamente.

-Separación de Responsabilidades en el Consumo de APIs (Principio de Responsabilidad Única)
-Estado Actual: El servicio `obtenerYProcesarPaises` (alojado en `paisService.mjs`) realiza tanto 
la petición HTTP externa mediante `Axios` como la aplicación de las reglas de negocio 
(filtrado de países hispanohablantes).
* Se deberia trasladar (el consumo directo de la API externa con `Axios`) hacia el repositorio (`paisRepository.mjs`). 
De este modo, la capa de Servicio se concentrará en la gestión de las reglas de negocio.

-Validación de duplicados en cargas manuales.
- Estado Actual: El método crear ( que se encuentra en 'paisRepository') no verifica si el pais ya fue registrado.
* Se podría agregar una consulta, justo antes de agregar, para que el repositorio decida si graba o rechaza.


