import { conexion } from '../../../utils/database'

export default async (req, res) => {

    const { method, query, body} = req

    switch (method) {
        case 'GET':
            try {
                const consulta = "SELECT * FROM proveedores WHERE id_proveedor = $1"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "Proveedor no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
        case 'PUT':

            try {
                const {nombre, direccion, telefono, ciudad, departamento, pais, nombre_contacto, telefono_contacto, email_contacto} = body
                const consulta = "UPDATE proveedores SET nombre = $1, direccion = $2, telefono = $3, ciudad =$4, departamento =$5, pais = $6, nombre_contacto = $7, telefono_contacto = $8, email_contacto = $9  WHERE id_proveedor = $10 RETURNING*"
                const valor = [nombre, direccion, telefono, ciudad, departamento, pais, nombre_contacto, telefono_contacto, email_contacto, query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "Proveedor no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
            
        case 'DELETE':
            try {
                const consulta = "DELETE FROM proveedores WHERE id_proveedor = $1 RETURNING*"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rowsCount === 0){
                    return res.status(404).json({message: "Proveedor no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(500).json({message: error.message})
            }
        default:
            return res.status(400).json("error en la solicitud")
    }

}


