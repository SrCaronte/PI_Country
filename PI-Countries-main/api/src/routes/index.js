const { Router} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countries = require ('./countries')
const activities = require ('./activitiesPost')
const sendemail = require ('./sendemail')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countries)
router.use('/activities', activities)
router.use('/sendemail', sendemail)



module.exports = router;
