import { conexion } from '../../utils/database'

export default async function proveedores(req, res) {

    const { method, body } = req
    
    switch (method) {
        case 'GET':
            try {
                const query = "SELECT * FROM proveedores"
                const response = await conexion.query(query)
                return res.status(200).json(response.rows)
            } catch (error) {
                return res.status(400).json({message:"error en consulta proveedores"})
            }

        case 'POST':
            try {
                const { nombre, direccion, telefono, ciudad, departamento, pais, nombre_contacto, telefono_contacto, email_contacto} = body
                const query_post = "INSERT INTO proveedores(nombre, direccion, telefono, ciudad, departamento, pais, nombre_contacto, telefono_contacto, email_contacto) VALUES ($1 , $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"
                const values = [nombre, direccion, telefono, ciudad, departamento, pais, nombre_contacto, telefono_contacto, email_contacto]
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