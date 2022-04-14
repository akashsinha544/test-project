const router = require ("express").Router();
const crypto = require('crypto');
const {PrismaClient} = require("@prisma/client")
const {user} = new PrismaClient()
const {application} = new PrismaClient()
const {course} = new PrismaClient()
const {payment} = new PrismaClient()

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

router.get('/:id/applications/progress', async (req, res) =>{
    const {id} = req.params
    console.log("trying to get all in progress applications for the user id ", id)
    let myApplications = await application.findMany({
        where:{
            user_id: Number(id),
            current_state: "IN PROGRESS"
        },
    })
    res.json(myApplications)
})


router.get('/:id/applications/purchased', async (req, res) =>{
    const {id} = req.params
    console.log("trying to get all in progress applications for the user id ", id)
    let myApplications = await application.findMany({
        where:{
            user_id: Number(id),
            current_state: "PURCHASED"
        },
    })
    res.json(myApplications)
})


router.post('/:id/applications/create', async (req, res) =>{
    const {id} = req.params;
    const {course_id} = req.body;
    const status = "IN PROGRESS"
    
    
    console.log ("trying to create an application for the user id {} ", id)
    
    const newApplication = await application.create({
        data: {
            system_uuid: crypto.randomUUID(),
            course_id: Number(course_id),
            user_id: Number(id),
            current_state: status
        }
    })
    res.json(newApplication)
})


router.post('/:id/applications/purchase', async (req, res) =>{
    const {id} = req.params;
    const {application_id} = req.body;
    const {payment_method} = req.body;

    const payment_status = "SUCCESS"
    const status = "PURCHASED"
    
    console.log ("purchasing an application for the user id {} ", id)

    const myApplication = await application.findFirst({
        where:{
            id: Number(application_id)
        },
    })
    const myCourse = await course.findFirst({
        where:{
            id: Number(myApplication.course_id)
        },
    })
    
    const price = myCourse.course_price
    const uuid = myApplication.system_uuid

    const newPayment = await payment.create({
        data: {
            system_uuid: uuid,
            payment_method: payment_method,
            payment_status: payment_status,
            total_amount: price
        }
    })

    const updatedApplication = await application.update({
        where:{
            id: myApplication.id
        },
        data:{
            current_state: status
        }
    })

    res.json(newPayment)
})




module.exports = router