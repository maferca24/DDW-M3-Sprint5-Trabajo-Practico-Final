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


// export function renderizarSuperheroe(superheroe) {
//     return {
//         Nombre: superheroe.nombreSuperHeroe,
//         "Nombre Real": superheroe.nombreReal,
//         Edad: superheroe.edad,
//         "Planeta de Origen": superheroe.planetaOrigen,
//         Debilidad: superheroe.debilidad,
//         Poderes: superheroe.poderes,
//         Aliados: superheroe.aliados,
//         Enemigos: superheroe.enemigos
//     };
// }
// export function renderizarListaSuperheroes(superheroes) {
//     return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
// }

