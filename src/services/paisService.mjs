import axios from 'axios';// Importamos axios para hacer la petición HTTP -para consumir la API externa y obtener los datos de los países

//Servicio para obtener y procesar los datos de la API externa, filtrando solo los países de América que hablen español 
//Este servicio se encargará de consumir la API, filtrar los datos y devolver un array de objetos con la estructura de acuerdo a nuestro modelo de país.
export const obtenerYProcesarPaises = async () => {
    try {
        // Consumimos la API (filtrando ya por región: Americas)
        const url = 'https://restcountries.com/v3.1/region/americas';
        const { data } = await axios.get(url);

        // Filtramos y Mapeamos en un solo paso
        const paisesFiltrados = data
            .filter(pais => pais.languages && pais.languages.spa) // Solo hispanohablantes
            .map(pais => {
                // Obtenemos el nombre oficial en español, si no existe, usamos el nombre oficial general
                const nombre = pais.translations?.spa?.official || pais.name.official;

                // Retornamos el objeto con la estructura del modelo de pais definido en modelos/paisModel.js
                return {
                    nombreOficial: nombre,
                    capital: pais.capital || [],// La API devuelve un array de capitales, si no tiene, dejamos un array vacío
                    borders: pais.borders || [],// La API devuelve un array de códigos de países limítrofes, si no tiene, dejamos un array vacío
                    area: pais.area || 0,
                    population: pais.population || 0,
                    timezones: pais.timezones || [],
                    bandera: pais.flags.svg, // Usamos la imagen vectorial
                    creador: "Fernanda" // Valor por defecto para identificar los países creados por mí
                };
            });

        return paisesFiltrados;
    } catch (error) {
        console.error("Error al procesar datos de la API:", error);
        throw new Error("No se pudo obtener la información de la API externa");
    }
};