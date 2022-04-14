const router = require ("express").Router();
const {PrismaClient} = require("@prisma/client")
const {course} = new PrismaClient()


router.get('/', async (req, res) => {
    console.log("trying to get all courses...")
    let courses = await course.findMany()
    res.json(courses)
})

router.get('/:id', async (req, res) =>{
    console.log("trying to get user by id")
    const {id} = req.params
    console.log("the id is ", id)
    let myCourse = await course.findFirst({
        where:{
            id: Number(id)
        },
    })
    res.json(myCourse)
})

module.exports = router