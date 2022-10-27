import { conexion } from '../../../utils/database'

export default async (req, res) => {

    const { method, query, body} = req

    switch (method) {
        case 'GET':
            try {
                const consulta = "SELECT * FROM departamentos WHERE id_departamentos = $1"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "Despartamento no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
        case 'PUT':

            try {
                const {descripcion} = body
                const consulta = "UPDATE departamentos SET descripcion = $1 WHERE id_departamentos = $2 RETURNING*"
                const valor = [descripcion, query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "Despartamento no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
            
        case 'DELETE':
            try {
                const consulta = "DELETE FROM departamentos WHERE id_departamentos = $1 RETURNING*"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rowsCount === 0){
                    return res.status(404).json({message: "Despartamento no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(500).json({message: error.message})
            }
        default:
            return res.status(400).json("error en la solicitud")
    }

}


