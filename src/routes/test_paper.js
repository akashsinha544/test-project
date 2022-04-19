const router = require ("express").Router();
const {PrismaClient} = require("@prisma/client")
const {test_paper} = new PrismaClient()
const {course} = new PrismaClient()
const {test_details} = new PrismaClient()
const {application} = new PrismaClient()



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

router.put("/update_result", async (req, res) =>{
    const {application_id} = req.body;
    var result = "PASS"
    

    const myApplication = await application.findFirst({
        where:{
            user_id: Number(application_id)
        }
        
    })

    const myTestDetails = await test_details.findFirst({
        where:{
            application_id: myApplication.id
        },
    })
    
    const updatedTestDetails = await test_details.update({
        where:{
            id: myTestDetails.id
        },
        data:{
            test_result: result
        }
    })

    const updatedApplication = await application.update({
        where:{
            id: application_id
        },
        data:{
            test_status: result
        }
    })
    res.json(updatedTestDetails)

})

module.exports = router