const router = require ("express").Router();
const crypto = require('crypto');
const {PrismaClient} = require("@prisma/client");
const { create } = require("domain");
const {user} = new PrismaClient()
const {application} = new PrismaClient()
const {course} = new PrismaClient()
const {payment} = new PrismaClient()
const {test_paper} = new PrismaClient()
const {test_details} = new PrismaClient()



router.get('/', async (req, res) => {
    console.log("trying to get all users...")
    let users = await user.findMany()
    res.json(users)
})

router.post('/add', async(req, res) => {
    console.log("Adding user")
    const{first_name} = req.body;
    const{last_name} = req.body;
    const{address} = req.body;
    const{mobile} = req.body;

    const newUser = await user.create({
        data: {
            first_name: first_name,
            last_name: last_name,
            address: address,
            mobile: mobile
        }
    
    })

      res.json(newUser)

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
            current_state: "IN PROGRESS"//showing the items in your cart
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
            current_state: "PURCHASED"// showing the courses that have been purchased
        },
    })
    res.json(myApplications)
})


router.post('/:id/applications/create', async (req, res) =>{
    const {id} = req.params;
    var test_status = "NOT NEEDED"
    const {course_id} = req.body;
    const status = "IN PROGRESS"
    
    console.log ("trying to create an application for the user id {} ", id)
    const myCourse = await course.findFirst({
        where:{
            id: Number(course_id)
        } 
    })
    if(myCourse.has_test){
        test_status = "YET TO TAKE"
    }
    const newApplication = await application.create({
        data: {
            system_uuid: crypto.randomUUID(),
            course_id: Number(course_id),
            user_id: Number(id),
            current_state: status,
            test_status: test_status
        }
    })
    res.json(newApplication)
})

router.post('/:id/applications/purchase', async (req, res) =>{
    const {id} = req.params;//1
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

    if (myApplication.test_status === "YET TO TAKE" 
    || myApplication.test_status === "FAIL"){
        res.status(400)
        res.json("You cannot pay for the application if you have failed the test or have not taken it")
    }
    
    else{
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
                payment_status: payment_status,// sucess
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
    }
    
})


router.get('/applications/:id/get_test_paper', async(req, res) =>{
    
    const {id} = req.params;
    const myApplication = await application.findFirst({
        where:{
            id: Number(id)
        },
    })
    
    const myTestPaper = await test_paper.findFirst({
        where:{
            course_id: myApplication.course_id
        }
    })

    res.json(myTestPaper)
})

router.post('/:id/take_test', async (req, res) =>{
    const {id} = req.params;
    const {application_id} = req.body;
    const {answers} = req.body;
    const {test_paper_id} = req.body;
    var test_result = "RESULT PENDING";
    var application_test_status = "RESULT PENDING"

    const myApplication = await application.findFirst({
        where:{
            id: application_id
        },
    })

    
   const newTestDetails = await test_details.create({
       data:{
           user_id: Number(id),
           application_id: myApplication.id,
           system_uuid: myApplication.system_uuid,
           test_result: test_result,
           answers: answers,
           test_paper_id: Number(test_paper_id)
       }
   })
   const updatedApplication = await application.update({
        where:{            
            id: application_id
        },
        data:{
            test_status: application_test_status
        }
})

    res.json(newTestDetails)

 })

module.exports = router