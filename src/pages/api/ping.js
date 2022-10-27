// verificacion de conexion
import { conexion } from "../../utils/database"

export default async (req, res) => {

    const response = await conexion.query('SELECT NOW()')
        console.log(response)
        return res.json({ message: "okay", time:response.rows[0].now })
}