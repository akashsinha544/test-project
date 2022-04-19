const router = require ("express").Router();
const {PrismaClient} = require("@prisma/client")
const {test_paper} = new PrismaClient()
const {course} = new PrismaClient()

router.post("/add", async (req, res) => {
    const {course_id} = req.body;
    const {question_paper} = req.body;
    const {examiner} = req.body;
    const has_test = true

    console.log("adding a new test paper for course id ", course_id)
    const newTest = await test_paper.create({
        data:{
            course_id: Number(course_id),
            question_paper: question_paper,
            examiner: examiner
        }
    })

    const updatedTest = await course.update({
        where:{
            id: Number(course_id)
        },
        data:{
            has_test: has_test
        }
    })
    res.json(newTest)
})

module.exports = router