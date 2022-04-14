const router = require ("express").Router();
const {PrismaClient} = require("@prisma/client")
const {user} = new PrismaClient()

router.get('/', async (req, res) => {
    console.log("trying to get all users...")
    let users = await user.findMany()
    res.json(users)
})

router.get('/:id', async (req, res) =>{
    console.log("trying to get user by id")
    const {id} = req.params
    console.log("the id is ", id)
    let myUser = await user.findFirst({
        where:{
            id: Number(id)
        },
    })
    res.json(myUser)
})

module.exports = router