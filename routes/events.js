/*
    Rutas de Usuarios / Auth
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const isDate = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// Todas tienen que pasar por validacion del JWT
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos );

// Crear nuevo evento
router.post(
    '/',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento );

// Actualizazr evento
router.put(
    '/:id',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento );

// Borrar evento
router.delete('/:id', eliminarEvento );

module.exports = router;

