import { conexion } from '../../utils/database'

export default async function usuarios(req, res) {

    const { method, body } = req
    
    switch (method) {
        case 'GET':
            try {
                const query = "SELECT * FROM usuarios"
                const response = await conexion.query(query)
                return res.status(200).json(response.rows)
            } catch (error) {
                return res.status(400).json({message:"error en consulta usuarios"})
            }

        case 'POST':
            try {
                const { nombre, depto_usua_id} = body
                const query_post = "INSERT INTO usuarios(nombre, depto_usua_id) VALUES ($1 , $2) RETURNING *"
                const values = [nombre, depto_usua_id]
                const response = await conexion.query(query_post, values)
                console.log(response)

                return res.status(200).json(response.rows[0])
            } catch (error) {
                return res.status(400).json(error.message)
            }

        default:
            return res.status(400).json(error.message)
    }
}