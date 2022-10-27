import { conexion } from '../../../utils/database'

export default async (req, res) => {

    const { method, query, body} = req

    switch (method) {
        case 'GET':
            try {
                const consulta = "SELECT * FROM usuarios WHERE id_usuario = $1"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "Usaurio no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
        case 'PUT':

            try {
                const {nombre, depto_usua_id} = body
                const consulta = "UPDATE usuarios SET nombre = $1 , depto_usua_id = $2 WHERE id_usuario = $3 RETURNING*"
                const valor = [nombre, depto_usua_id, query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rows.length === 0){
                    return res.status(400).json({message: "Usuario no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(400).json(error.message)
            }
            
        case 'DELETE':
            try {
                const consulta = "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING*"
                const valor = [query.id] //obteno el id del query string (URL)
                const response = await conexion.query(consulta, valor)

                if (response.rowsCount === 0){
                    return res.status(404).json({message: "Usuario no existe"})
                }
                return res.json(response.rows[0])
                
            } catch (error) {
                return res.status(500).json({message: error.message})
            }
        default:
            return res.status(400).json("error en la solicitud")
    }

}


