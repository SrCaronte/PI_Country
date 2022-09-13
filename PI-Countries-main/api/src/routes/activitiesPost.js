const { Router } = require('express');
const { Country, Activity } = require('../db')

const router = Router();

router.get('/', async (req, res) => {
    const allActivities = await Activity.findAll({ include: Country })
    //filtro para el front que trae todas las actividades
    const filterA = allActivities.map(e => e.name.toLowerCase())
    const total = filterA.filter((item, index) => {
        return filterA.indexOf(item) === index;
    })
    res.json(total)
});

router.get('/:id',async(req,res)=>{
    const arrayActivity = await Activity.findOne({
        where:{id:req.body.id}
    })
    res.status(200).json(arrayActivity)
})

router.post('/', async(req, res)=>{
    try {
        const { name, difficulty, duration, season, country} = req.body
          
    //    country = country.toLowerCase()

        const  newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        })
 
        let activityCountry= await Country.findAll({
           
            where: { name: country}
        })

        newActivity.addCountry(activityCountry)
        
        console.log(newActivity)
        res.send("the activity was created successfully 👍")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.put('/',async (req,res)=>{
    try {
        const { name, difficulty, duration, season} = req.body

        const oneActivity = await Activity.findOne({
            where:{
                id:req.body.id,
            }
        })
        console.log(oneActivity,"1")
        await oneActivity.update(
            name,
            difficulty,
            duration,
            season,
        )
        console.log(oneActivity,"2")
        res.status(200).json("👌 Activity Update")
    } catch (error) {
        console.log(error)
    }
})




module.exports = router;