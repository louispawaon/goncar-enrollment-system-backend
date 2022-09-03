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
                birthDay: birthDay,
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
    const {firstName,middleName,lastName,birthDay,sex,address,emailAdd,cpNum,educationalAttainment,yearGrad} = req.body;
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
                yearGrad: yearGrad
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
            },
            include:{
                registrations:{
                    select:{
                        SSSNum:true,
                        TINNum:true,
                        SGLicense:true,
                        expiryDate:true
                    }
                }
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
        const traineeReg = await prisma.registrations.create({
            data:{
                SSSNum: SSSNum,
                TINNum: TINNum,
                SGLicense: SGLicense,
                expiryDate: expiryDate,
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
        res.status(201).json(traineeReg);
    }   
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Update Specific Trainee Registration (1.5)
app.put('/api/trainees/:id/registrations/:regid/',async(req:Request,res:Response)=>{
    const {SSSNum,TINNum,SGLicense,expiryDate,dateEnrolled,registrationStatus} = req.body;
    try{
        const traineeReg = await prisma.registrations.update({
            where:{
                registrationNumber:Number(req.params.regid)
            },
            data:{
                SSSNum: SSSNum,
                TINNum: TINNum,
                SGLicense: SGLicense,
                expiryDate: expiryDate,
                dateEnrolled: dateEnrolled,
                registrationStatus: registrationStatus,
                trainees:{
                    connect:{
                        traineeId:Number(req.params.id)
                    }
                }
            }
        });
        res.status(200).json(traineeReg);
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
                                courseName:true
                            }
                        },
                        batchId:true,
                        batchName:true,
                        trainingYears:{
                            select:{
                                trainingYearSpan:true
                            }
                        }
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
                                        courseName:true
                                    }
                                }
                            }
                        }
                    }
                }
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
                                courseName:true
                            }
                        },
                        trainingYears:{
                            select:{
                                trainingYearSpan:true
                            }
                        },
                        batchName:true
                    }
                },
                registrationStatus:true
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

/*COURSE MANAGEMENT*/

//Create New Course (2.1)
app.post('/api/courses',async(req:Request,res:Response)=>{
    const {courseName,courseDescription, requiredHours, units} = req.body;
    try{
        const course = await prisma.courses.create({    
            data:{
                courseName: courseName,
                courseDescription: courseDescription,
                requiredHours: requiredHours,
                units: units
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
    const {courseName,courseDescription, requiredHours, units} = req.body;
    try{
        const course = await prisma.courses.update({
            where:{
                courseId: Number(req.params.id)
            },
            data:{
                courseName: courseName,
                courseDescription: courseDescription,
                requiredHours: requiredHours,
                units: units
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
        const course = await prisma.courses.findMany({})
        res.status(200).json(course);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Training Year Masterlist (2.7)
app.get('/api/trainingYears',async(req:Request,res:Response)=>{
    try{
        const trainingYr = await prisma.trainingYears.findMany({})
        res.status(200).json(trainingYr);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

/*COURSE BATCH MANAGEMENT*/

//Create New Course Batch(3.1)
app.post('/api/batches',async(req:Request,res:Response)=>{
    const {courseId, trainingYearId, laNumber,batchName,startDate,endDate,maxStudents} = req.body;
    try{
        const batch = await prisma.batch.create({
            data:{
                laNumber:laNumber,
                batchName:batchName,
                startDate: startDate,
                endDate: endDate,
                maxStudents: maxStudents,
                courses:{
                    connect:{
                        courseId:courseId
                    }
                },
                trainingYears:{
                    connect:{
                        trainingYearId:trainingYearId
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
    const {laNumber,batchName,startDate,endDate,maxStudents} = req.body;
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
                maxStudents: maxStudents
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
            include:{
                courses:true,
                trainingYears:true
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
        const batch = await prisma.batch.findMany({});
        res.status(200).json(batch);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


/*FEES AND ACCOUNTS MANAGEMENT*/

//Add Payable (4.1)

app.post('/api/payables',async(req:Request,res:Response) =>{
    const {payableID, trainingYearId, courseId, payableName, payableCost} = req.body;
    try{
        const payables = await prisma.payables.create({
            data:{
                payableId: payableID,
                trainingYearId: trainingYearId,
                courseId: courseId,
                payableName: payableName,
                payableCost: payableCost,
            }
        });
        
        res.status(201).json(payables);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Edit Payable (4.2)

app.put('/api/payables/:id',async(req:Request,res:Response)=>{
    const {payableID, trainingYearId, courseId, payableName, payableCost} = req.body;
    try{
        const payables = await prisma.payables.update({
            where:{
                payableId: Number(req.params.id)
            },
            data:{
                payableId: payableID,
                trainingYearId: trainingYearId,
                courseId: courseId,
                payableName: payableName,
                payableCost: payableCost,
            }
        });
        res.status(200).json(payables);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//View list of payables(4.3)

app.get('/api/payables',async(req:Request,res:Response)=>{
    try{
        const payables = await prisma.payables.findMany({
            select:{
                payableId: true,
                trainingYearId: true,
                courseId: true,
                payableName: true,
                payableCost: true,
            }
        })
        res.status(200).json(payables);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});


/*TRAINEE ACCOUNT MANAGEMENT*/

//Create new payment (5.1)

//View account details (5.2)

/*EMPLOYEE MANAGEMENT*/

//Display employee profile (6.1)

app.get('/api/employees/:id',async(req:Request,res:Response)=>{
    try{
        const employees = await prisma.employees.findMany({
            select:{
                employeeId: true,
                roleId: true,
                firstName: true,
                middleName: true,
                lastName: true,
                birthDay: true,
                sex: true,
                emailAdd: true,
                cpNum: true,
                employeeStatus: true,
                dateHired: true,
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
                birthDay: birthDay,
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

//Assign employee role (6.3)

app.post('/api/employees/:id/roles',async(req:Request,res:Response) =>{
    const {roleName} = req.body;
    try{
        const roles = await prisma.roles.create({
            data:{
                roleName: roleName,
            }
        });
        
        res.status(201).json(roles);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});

//Update employee profile (6.4)

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

//Update employee role (6.5)

app.put('/api/employees/:id/roles/:roleid/',async(req:Request,res:Response)=>{
    const {roleName} = req.body;
    try{
        const roles = await prisma.roles.update({
            where:{
                roleId: Number(req.params.id)
            },
            data:{
                roleName:roleName,
            }
        });
        res.status(200).json(roles);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
});



app.listen(port, () =>
  console.log(`REST API server ready at: http://localhost:${port}`),
)