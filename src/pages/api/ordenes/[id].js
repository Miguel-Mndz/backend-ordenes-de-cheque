export default (req, res) => {

    const {method} = req

    switch (method) {
        case 'GET':
            return res.status(200).json("Obteniendo una orden")
        case 'PUT':
            return res.status(200).json("Modificando una orden")
        case 'DELETE':
            return res.status(200).json("Eliminando una Orden")
        default:
            return res.status(400).json("error en la solicitud")
    }

}


