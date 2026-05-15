// src/repositories/IRepository.mjs
class IRepository {
    obtenerTodos() {
        throw new Error("Método 'obtenerTodos()' no implementado");
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
