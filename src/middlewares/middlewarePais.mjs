//Validaciones obligarias para los campos de los países
//name.official:3-90 caracteres
//capital: cada elemento 3-90 caracteres
//borders:cada código 3 letras mayúsculas
//area:número positivo
//population:entero positivo
//timezones:cada elemento debe ser un string no vacío
//bandera: URL válida (puede ser una validación simple que verifique que el string comience con "http" o "https")
import express from "express";
const router = express.Router();

import { body, validationResult } from "express-validator";

// Middleware de validación para los países 
export const validatePais = [
    body("nombreOficial").
        notEmpty().withMessage("El nombre oficial es obligatorio")
        .isLength({ min: 3 }).withMessage("El nombre del pais debe tener al menos 3 caracteres")//isLenght permite validar longitud mínima y/o maxima
        .isLength({ max: 90 }).withMessage("El nombre del pais no puede superar los 90 caracteres "),//isLenght permite validar longitud mínima y/o maxima,

    body("capital").notEmpty().withMessage("La capital es obligatoria")
        .isArray().withMessage("La capital debe ser un array")//isArray valida que el campo sea un array,
        .custom((capital) => {
            for (const c of capital) {
                if (typeof c !== "string" || c.length < 3 || c.length > 90) {
                    throw new Error("Cada capital debe ser una cadena de texto entre 3 y 90 caracteres");
                }
            }
            return true;
        }),
    body("borders").optional()// El campo borders es opcional, ya que no todos los países tienen países limítrofes
        .isArray().withMessage("Los borders/paises limítrofes deben ser un array")//isArray valida que el campo sea un array,
        .custom((borders) => {
            for (const border of borders) {
                if (!/^[A-Z]{3}$/.test(border)) {
                    throw new Error("Cada límite debe ser un código de 3 letras mayúsculas");
                }
            }
            return true;
        }),
    body("area").isFloat({ gt: 0 }).withMessage("El área debe ser un número positivo"),//isFloat valida que el campo sea un número decimal, con la opción gt: 0 validamos que sea mayor a 0
    body("population").
        isInt({ gt: 0 }).withMessage("La población debe ser un entero positivo"),//isInt valida que el campo sea un número entero, con la opción gt: 0 validamos que sea mayor a 0
    body("timezones")
        .isArray().withMessage("Los husos horarios deben ser un array")//isArray valida que el campo sea un array,
        .custom((timezones) => {
            for (const tz of timezones) {
                if (typeof tz !== "string" || tz.trim() === "") {
                    throw new Error("Cada huso horario debe ser una cadena de texto no vacía");
                }
            }
            return true;
        }),
    body("bandera")
        .isURL()
        .withMessage("La bandera debe ser una URL válida"),//isURL valida que el campo sea una URL válida


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
export default router;
