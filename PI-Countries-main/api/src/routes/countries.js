const {Router, json} = require('express');
const router = Router();
const {saveDateApiInDb,getCountryName,getCountryId} = require('../controllers/controls')


router.use(json())

router.get('/', async (req, res) => {
    try {
    const {name}= req.query
    let countries = await saveDateApiInDb();
     if(name){
        try {
            let countryName = await getCountryName(name)
            if(countryName.length !== 0){  //← validar para que no se rompa el form con el !==0 
                res.status(200).json(countryName)
            }else{
                // res.status(404).send(["NO DATA"])
                throw("the country does not exist ◉_◉")
            }
            
        } catch (error) {
            console.log(error) 
        }
     }else{
       res.json(countries)
     }
   
    } catch (error) {
        console.log('something went wrong 🚧(＃°Д°)🚧')

    }
})

router.get('/:idCountry', async (req, res)=>{
    const {idCountry} = req.params
    const country = await getCountryId(idCountry)
    console.log(country)
    res.send(country)
})
module.exports = router
