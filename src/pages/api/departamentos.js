import { conexion } from '../../utils/database'

export default async function departamentos(req, res) {

    const { method, body } = req
    
    switch (method) {
        case 'GET':
            try {
                const query = "SELECT * FROM departamentos"
                const response = await conexion.query(query)
                return res.status(200).json(response.rows)
            } catch (error) {
                return res.status(400).json({message:"error en consulta"})
            }

        case 'POST':
            try {
                const { descripcion } = body
                const query_post = "INSERT INTO departamentos(descripcion) VALUES ($1) RETURNING *"
                const values = [descripcion]
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