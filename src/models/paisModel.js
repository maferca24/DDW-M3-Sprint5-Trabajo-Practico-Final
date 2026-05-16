// models/Paises.js
import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
    // Nombre oficial: 3-90 caracteres, obligatorio, sin espacios al inicio o final
    nombreOficial: {
        type: String,
        required: [true, 'El nombre oficial es obligatorio'],
        trim: true,
        minlength: [3, 'Mínimo 3 caracteres'],
        maxlength: [90, 'Máximo 90 caracteres']
    },
    // Capital: Es un array de strings (ya que un país puede tener varias)
    capital: {
        type: [String],
        default: ['No tiene']
    },
    // Fronteras: Array de códigos de 3 letras (Ej: ARG, BRA, CHL)-Equivale a los países limitrofes 
    borders: {
        type: [String],
        default: []
    },
    // Área: Número no negativo     
    area: {
        type: Number,
        min: [0, 'El área no puede ser negativa'],
        default: 0
    },
    // Población: Número no negativo
    population: {
        type: Number,
        min: [0, 'La población no puede ser negativa'],
        default: 0
    },
    // Opcion Avanzada -Gini: Lo definimos como opcional (null por defecto)- Gini: Coeficiente de desigualdad, número entre 0 y 100
    gini: {
        type: Number,
        default: null
    },
    // Zonas horarias: Array de strings
    timezones: {
        type: [String],
        default: []
    },
    // Bandera: Guardaremos la URL de la imagen SVG
    bandera: {
        type: String,
        required: [true, 'La URL de la bandera es obligatoria']
    },
    // Creador: Para identificar quién creó el país, con un valor por defecto.
    creador: {
        type: String,
        default: "Fernanda",// Para que identifique los paises creados por mi, pero se puede cambiar al crear un nuevo país
        immutable: true // Evita que se cambie accidentalmente
    }
}, {
    timestamps: true, // Crea automáticamente 'createdAt' y 'updatedAt' para saber cuándo se creó y actualizó cada país
    versionKey: false // Quita el campo __v que pone Mongoose por defecto
});

// Exportamos el modelo
const Pais = mongoose.model('Pais', paisSchema);
export default Pais;