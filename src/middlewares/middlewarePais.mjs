//Validaciones obligarias para los campos de los países
//name.official:3-90 caracteres
//capital: cada elemento 3-90 caracteres
//borders:cada código 3 letras mayúsculas
//area:número positivo
//population:entero positivo
//timezones:cada elemento debe ser un string no vacío
//bandera: URL válida (puede ser una validación simple que verifique que el string comience con "http" o "https")
import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Middleware de validación para los países 
export const validatePais = [
    // Nombre Oficial: obligatorio, entre 3 y 90 caracteres
    body("nombreOficial")
        .notEmpty().withMessage("El nombre oficial es obligatorio")
        .isLength({ min: 3, max: 90 }).withMessage("El nombre del país debe tener entre 3 y 90 caracteres"),

    //Capital: obligatoria, debe ser un array y tener al menos 1 elemento válido
    body("capital")
        .isArray().withMessage("La capital debe ser un array")
        .custom((capital) => {
            if (!capital || capital.length === 0) {
                throw new Error("Debes agregar al menos una capital");
            }
            for (const c of capital) {
                if (typeof c !== "string" || c.trim().length < 3 || c.trim().length > 90) {
                    throw new Error("Cada capital debe ser una cadena de texto entre 3 y 90 caracteres");
                }
            }
            return true;
        }),

    // Borders: opcional. Si viene vacío como array '[]', lo dejamos pasar como válido
    body("borders")
        .optional({ checkFalsy: true }) // Permite ignorar si viene vacío o falso
        .isArray().withMessage("Los borders/países limítrofes deben ser un array")
        .custom((borders) => {
            // Si el frontend mandó un array vacío [], no hay nada que validar en el bucle
            if (borders.length === 0) return true; 

            for (const border of borders) {
                if (!/^[A-Z]{3}$/.test(border)) {
                    throw new Error("Cada límite debe ser un código de 3 letras mayúsculas (Ej. ARG, BRA)");
                }
            }
            return true;
        }),

    // Área: número decimal o entero estrictamente mayor a 0
    body("area")
        .isFloat({ gt: 0 }).withMessage("El área debe ser un número positivo"),

    // Población: número entero estrictamente mayor a 0
    body("population")
        .isInt({ gt: 0 }).withMessage("La población debe ser un entero positivo"),

    // Timezones: obligatorio como array, elementos strings no vacíos
    body("timezones")
        .isArray().withMessage("Los husos horarios deben ser un array")
        .custom((timezones) => {
            if (!timezones || timezones.length === 0) {
                throw new Error("Debes agregar al menos un huso horario");
            }
            for (const tz of timezones) {
                if (typeof tz !== "string" || tz.trim() === "") {
                    throw new Error("Cada huso horario debe ser una cadena de texto no vacía");
                }
            }
            return true;
        }),

    //Bandera: string con formato de URL válido
    body("bandera")
        .isURL().withMessage("La bandera debe ser una URL válida (ej: https://...)"),

    // Middleware final para capturar y retornar los errores detectados arriba
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Retornamos un 400 Bad Request con la lista de errores estructurada
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Si no hay errores, continúa a tu controlador de guardado
    }
];

export default router;