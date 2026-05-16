//Configuración de la base de datos-Conexión a MongoDB
import dns from 'node:dns/promises'; // Nota el prefijo 'node:' recomendado-reemplacé el require que utilizabamos en el practico anterior porque usamos mjs
// Forzar servidores DNS: Google y Cloudflare
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from 'mongoose';

export async function connectDB(){
    try {    

        await mongoose.connect('mongodb+srv://grupo-04:grupo-04@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
        console.log('Conexión exitosa a MongoDB');
        
    } catch (error) {
        console.error ('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
}