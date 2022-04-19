const router = require ("express").Router();
const {PrismaClient} = require("@prisma/client")
const {course} = new PrismaClient()


router.get('/', async (req, res) => {
    console.log("trying to get all courses...")
    let courses = await course.findMany()
    res.json(courses)
})

router.get('/:id', async (req, res) =>{
    console.log("trying to get course by id")
    const {id} = req.params
    console.log("the id is ", id)
    let myCourse = await course.findFirst({
        where:{
            id: Number(id)
        },
    })
    res.json(myCourse)
})

router.post('/add', async (req, res) => {
    console.log("Adding the courses")
    const {course_instructor} = req.body;
    const {course_name} = req.body;
    const {course_video_url} = req.body;
    const {course_notes_url} = req.body;
    const {course_price} = req.body;

    console.log("Trying to add a course")

    const newAddedCourse = await course.create({
        data:{
            course_instructor: course_instructor,
            course_name: course_name,
            course_video_url: course_video_url,
            course_notes_url: course_notes_url,
            course_price: course_price

        }

    })
    res.json(newAddedCourse)


})

router.get('/course_name/:course_name', async (req, res) => {
    console.log("trying to get the course by course_name")
    const {course_name} = req.params
    console.log("the course name is ", course_name)
    let courseName = await course.findMany({
        where:{
            course_name: course_name
        },
    })
    res.json(courseName)
})

module.exports = router

