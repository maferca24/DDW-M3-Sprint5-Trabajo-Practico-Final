//Capa de Vistas: define las funciones de presentación de los datos, 
// organizando la información de los paises en un formato estructurado

export function renderizarPais(pais) {
    return {
        Nombre: pais.nombre,
        Capital: pais.capital,
        Limites: pais.borders,
        Área: pais.area,
        Población: pais.poblacion,
        "Zona Horaria": pais.timezones,
        Bandera: pais.bandera,
        Creador: pais.creador
    };
}
export function renderizarListaPaises(paises) {
    return paises.map(pais => renderizarPais(pais));
}      

