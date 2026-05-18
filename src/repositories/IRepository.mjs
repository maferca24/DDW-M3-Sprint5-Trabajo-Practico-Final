class IRepository {
    obtenerTodos() {
        throw new Error("Método 'obtenerTodos()' no implementado");
    }

    // Nuevo método para guardar múltiples registros (Para tomar datos de la API externa)
    guardarMuchos(datos) {
        throw new Error("Método 'guardarMuchos()' no implementado");
    }

    obtenerPorId(id) {
        throw new Error("Método 'obtenerPorId()' no implementado");
    }

    crear(datos) {
        throw new Error("Método 'crear()' no implementado");
    }

    actualizar(id, datos) {
        throw new Error("Método 'actualizar()' no implementado");
    }

    eliminar(id) {
        throw new Error("Método 'eliminar()' no implementado");
    }
}

export default IRepository;

