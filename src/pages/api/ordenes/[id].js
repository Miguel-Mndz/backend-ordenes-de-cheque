import { conexion } from '../../../utils/database'

export default async (req, res) => {

    const { method, query, body} = req

    switch (method) {
        case 'GET':
            try {
                const consulta = "SELECT * FROM ordenes WHERE id_ordenes = $1"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "Orden no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
        case 'PUT':

            try {
                const {total_orden, id_provedor_orden, id_usuario_orden} = body
                const consulta = "UPDATE ordenes SET total_orden = $1, id_provedor_orden = $2, id_usuario_orden =$3  WHERE id_ordenes = $4 RETURNING*"
                const valor = [total_orden, id_provedor_orden, id_usuario_orden, query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "Orden no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
            
        case 'DELETE':
            try {
                const consulta = "DELETE FROM ordenes WHERE id_ordenes = $1 RETURNING*"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rowsCount === 0){
                    return res.status(404).json({message: "Orden no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(500).json({message: error.message})
            }
        default:
            return res.status(400).json("error en la solicitud")
    }

}


