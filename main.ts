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
        // CHECK IF INCOMING REG IS SET TO ACTIVE AND IF THERE IS AN EXISTING ACTIVE REG INSIDE TRAINEE
        // ELSE CONTINUE
        let hasActiveReg = false;
        if (registrationStatus.toUpperCase() === "ACTIVE") {
            // CHECK IF THERE EXISTS A REGISTRATION THAT IS CURRENTLY ACTIVE
            const activeRegInTrainee = await prisma.trainees.findMany({
                where: {
                    traineeId: Number(req.params.id),
                    registrations: {
                        some: {
                            registrationStatus: "Active"
                        }
                    }
                },
                select: {
                    traineeId: true,
                    registrations: {
                        select: {
                            registrationNumber: true,
                        }
                    }
                }
            })

            if (activeRegInTrainee.length !== 0) {
                hasActiveReg = true
                throw "hasActiveReg"
            }

            hasActiveReg = true
        }

        const trainee = prisma.trainees.update({
            where:{
                traineeId:Number(req.params.id)
            },
            data:{
                hasActiveRegistration: hasActiveReg,
                SSSNum:SSSNum,
                TINNum:TINNum,
                SGLicense:SGLicense,
                expiryDate: expiryDate ? new Date(expiryDate) : null
            }
        });

        const traineeReg = prisma.registrations.create({
            data:{
                dateEnrolled: dateEnrolled,
                registrationStatus: registrationStatus,
                SSSNumCopy:SSSNum,
                TINNumCopy:TINNum,
                SGLicenseCopy:SGLicense,
                expiryDateCopy: expiryDate ? new Date(expiryDate) : null,
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
        if (error === "hasActiveReg") {
            res.status(409).json({msg: "hasActiveReg"});
        }
        else {
            res.status(400).json({msg: error.message});
        }
    }
});

//Update Specific Trainee Registration (1.5)
app.put('/api/trainees/:id/registrations/:regid/',async(req:Request,res:Response)=>{
    const {SSSNum,TINNum,SGLicense,expiryDate,dateEnrolled,registrationStatus, batchId} = req.body;
    try{
        // // CHECK IF INCOMING REG IS SET TO ACTIVE AND IF THERE IS AN EXISTING ACTIVE REG INSIDE TRAINEE
        // // ELSE CONTINUE
        // if (registrationStatus.toUpperCase() === "ACTIVE") {
        //     // FIND ALL TRAINEES WITH HAS ACTIVE REG
        //     const traineesWithActiveReg = await prisma.trainees.findMany({
        //         where: {
        //             hasActiveRegistration: true
        //         },
        //         select: {
        //             traineeId: true,
        //             registrations: {
        //                 select: {
        //                     registrationNumber: true,
        //                     registrationStatus: true
        //                 }
        //             }
        //         }
        //     })
            
        //     let currentReg = false;
        //     // CHECK IF PARAMS ID IS IN TRAINEES WITH ACTIVE REG
        //     // IF IT IS, THROW ERROR
        //     // IF IT'S NOT, CONTINUE WITH REGISTRATION
        //     if (traineesWithActiveReg.length != 0) {
        //         for (let trainee of traineesWithActiveReg) {
        //             if (trainee.traineeId === Number(req.params.id)) {
        //                 // LOOK INSIDE REGISTRATIONS IF EDITING THE CURRENT ACTIVE REG
        //                 for (let registration of trainee.registrations) {
        //                     if (registration.registrationNumber === Number(req.params.regid) && registration.registrationStatus.toUpperCase() === "ACTIVE") {
        //                         currentReg = true;
        //                         break;
        //                     }
        //                 }

        //                 if (currentReg) break;
                        
        //                 // IF NOT EDITING THE CURRENT ACTIVE REG, THROW HAS ACTIVE REG
        //                 throw "hasActiveReg"
        //             }
        //         }
        //     }
        // }

        // CHECK IF INCOMING REG IS SET TO ACTIVE AND IF THERE IS AN EXISTING ACTIVE REG INSIDE TRAINEE
        // ELSE CONTINUE
        let hasActiveReg = false;
        if (registrationStatus.toUpperCase() === "ACTIVE") {
            // CHECK IF THERE EXISTS A REGISTRATION THAT IS CURRENTLY ACTIVE
            const activeRegInTrainee = await prisma.trainees.findMany({
                where: {
                    traineeId: Number(req.params.id),
                    registrations: {
                        some: {
                            registrationStatus: "Active"
                        }
                    }
                },
                select: {
                    traineeId: true,
                    registrations: {
                        select: {
                            registrationNumber: true,
                        }
                    }
                }
            })

            if (activeRegInTrainee.length !== 0) {
                hasActiveReg = true
                throw "hasActiveReg"
            }

            hasActiveReg = true
        }

        const trainee = prisma.trainees.update({
            where:{
                traineeId:Number(req.params.id)
            },
            data:{
                SSSNum: SSSNum,
                TINNum: TINNum,
                SGLicense: SGLicense,
                expiryDate: expiryDate ? new Date(expiryDate) : null
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
                expiryDateCopy:expiryDate ? new Date(expiryDate) : null
            }
            
        })

        const transact = await prisma.$transaction([trainee,traineeReg,traineeRegActive]);

        // set hasActiveRegistration to FALSE in trainee IF NO ACTIVE REG
        const activeReg = await prisma.trainees.findMany({
            where: {
                registrations: {
                    some: {
                        registrationStatus: "Active",
                        traineeId:Number(req.params.id)
                    }
                }
            },
            select: {
                traineeId: true,
                hasActiveRegistration: true
            }
        })

        // IF NO ACTIVE, SET FLAG TO FALSE
        if (activeReg.length === 0) {
            await prisma.trainees.update({
                where: {
                    traineeId: Number(req.params.id)
                },
                data: {
                    hasActiveRegistration: false
                }
            })
        }
        else {
            await prisma.trainees.update({
                where: {
                    traineeId: Number(req.params.id)
                },
                data: {
                    hasActiveRegistration: true
                }
            })
        }

        res.status(200).json(transact);
    }
    catch(error){
        if (error === "hasActiveReg") {
            res.status(409).json({msg: "hasActiveReg"});
        }
        else {
            res.status(400).json({msg: error.message});
        }
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
                SSSNumCopy: true,
                TINNumCopy: true,
                SGLicenseCopy: true,
                expiryDateCopy: true,
                dateEnrolled:true,
                registrationStatus:true,
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
                hasActiveRegistration: true,
                registrations:{
                    where:{
                        registrationStatus:"Active"
                    },
                    select:{
                        registrationNumber: true,
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
        const traineesWithActiveReg = await prisma.trainees.findMany({
            where: {
                hasActiveRegistration: true
            },
            select: {
                traineeId: true,
                hasActiveRegistration: true
            }
        })
        console.log(traineesWithActiveReg)

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
        // console.log(traineeReg);
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
        await prisma.registrations.deleteMany({
            where: {
                traineeId: Number(req.params.id)
            }
        })

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
        const courses = await prisma.courses.findMany({
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

        // LOOP THROUGH ALL COURSES AND CALCULATE THE SUM OF THEIR PAYABLE COST
        for (let course of courses) {
            // QUERY AGGREGATE FOR EVERY COURSE ID
            const payableAggregate = await prisma.payables.aggregate({
                where: {
                    courseId: course.courseId
                },
                _sum: {
                    payableCost: true
                }
            })

            // ADD TO COURSE OBJECT, IF NULL RETURN 0
            course['tuition'] = payableAggregate._sum.payableCost ?? 0;
        }

        res.status(200).json(courses);
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
    const {courseId, batchStatus, laNumber,batchName,startDate,endDate,maxStudents, employeeId} = req.body;
    try{
        const batch = await prisma.batch.create({
            data:{
                laNumber:laNumber,
                batchName:batchName,
                startDate: startDate,
                endDate: endDate,
                maxStudents: maxStudents,
                batchStatus: batchStatus,
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

        const instructor = await prisma.employees.update({
            where: {
                employeeId: employeeId
            },
            data: {
                hasActiveBatch: true
            }
        })
        res.status(201).json(batch);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Update Course Batch Details (3.2)
app.put('/api/batches/:id',async(req:Request,res:Response)=>{
    const {laNumber, batchStatus, batchName,startDate,endDate,maxStudents, courseId, employeeId} = req.body;
    try{
        // FIND EMPLOYEE ID OF BATCH CURRENTLY UPDATING
        const employeeIdOfBatch = await prisma.batch.findUnique({
            where: {
                batchId:Number(req.params.id)
            },
            select: {
                batchStatus: true,
                employee: {
                    select: {
                        employeeId: true,
                        hasActiveBatch: true
                    }
                }
            }
        })

        // IF BATCHSTATUS IS THE ONE BEING CHANGED, UPDATE THE STATUS OF THE INSTRUCTOR
        if (batchStatus.toUpperCase() === "INACTIVE") {
            // ONLY UPDATE EMPLOYEE IF THIS IS THE ACTIVE BATCH
            if (employeeIdOfBatch.batchStatus === "Active") {
                // UPDATE hasActiveBatch for employee
                await prisma.employees.update({
                    where: {
                        employeeId: employeeIdOfBatch.employee.employeeId
                    },
                    data: {
                        hasActiveBatch: false
                    }
                })
            }
        }
        else if (batchStatus.toUpperCase() === "ACTIVE") {
            // FIND EMPLOYEE ID OF BATCH CURRENTLY UPDATING AND IF THEY HAVE ACTIVE BATCH
            const employeeIdOfBatchActive = await prisma.batch.findUnique({
                where: {
                    batchId:Number(req.params.id)
                },
                select: {
                    employee: {
                        select: {
                            employeeId: true,
                            hasActiveBatch: true,
                            batch: {
                                where: {
                                    batchStatus: "Active"
                                },
                                select: {
                                    batchId: true
                                }
                            }
                        }
                    }
                }
            })

            // IF THE CURRENT BATCH BEING UPDATED IS CURRENTLY ACTIVE, PROCEED OUTSIDE BLOCK
            let proceed = false;
            for (let batch of employeeIdOfBatchActive.employee.batch){
                if (Number(req.params.id) === batch.batchId) {
                    proceed = true;
                    break;
                }
            }

            // IF EMPLOYEE IS CHANGED, PROCEED OUTSIDE THIS BLOCK
            if (employeeIdOfBatchActive.employee.employeeId !== Number(employeeId)) proceed = true;

            if (!proceed && employeeIdOfBatchActive.employee.hasActiveBatch === true) {
                throw "hasActiveBatch"
            }
        }

        // IF INSTRUCTOR IS CHANGED 
        if (employeeId !== employeeIdOfBatch.employee.employeeId) {
            // CHECK IF NEW EMPLOYEE HAS AN ACTIVE BATCH
            const newEmployeeHasActiveBatch = await prisma.employees.findUnique({
                where: {
                    employeeId: Number(employeeId)
                },
                select: {
                    hasActiveBatch: true
                }
            })

            if (newEmployeeHasActiveBatch.hasActiveBatch) {
                throw "hasActiveBatch";
            }
            else {
                // IF THEY DONT HAVE ACTIVE BATCH,
                // SET IT TO ACTIVE AND THEN SET THE PREVIOUS INSTRUCTOR BACK TO INACTIVE
                const newEmployee = prisma.employees.update({
                    where: {
                        employeeId: Number(employeeId)
                    },
                    data: {
                        hasActiveBatch: true // FOR NEW INSTRUCTOR
                    }
                })

                // CHECK IF OLD EMPLOYEE HAS ANY ACTIVE BATCH OR NONE
                const oldEmployeeStatus = await prisma.employees.findUnique({
                    where: {
                        employeeId: employeeIdOfBatch.employee.employeeId
                    },
                    select: {
                        batch: {
                            where: {
                                batchStatus: "Active"
                            },
                            select: {
                                batchId: true
                            }
                        }
                    }
                });

                let oldEmployeeHasActiveBatch = true;
                if (oldEmployeeStatus.batch.length === 0) {
                    oldEmployeeHasActiveBatch = false;
                }

                const oldEmployee = prisma.employees.update({
                    where: {
                        employeeId: employeeIdOfBatch.employee.employeeId
                    },
                    data: {
                        hasActiveBatch: oldEmployeeHasActiveBatch // FOR OLD INSTRUCTOR
                    }
                })

                await prisma.$transaction([newEmployee, oldEmployee]);
            }
        }

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
                batchStatus: batchStatus,
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
        if (error === "hasActiveBatch") {
            res.status(409).json({msg: error});
        }
        else {
            res.status(400).json({msg: error.message});
        }
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
                batchStatus: true,
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
                batchStatus: true,
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
                },
                // _count: {
                //     select: {
                //         registrations: true
                //     }
                // },
                registrations: {
                    where: {
                        registrationStatus: "Active",
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

// RESET BATCHES (?) TODO: DONT ADD THIS, DELETE THIS AFTER 
app.delete('/api/batches/deleteAll', async(req: Request, res: Response) => {
    try {
        await prisma.batch.deleteMany();

        await prisma.employees.updateMany({
            where: {
                hasActiveBatch: true
            },
            data: {
                hasActiveBatch: false
            }
        })
        res.status(200).json();
    }
    catch (error) {
        res.status(400).json({msg: error.message});
    }
})

//Group Batches by Course (3.6)
app.get('/api/courses/batches/grouped',async(req:Request,res:Response)=>{
    try{
        const courses = await prisma.courses.findMany({
            select:{
                courseId:true,
                courseName:true,
                trainingYears: {
                    select: {
                        trainingYearId: true,
                        trainingYearSpan: true
                    }
                },
                batch:{
                    select:{
                        batchId:true,
                        batchName:true,
                        laNumber:true,
                        startDate:true,
                        endDate:true,
                        maxStudents:true,
                        batchStatus: true,
                        _count: {
                            select: {
                                registrations: true
                            }
                        }
                    }
                }
            }
        });

        // FIND ALL BATCHES WITH REGISTRATIONS LESS THAN 30
        var eligibleBatches : typeof courses= [];

        for (let course of courses) {
            let batchArray = (
                course.batch.filter((batch) => {
                    if (batch._count.registrations < batch.maxStudents && batch.batchStatus === "Active") {
                        return batch;
                    }
                })
            )

            eligibleBatches.push({
                courseId: course.courseId,
                courseName: course.courseName,
                batch: batchArray,
                trainingYears: course.trainingYears
            })
        }

        res.status(200).json(eligibleBatches);
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
    const {courseId, payableName, payableCost} = req.body;
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

// View specific payable (?)
app.get('/api/payables/:id', async (req: Request, res: Response) => {
    try {
        const payable = await prisma.payables.findUnique({
            where: {
                payableId: Number(req.params.id)
            },
            select: {
                payableId: true,
                payableName: true,
                payableCost: true,
                course: {
                    select: {
                        courseName: true,
                        trainingYears: {
                            select: {
                                trainingYearSpan: true
                            }
                        }
                    }
                }
            }
        })
        res.status(200).json(payable)
    }
    catch (error) {
        res.status(400).json({msg: error.message});
    }
});

// Edit payable (?)
app.put('/api/payables/:id', async (req: Request, res: Response) => {
    const {payableName, payableCost} = req.body;
    try {
        const payable = await prisma.payables.update({
            where: {
                payableId: Number(req.params.id)
            },
            data: {
                payableName: payableName,
                payableCost: payableCost
            }
        })

        res.status(200).json(payable);
    }
    catch (error) {
        res.status(400).json({msg: error.message});
    }
})

// Delete payable (?)
app.delete('/api/payables/:id', async (req: Request, res: Response) => {
    const {payableName, payableCost} = req.body;
    try {
        const payable = await prisma.payables.delete({
            where: {
                payableId: Number(req.params.id)
            }
        })

        res.status(200).json(payable);
    }
    catch (error) {
        res.status(400).json({msg: error.message});
    }
})

//View list of payables(4.3)
app.get('/api/payables',async(req:Request,res:Response) =>{
    try {
        const payables = await prisma.payables.findMany({
            select: {
                payableId: true,
                payableName: true,
                payableCost: true,
                course: {
                    select: {
                        courseId: true,
                        courseName: true
                    }
                }
            }
        })

        res.status(200).json(payables);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

// View Finance Masterlist (?)
app.get('/api/finance',async(req:Request,res:Response) =>{
    try{
        const courses = await prisma.courses.findMany({
            select: {
                courseId: true,
                courseName: true,
                trainingYears: {
                    select: {
                        trainingYearId: true,
                        trainingYearSpan: true
                    }
                }
            }
        })

        // LOOP THROUGH ALL COURSES AND CALCULATE THE SUM OF THEIR PAYABLE COST
        for (let course of courses) {
            // QUERY AGGREGATE FOR EVERY COURSE ID
            const payableAggregate = await prisma.payables.aggregate({
                where: {
                    courseId: course.courseId
                },
                _sum: {
                    payableCost: true
                }
            })

            // ADD TO COURSE OBJECT, IF NULL RETURN 0
            course['tuition'] = payableAggregate._sum.payableCost ?? 0;
        }
        
        res.status(200).json(courses);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

// VIEW PAYABLES OF CERTAIN COURSE (?)
app.get('/api/courses/:courseId/payables', async (req: Request, res: Response) => {
    try {
        const payables = await prisma.courses.findUnique({
            where: {
                courseId: Number(req.params.courseId)
            },
            select: {
                courseId: true,
                courseName: true,
                trainingYears: {
                    select: {
                        trainingYearId: true,
                        trainingYearSpan: true
                    }
                },
                payables: {
                    select: {
                        payableId: true,
                        payableName: true,
                        payableCost: true
                    }
                }
            }
        })

        const tuition = await prisma.payables.aggregate({
            where: {
                courseId: Number(req.params.courseId)
            },
            _sum: {
                payableCost: true
            },
        })

        payables['tuition'] = tuition._sum.payableCost ?? 0;

        res.status(200).json(payables);
    }
    catch (error) {
        res.status(400).json({msg: error.message});
    }
}) 

// Get the latest payable ID (?)
app.get('/api/payables/all/max', async (req: Request, res: Response) => {
    try {
        const maxPayableId = await prisma.payables.aggregate({
            _max: {
                payableId: true
            }
        })

        res.status(200).json(maxPayableId);
    }
    catch (error) {
        res.status(400).json({msg: error.message});
    }
})

/*TRAINEE ACCOUNT MANAGEMENT*/

//Create new payment (5.1)
app.post('/api/payments', async (req: Request, res: Response) => {
    const { paymentAmount, paymentMethod, registrationId } = req.body;
    try {
        await prisma.transactions.create({
            data: {
                paymentAmount: paymentAmount,
                paymentMethod: paymentMethod,
                registration: {
                    connect: {
                        registrationNumber: registrationId
                    }
                }
            }
        })

        res.status(200);
    }
    catch (error) {
        res.status(400).json({msg: error.message});
    }
})

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
            },
            include: {
                role: {
                    select: {
                        roleName: true
                    }
                }
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
    const {roleId, firstName, middleName, lastName, birthDay, sex, emailAdd, cpNum, employeeStatus, dateHired, address, maritalStatus} = req.body;
    try{
        const employees = await prisma.employees.create({
            data:{
                role: {
                    connect: {
                        roleId: roleId
                    }
                },
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                birthDay: new Date(birthDay),
                sex: sex,
                emailAdd: emailAdd,
                cpNum: cpNum,
                employeeStatus: employeeStatus,
                dateHired: dateHired,
                address: address,
                maritalStatus: maritalStatus,
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
    const {roleId, firstName, middleName, lastName, birthDay, sex, emailAdd, cpNum, employeeStatus, dateHired, address, maritalStatus} = req.body;
    try{
        // CHECK if role is changed from teacher to another role
        const role = await prisma.roles.findUnique({
            where: {
                roleId: Number(roleId)
            },
            select: {
                roleName: true
            }
        })

        // If not a teacher and currently has an active batch, that means the role was switched from teacher to another role, don't allow updating
        if (role.roleName !== "Teacher") {
            const employeeActiveBatch = await prisma.batch.findMany({
                where: {
                    employeeId: Number(req.params.id),
                    batchStatus: "Active"
                },
                select: {
                    batchId: true,
                    batchName: true
                }
            })

            // If there is an active batch inside the employeeId, don't allow the updating.
            if (employeeActiveBatch.length !== 0) {
                throw "hasActiveBatch"
            }
        }

        // CHECK if employeeStatus is being changed form active to inactive
        if (employeeStatus === "Inactive") {
            const employeeActiveBatch = await prisma.batch.findMany({
                where: {
                    employeeId: Number(req.params.id),
                    batchStatus: "Active"
                },
                select: {
                    batchId: true,
                    batchName: true
                }
            })

            // If there is an active batch inside the employeeId, don't allow the updating.
            if (employeeActiveBatch.length !== 0) {
                throw "hasActiveBatch"
            }
        }

        const employees = await prisma.employees.update({
            where:{
                employeeId: Number(req.params.id)
            },
            data:{
                role: {
                    connect: {
                        roleId: roleId
                    }
                },
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                birthDay: birthDay,
                sex: sex,
                emailAdd: emailAdd,
                cpNum: cpNum,
                employeeStatus: employeeStatus,
                dateHired: dateHired,
                address: address,
                maritalStatus: maritalStatus
            }
        });
        res.status(200).json(employees);
    }
    catch(error){
        if (error === "hasActiveBatch") {
            res.status(409).json({msg: error});
        }
        else {
            res.status(400).json({msg: error.message});
        }
    }
});

//Display employee profile masterlist (6.6)

app.get('/api/employees',async(req:Request,res:Response)=>{
    try{
        const employees = await prisma.employees.findMany({
            select: {
                employeeId: true,
                lastName: true,
                firstName: true,
                middleName: true,
                role: {
                    select: {
                        roleId: true,
                        roleName: true
                    }
                },
                employeeStatus: true,
                hasActiveBatch: true
            },
            orderBy: {
                employeeId: 'asc'
            }
        })
        res.status(200).json(employees);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


//Create new role (6.7)

app.post('/api/roles',async(req:Request,res:Response) =>{
    const {roleName} = req.body;
    try{
        const roles = await prisma.roles.create({
            data:{
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
        const roles = await prisma.roles.findMany({
            select: {
                roleId: true,
                roleName: true
            }
        })
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

// GET ALL TEACHER EMPLOYEES (?)
app.get('/api/employees/all/teacher', async(req: Request, res: Response) => {
    try {
        const teachers = await prisma.employees.findMany({
            where: {
                AND: [
                    {role: {roleName: "Teacher"}},
                    {
                        hasActiveBatch: false,
                        employeeStatus: "Active"
                    }
                ]
            }
        })
        res.status(200).json(teachers);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
})

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