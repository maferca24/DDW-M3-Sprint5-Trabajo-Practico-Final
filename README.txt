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
    filtrados por el servicio de Axios, ejecuta una petición GET mediante
    Postman o desde la consola a la siguiente URL:
    GET http://localhost:3000/api/sincronizar
 
 - Consideraciones Especiales
    Doble Capa de Validación : La aplicación cuenta con validaciones en el Frontend (HTML5 y JavaScript) para guiar al usuario de manera ágil. Adicionalmente, cuenta con un middleware en el Backend desarrollado con express-validator, impidiendo la inyección de datos corruptos o peticiones maliciosas externas a la base de datos.

 - Actualmente, la integración de la API externa se encuentra en paisService. 
  Se podría pasar el consumo de Axios hacia paisRepository para cumplir con el principio de responsabilidad única, 
  dejando al servicio únicamente la gestión de las reglas de negocio.  
