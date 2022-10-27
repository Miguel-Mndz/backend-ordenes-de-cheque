import { conexion } from '../../utils/database'

export default async function items(req, res) {

    const { method, body } = req
    
    switch (method) {
        case 'GET':
            try {
                const query = "SELECT * FROM items"
                const response = await conexion.query(query)
                return res.status(200).json(response.rows)
            } catch (error) {
                return res.status(400).json({message:"error en consulta items"})
            }

        case 'POST':
            try {
                const { descripcion, precio, iva_articulo, cantidad, subtotal, id_orden_item} = body
                const query_post = "INSERT INTO items(descripcion, precio, iva_articulo, cantidad, subtotal, id_orden_item) VALUES ($1 , $2, $3, $4, $5 , $6) RETURNING *"
                const values = [descripcion, precio, iva_articulo, cantidad, subtotal, id_orden_item]
                const response = await conexion.query(query_post, values)

                return res.status(200).json(response.rows[0])
            } catch (error) {
                return res.status(400).json(error.message)
            }

        default:
            return res.status(400).json(error.message)
    }
}