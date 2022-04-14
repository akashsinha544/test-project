const router = require ("express").Router();
const {PrismaClient} = require("@prisma/client")
const {course} = new PrismaClient()


router.get('/', async (req, res) => {
    console.log("trying to get all courses...")
    let courses = await course.findMany()
    res.json(courses)
})

module.exports = router