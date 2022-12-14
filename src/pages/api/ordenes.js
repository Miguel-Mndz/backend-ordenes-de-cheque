import { conexion } from '../../utils/database'

export default async function ordenes(req, res) {

    const { method, body } = req
    
    switch (method) {
        case 'GET':
            try {
                const query = "SELECT * FROM ordenes"
                const response = await conexion.query(query)
                return res.status(200).json(response.rows)
            } catch (error) {
                return res.status(400).json({message:"error en consulta ordenes"})
            }

        case 'POST':
            try {
                const { total_orden, id_proveedor_orden, id_usuario_orden} = body
                const query_post = "INSERT INTO ordenes(total_orden, id_proveedor_orden, id_usuario_orden) VALUES ($1 , $2, $3) RETURNING *"
                const values = [total_orden, id_proveedor_orden, id_usuario_orden]
                const response = await conexion.query(query_post, values)

                return res.status(200).json(response.rows[0])
            } catch (error) {
                return res.status(400).json(error.message)
            }

        default:
            return res.status(400).json(error.message)
    }
}