import * as express from 'express';
import {PrismaClient} from '@prisma/client';
import {Request,Response} from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin:['http://localhost:3000','http://localhost:6006']
}))
app.use(express.json());

/*ENROLLMENT MANAGEMENT*/

//Add Trainee (1.1)
app.post('/api/trainees',async(req:Request,res:Response) =>{
    const {firstName,middleName,lastName,birthDay,sex,address,emailAdd,cpNum,educationalAttainment,yearGrad} = req.body;
    try{
        const trainee = await prisma.trainees.create({
            data:{
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                birthDay: new Date(birthDay),
                sex: sex,
                address: address,
                emailAdd: emailAdd,
                cpNum: cpNum,
                educationalAttainment: educationalAttainment,
                yearGrad: yearGrad
            }
        });
        
        res.status(201).json(trainee);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Update Trainee (1.2)
app.put('/api/trainees/:id',async(req:Request,res:Response)=>{
    const {firstName,middleName,lastName,birthDay,sex,address,emailAdd,cpNum,educationalAttainment,yearGrad,SSSNum,TINNum,SGLicense,expiryDate} = req.body;
    try{
        const trainee = await prisma.trainees.update({
            where:{
                traineeId: Number(req.params.id)
            },
            data:{
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                birthDay: birthDay,
                sex: sex,
                address: address,
                emailAdd: emailAdd,
                cpNum: cpNum,
                educationalAttainment: educationalAttainment,
                yearGrad: yearGrad,
                /*
                SSSNum:SSSNum,
                TINNum:TINNum,
                SGLicense:SGLicense,
                expiryDate:expiryDate*/
            }
        });
        res.status(200).json(trainee);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


//Display Trainee (1.3)
app.get('/api/trainees/:id',async(req:Request,res:Response)=>{
    try{
        const trainee = await prisma.trainees.findUnique({
            where:{
                traineeId: Number(req.params.id)
            }
        });
        res.status(200).json(trainee);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


//Create Trainee Registration (1.4)
app.post('/api/trainees/:id/registrations/',async(req:Request,res:Response)=>{
    const {batchId,SSSNum,TINNum,SGLicense,expiryDate,dateEnrolled,registrationStatus} = req.body;
    try{

        const trainee = prisma.trainees.update({
            where:{
                traineeId:Number(req.params.id)
            },
            data:{
                SSSNum:SSSNum,
                TINNum:TINNum,
                SGLicense:SGLicense,
                expiryDate:new Date(expiryDate)
            }
        });

        const traineeReg = prisma.registrations.create({
            data:{
                dateEnrolled: dateEnrolled,
                registrationStatus: registrationStatus,
                SSSNumCopy:SSSNum,
                TINNumCopy:TINNum,
                SGLicenseCopy:SGLicense,
                expiryDateCopy:new Date(expiryDate),
                trainees:{
                    connect:{
                        traineeId:Number(req.params.id)
                    }
                },
                batch:{
                    connect:{
                        batchId:batchId
                    }
                }
            }
        });

        const transact = await prisma.$transaction([trainee,traineeReg]);
        res.status(201).json(transact);
    }   
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Update Specific Trainee Registration (1.5)
app.put('/api/trainees/:id/registrations/:regid/',async(req:Request,res:Response)=>{
    const {SSSNum,TINNum,SGLicense,expiryDate,dateEnrolled,registrationStatus, batchId} = req.body;
    try{

        const trainee = prisma.trainees.update({
            where:{
                traineeId:Number(req.params.id)
            },
            data:{
                SSSNum: SSSNum,
                TINNum: TINNum,
                SGLicense: SGLicense,
                expiryDate: new Date(expiryDate)
            }
        });

        const traineeReg = prisma.registrations.update({
            where:{
                registrationNumber:Number(req.params.regid)
            },
            data:{
                dateEnrolled: dateEnrolled,
                registrationStatus: registrationStatus,
                trainees:{
                    connect:{
                        traineeId:Number(req.params.id)
                    }
                },
                batch:{
                    connect:{
                        batchId:batchId
                    }
                }
            }
        });
        
        const traineeRegActive = prisma.registrations.updateMany({
            where:{
                AND:[
                    {
                        registrationNumber:Number(req.params.id)
                    },
                    {
                        registrationStatus:"Active"
                    }
                ]
            },
            data:{
                SSSNumCopy:SSSNum,
                TINNumCopy:TINNum,
                SGLicenseCopy:SGLicense,
                expiryDateCopy:new Date(expiryDate)
            }
            
        })

        const transact = await prisma.$transaction([trainee,traineeReg,traineeRegActive]);
        res.status(200).json(transact);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


//Display Specific Trainee Registration (1.6)
app.get('/api/trainees/:id/registrations/:regid',async(req:Request,res:Response)=>{
    try{
        const traineeReg = await prisma.registrations.findMany({
            where:{
                AND:[
                    {
                        registrationNumber:Number(req.params.regid)
                    
                    },
                    {
                        traineeId:Number(req.params.id)
                    
                    },
                ]
            },
            select:{
                registrationNumber:true,
                batch:{
                    select:{
                        courses:{
                            select:{
                                courseName:true,
                                trainingYears:{
                                    select:{
                                        trainingYearSpan:true
                                    }
                                }
                            }
                        },
                        batchId:true,
                        batchName:true
                    }
                },
                dateEnrolled:true,
                registrationStatus:true
            }
        });
        res.status(200).json(traineeReg);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Delete/Drop Specific Trainee Registration (1.7)
app.delete('/api/trainees/:id/registrations/:regid',async(req:Request,res:Response)=>{
    try{
        const traineeReg = await prisma.registrations.delete({
            where:{
                registrationNumber: Number(req.params.regid)
            }
        });
        res.status(200).json(traineeReg);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


//Trainee Masterlist (1.9)
app.get('/api/trainees',async(req:Request,res:Response)=>{
    try{
        const trainee = await prisma.trainees.findMany({
            select:{
                traineeId:true,
                firstName:true,
                middleName:true,
                lastName: true,
                registrations:{
                    where:{
                        registrationStatus:"Active"
                    },
                    select:{
                        registrationStatus:true,
                        batch:{
                            select:{
                                courses:{
                                    select:{
                                        courseName:true,
                                        trainingYears:{
                                            select:{
                                                trainingYearSpan:true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy:{
                traineeId:'asc'
            }
        })
        console.log(trainee);
        res.status(200).json(trainee);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Trainee Reg Masterlist (1.10)
app.get('/api/trainees/:id/registrations',async(req:Request,res:Response)=>{
    try{
        const traineeReg = await prisma.registrations.findMany({
            where:{
                traineeId: Number(req.params.id)
            },
            select:{
                registrationNumber:true,
                batch:{
                    select:{
                        courses:{
                            select:{
                                courseName:true,
                                trainingYears:{
                                    select:{
                                        trainingYearSpan:true
                                    }
                                }
                            }
                        },
                        batchName:true
                    }
                },
                registrationStatus:true
            },
            orderBy:{
                registrationNumber:'asc'
            }
        })
        console.log(traineeReg);
        res.status(200).json(traineeReg);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Return Total Registrations (1.11)
app.get('/api/trainees/registrations/total',async(req:Request,res:Response)=>{
    try{
        const aggregate = await prisma.registrations.aggregate({
            _count:true
        })
        console.log(aggregate);
        res.status(200).json(aggregate);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Return Highest Registration Number Currently (1.12)
app.get('/api/trainees/registrations/max',async(req:Request,res:Response)=>{
    try{
        const aggregate = await prisma.registrations.aggregate({
            _max:{
                registrationNumber:true
            }
        })
        console.log(aggregate);
        res.status(200).json(aggregate);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Return Total Trainees (1.13)
app.get('/api/trainees/all/total',async(req:Request,res:Response)=>{
    try{
        const aggregate = await prisma.trainees.aggregate({
            _count:true
        })
        console.log(aggregate);
        res.status(200).json(aggregate);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Return Highest Registration Number Currently (1.14)
app.get('/api/trainees/all/max',async(req:Request,res:Response)=>{
    try{
        const aggregate = await prisma.trainees.aggregate({
            _max:{
                traineeId:true
            }
        })
        console.log(aggregate);
        res.status(200).json(aggregate);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Delete Trainee (1.15)
app.delete('/api/trainees/:id',async(req:Request,res:Response)=>{
    try{
        const trainee = await prisma.trainees.delete({
            where:{
                traineeId: Number(req.params.id)
            }
        });
        res.status(200).json(trainee);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


/*COURSE MANAGEMENT*/

//Create New Course (2.1)
app.post('/api/courses',async(req:Request,res:Response)=>{
    const {courseName,courseDescription, requiredHours, units, trainingYearId} = req.body;
    try{
        const course = await prisma.courses.create({    
            data:{
                courseName: courseName,
                courseDescription: courseDescription,
                requiredHours: requiredHours,
                units: units,
                trainingYears:{
                    connect:{
                        trainingYearId:trainingYearId
                    }
                }
            }
        });
        res.status(201).json(course);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Update Course Details (2.2)
app.put('/api/courses/:id',async(req:Request,res:Response)=>{
    const {courseName,courseDescription, requiredHours, units,trainingYearId} = req.body;
    try{
        const course = await prisma.courses.update({
            where:{
                courseId: Number(req.params.id)
            },
            data:{
                courseName: courseName,
                courseDescription: courseDescription,
                requiredHours: requiredHours,
                units: units,
                trainingYears:{
                    connect:{
                        trainingYearId:trainingYearId
                    }
                }
            }
        });
        res.status(200).json(course);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//View Specific Course (2.3)
app.get('/api/courses/:id',async(req:Request,res:Response)=>{
    try{
        const course = await prisma.courses.findUnique({
            where:{
                courseId: Number(req.params.id)
            },
            select:{
                courseId:true,
                courseName:true,
                courseDescription:true,
                requiredHours:true,
                units:true,
                trainingYears:{
                    select:{
                        trainingYearId:true,
                        trainingYearSpan:true
                    }
                }
            }
        });
        res.status(200).json(course);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Create New Training Year (2.4)
app.post('/api/trainingYears',async(req:Request,res:Response)=>{
    const {trainingYearSpan} = req.body;
    try{
        const trainingYr = await prisma.trainingYears.create({
            data:{
                trainingYearSpan:trainingYearSpan
            }
        });
        res.status(201).json(trainingYr);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Update Training Year (2.5)
app.put('/api/trainingYears/:id',async(req:Request,res:Response)=>{
    const {trainingYearSpan} = req.body;
    try{
        const trainingYr = await prisma.trainingYears.update({
            where:{
                trainingYearId: Number(req.params.id)
            },
            data:{
                trainingYearSpan:trainingYearSpan
            }
        });
        res.status(200).json(trainingYr);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Courses Masterlist (2.6)
app.get('/api/courses',async(req:Request,res:Response)=>{
    try{
        const course = await prisma.courses.findMany({
            orderBy:{
                courseId:'asc'
            },
            select:{
                courseId:true,
                courseName:true,
                courseDescription:true,
                requiredHours:true,
                units:true,
                trainingYears:{
                    select:{
                        trainingYearId:true,
                        trainingYearSpan:true
                    }
                }
            }
        })
        res.status(200).json(course);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Training Year Masterlist (2.7)
app.get('/api/trainingYears',async(req:Request,res:Response)=>{
    try{
        const trainingYr = await prisma.trainingYears.findMany({
            // include: {
            //     course: true
            // },
            orderBy:{
                trainingYearId:'asc'
            }
        })
        res.status(200).json(trainingYr);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Training Year Specific (2.8)
app.get('/api/trainingYears/:id',async(req:Request,res:Response)=>{
    try{
        const trainingYr = await prisma.trainingYears.findUnique({
            where:{
                trainingYearId:Number(req.params.id)
            }
        })
        res.status(200).json(trainingYr);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Delete Training Year (2.9)
app.delete('/api/trainingYears/:id',async(req:Request,res:Response)=>{
    try{
        const trainingYr = await prisma.trainingYears.delete({
            where:{
                trainingYearId:Number(req.params.id)
            }
        })
        res.status(200).json(trainingYr);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

// Find All Training Years Based On Course (?)
app.get('/api/trainingYears/all/courses', async (req: Request, res: Response) => {
    try {
        const trainingYears = await prisma.trainingYears.findMany({
            select: {
                trainingYearId: true,
                trainingYearSpan: true,
                course: {
                    select: {
                        courseId: true,
                        courseName: true
                    }
                }
            }
        })
        res.status(200).json(trainingYears)
    }
    catch (error) {
        res.status(400).json({msg: error.message});
    }
})

//Return Total Courses (2.10)
app.get('/api/courses/all/total',async(req:Request,res:Response)=>{
    try{
        const aggregate = await prisma.courses.aggregate({
            _count:true
        })
        console.log(aggregate);
        res.status(200).json(aggregate);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Return Highest CourseID Currently (2.11)
app.get('/api/courses/all/max',async(req:Request,res:Response)=>{
    try{
        const aggregate = await prisma.courses.aggregate({
            _max:{
                courseId:true
            }
        })
        console.log(aggregate);
        res.status(200).json(aggregate);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Delete Specific Course (2.12)
app.delete('/api/courses/:id',async(req:Request,res:Response)=>{
    try{
        const course = await prisma.courses.delete({
            where:{
                courseId: Number(req.params.id)
            }
        });
        res.status(200).json(course);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

/*COURSE BATCH MANAGEMENT*/

//Create New Course Batch(3.1)
app.post('/api/batches',async(req:Request,res:Response)=>{
    const {courseId, trainingYearId, laNumber,batchName,startDate,endDate,maxStudents, employeeId} = req.body;
    try{
        const batch = await prisma.batch.create({
            data:{
                laNumber:laNumber,
                batchName:batchName,
                startDate: startDate,
                endDate: endDate,
                maxStudents: maxStudents,
                courses:{ //dle ko sure dre
                    connect:{
                        courseId:courseId
                    }
                },
                employee: {
                    connect: {
                        employeeId: employeeId
                    }
                }
            }
        });
        res.status(201).json(batch);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Update Course Batch Details (3.2)
app.put('/api/batches/:id',async(req:Request,res:Response)=>{
    const {laNumber,batchName,startDate,endDate,maxStudents, courseId, trainingYearId, employeeId} = req.body;
    try{
        const batch = await prisma.batch.update({
            where:{
                batchId:Number(req.params.id)
            },
            data:{
                laNumber:laNumber,
                batchName:batchName,
                startDate: startDate,
                endDate: endDate,
                maxStudents: maxStudents,
                courses:{ //dle ko sure dre 
                    connect:{
                        courseId:courseId
                    }
                },
                employee: {
                    connect: {
                        employeeId: employeeId
                    }
                }
            }
        });
        res.status(200).json(batch);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//View Specific Batch (3.4)
app.get("/api/batches/:id",async(req:Request,res:Response)=>{
    try{
        const batch = await prisma.batch.findUnique({
            where:{
                batchId:Number(req.params.id)
            },
            select:{
                batchId:true,
                laNumber:true,
                batchName:true,
                startDate: true,
                endDate: true,
                maxStudents: true,
                courses:{
                    select:{
                        courseId:true,
                        courseName:true,
                        trainingYears:{
                            select:{
                                trainingYearId:true,
                                trainingYearSpan:true
                            }
                        }
                    }
                },
                employee: {
                    select: {
                        employeeId: true,
                        lastName: true,
                        firstName: true,
                        middleName: true
                    }
                }

            }
        });
        res.status(200).json(batch);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Batch Masterlist (3.5)
app.get('/api/batches',async(req:Request,res:Response)=>{
    try{
        const batch = await prisma.batch.findMany({
            orderBy:{
                batchId:'asc'
            },
            select:{
                batchId:true,
                laNumber:true,
                batchName:true,
                startDate: true,
                endDate: true,
                maxStudents: true,
                courses:{
                    select:{
                        courseId:true,
                        courseName:true,
                        trainingYears:{
                            select:{
                                trainingYearId:true,
                                trainingYearSpan:true
                            }
                        }
                    }
                },
                employee: {
                    select: {
                        employeeId: true,
                        lastName: true,
                        firstName: true,
                        middleName: true
                    }
                }
            }
        });
        res.status(200).json(batch);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Group Batches by Course (3.6)
app.get('/api/courses/batches/grouped',async(req:Request,res:Response)=>{
    try{
        const groupBy = await prisma.courses.findMany({
            select:{
                courseId:true,
                courseName:true,
                batch:{
                    select:{
                        batchId:true,
                        batchName:true,
                        laNumber:true,
                        startDate:true,
                        endDate:true,
                        maxStudents:true
                    }
                }
            }
        });
        res.status(200).json(groupBy);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
}); 

//Return Highest Batch ID Currently (3.7)
app.get('/api/batches/all/max',async(req:Request,res:Response)=>{
    try{
        const aggregate = await prisma.batch.aggregate({
            _max:{
                batchId:true
            }
        })
        console.log(aggregate);
        res.status(200).json(aggregate);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

/*FEES AND ACCOUNTS MANAGEMENT*/

//Add Payable (4.1)

app.post('/api/payables',async(req:Request,res:Response) =>{
    const {trainingYearId, courseId, payableName, payableCost} = req.body;
    try{
        const payable = await prisma.payables.create({
            data: {
                payableName: payableName,
                payableCost: payableCost,
                course: {
                    connect: {
                        courseId: courseId
                    }
                }
            }
        });
        res.status(201).json(payable);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

// //Edit Payable (4.2)

// app.put('/api/payables/:id',async(req:Request,res:Response)=>{
//     const {payableID, trainingYearId, courseId, payableName, payableCost} = req.body;
//     try{
//         const payable = await prisma.payables.create({
//             data:{
//                 payableName: payableName,
//                 payableCost: payableCost,
//                 course: {
//                     connect: {
//                         courseId: courseId
//                     }
//                 },
//                 trainingYear: {
//                     connect: {
//                         trainingYearId: trainingYearId
//                     }
//                 }
//             }
//         });
//         res.status(200).json(payable);
//     }
//     catch(error){
//         res.status(400).json({msg: error.message});
//     }
// });

// //View list of payables(4.3)

app.get('/api/payables',async(req:Request,res:Response) =>{
    try{
        const payables = await prisma.payables.findMany({
            select: {
                payableId: true,
                payableName: true,
                payableCost: true,
                course :{
                    select: {
                        courseId:true,
                        courseName: true
                    }
                }
            }
        });
        
        res.status(200).json(payables);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});



/*TRAINEE ACCOUNT MANAGEMENT*/

//Create new payment (5.1)

// app.post('/api/transactions',async(req:Request,res:Response)=>{
//     const {transactionId, registrationNumber, payableId, payableCost, paymentMethod} = req.body;
//     try{
//         const transactions = await prisma.transactions.create({
//             data:{
//                 transactionId:transactionId,
//                 Registrations:registrationNumber,
//                 payableCost:payableCost,
//                 paymentMethod:paymentMethod,
//                 payables:{
//                     connect:{
//                         payableId:payableId
//                     }
//                 }
//             }
//         });
//         res.status(201).json(transactions);
//     }   
//     catch(error){
//         res.status(400).json({msg: error.message});
//     }
// });

//View account details (5.2)


// app.get('/api/transactions/:id',async(req:Request,res:Response)=>{
//     try{
//         const payables = await prisma.transactions.findMany({})
//         res.status(200).json(payables);
//     }
//     catch(error){
//         res.status(400).json({msg: error.message});
//     }
// });


/*EMPLOYEE MANAGEMENT*/

//Displaying specific employee profile(6.1)
app.get('/api/employees/:id',async(req:Request,res:Response)=>{
    try{
        const employees = await prisma.employees.findUnique({
            where:{
                employeeId: Number(req.params.id)
            }
        });
        res.status(200).json(employees);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Create new employee profile (6.2)

app.post('/api/employees',async(req:Request,res:Response) =>{
    const {roleId, firstName, middleName, lastName, birthDay, sex, emailAdd, cpNum, employeeStatus, dateHired} = req.body;
    try{
        const employees = await prisma.employees.create({
            data:{
                roleId: roleId,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                birthDay: new Date(birthDay),
                sex: sex,
                emailAdd: emailAdd,
                cpNum: cpNum,
                employeeStatus: employeeStatus,
                dateHired: dateHired,
            }
        });
        
        res.status(201).json(employees);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


//Update employee profile (6.5)

app.put('/api/employees/:id',async(req:Request,res:Response)=>{
    const {roleId, firstName, middleName, lastName, birthDay, sex, emailAdd, cpNum, employeeStatus, dateHired} = req.body;
    try{
        const employees = await prisma.employees.update({
            where:{
                employeeId: Number(req.params.id)
            },
            data:{
                roleId: roleId,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                birthDay: birthDay,
                sex: sex,
                emailAdd: emailAdd,
                cpNum: cpNum,
                employeeStatus: employeeStatus,
                dateHired: dateHired,
            }
        });
        res.status(200).json(employees);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Display employee profile masterlist (6.6)

app.get('/api/employees',async(req:Request,res:Response)=>{
    try{
        const employees = await prisma.employees.findMany({})
        res.status(200).json(employees);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


//Create new role (6.7)

app.post('/api/roles',async(req:Request,res:Response) =>{
    const {roleId, roleName} = req.body;
    try{
        const roles = await prisma.roles.create({
            data:{
                roleId: roleId,
                roleName:roleName,
            }
        });
        
        res.status(201).json(roles);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//View all roles (6.8)

app.get('/api/roles',async(req:Request,res:Response)=>{
    try{
        const roles = await prisma.roles.findMany({})
        res.status(200).json(roles);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Update specific role (6.9)

app.put('/api/roles/:id',async(req:Request,res:Response)=>{
    const {roleId, roleName} = req.body;
    try{
        const roles = await prisma.roles.update({
            where:{
                roleId: Number(req.params.id)
            },
            data:{
                roleId: roleId,
                roleName: roleName
            }
        });
        res.status(200).json(roles);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Delete specific role (6.10)

app.delete('/api/roles/:id',async(req:Request,res:Response)=>{
    try{
        const roles = await prisma.roles.delete({
            where:{
                roleId: Number(req.params.regid)
            }
        });
        res.status(200).json(roles);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//MAX employee ID (6.11)

app.get('/api/employees/all/max',async(req:Request,res:Response)=>{
    try{
        const aggregate = await prisma.employees.aggregate({
            _max:{
                employeeId:true
            }
        })
        console.log(aggregate);
        res.status(200).json(aggregate);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});



app.listen(port, () =>
  console.log(`REST API server ready at: http://localhost:${port}`),
)