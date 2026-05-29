import mongoose from 'mongoose';// Importamos Mongoose para definir el esquema y el modelo de datos

const paisSchema = new mongoose.Schema({
    nombreOficial: { 
        type: String, 
        required: [true, 'El nombre oficial es obligatorio'],
        trim: true,
        minlength: [3, 'Mínimo 3 caracteres'],
        maxlength: [90, 'Máximo 90 caracteres']
    },
    capital: {
        type: [String],
        default: ['No tiene']
    },
    borders: {// La API devuelve un array de códigos de países limítrofes, si no tiene, dejamos un array vacío
        type: [String],
        default: []
    },
    area: {
        type: Number,
        min: [0, 'El área no puede ser negativa'],
        default: 0
    },
    population: {
        type: Number,
        min: [0, 'La población no puede ser negativa'],
        default: 0
    },
    gini: {
        type: Number,
        required: false,
        //default: null
    },
    timezones: {
        type: [String],
        default: []
    },
    bandera: {
        type: String,
        required: [true, 'La URL de la bandera es obligatoria']
    },
    creador: {
        type: String,
        default: "Fernanda",
        immutable: true
    },
    tipoDocumento: { // Campo para discriminar el tipo de documento, en este caso "pais" porque usamos una colección compartida (Grupo-04)
        type: String, 
        default: "pais",
        immutable: true 
    }
}, { 
    // Agregamos opciones al esquema para que Mongoose maneje automáticamente los campos de fecha de creación y actualización, 
    // y para no incluir el campo __v que Mongoose agrega por defecto para el control de versiones.
    timestamps: true, 
    versionKey: false 
});
// El nombre del modelo es 'Pais' y se basa en el esquema definido. 
// La colección en MongoDB se llamará "Grupo-04" porque es una colección compartida.
const Pais = mongoose.model('Pais', paisSchema, 'Grupo-04'); // El tercer parámetro es el nombre de la colección en MongoDB. 
// Usamos "Grupo-04" porque es una colección compartida.
export default Pais;