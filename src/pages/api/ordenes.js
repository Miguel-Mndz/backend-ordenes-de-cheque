
export default function ordenes(req, res) {

    const { method } = req

    switch (method) {
        case 'GET':
            return res.status(200).json("Obteniendo orden")
        case 'POST':
            return res.status(200).json("Creando orden")
        default:
            return res.status(400).json("error en la solicitud")
    }
}

