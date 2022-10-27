import { conexion } from '../../../utils/database'

export default async (req, res) => {

    const { method, query, body} = req
    
    switch (method) {
        case 'GET':
            try {
                const consulta = "SELECT * FROM items WHERE id_items = $1"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "Item no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
        case 'PUT':

            try {
                const {descripcion, precio, iva_articulo, cantidad, subtotal, id_orden_item} = body
                const consulta = "UPDATE items SET descripcion = $1, precio = $2, iva_articulo = $3, cantidad = $4, subtotal = $5, id_orden_item = $6 WHERE id_items = $7 RETURNING*"
                const valor = [descripcion, precio, iva_articulo, cantidad, subtotal, id_orden_item, query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "item no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
            
        case 'DELETE':
            try {
                const consulta = "DELETE FROM items WHERE id_items = $1 RETURNING*"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rowsCount === 0){
                    return res.status(404).json({message: "Item no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(500).json({message: error.message})
            }
        default:
            return res.status(400).json("error en la solicitud")
    }

}


