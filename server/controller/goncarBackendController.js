import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

/*ENROLLMENT MANAGEMENT*/

//Add Trainee (1.1)
export const addTrainee = async(req,res) =>{
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
};

//Update Trainee (1.2)
export const updateTrainee = async(req,res)=>{
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
};

//Display Trainee (1.3)
export const displayTrainee = async(req,res)=>{
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
};

//Create Trainee Registration (1.4)
export const createTraineeReg = async(req,res)=>{
    const {batchId, courseId, traineeId,SSSNum,TINNum,SGLicense,expiryDate,dateEnrolled,registrationStatus} = req.body;
    try{
        const traineeReg = await prisma.trainees.update({
            where:{
                traineeId: Number(traineeId)
            },
            data:{
                SSSNum: SSSNum,
                TINNum: TINNum,
                SGLicense: SGLicense,
                expiryDate: expiryDate,
                registrations:{
                    create:{
                        dateEnrolled: dateEnrolled,
                        registrationStatus: registrationStatus,
                        //Assign Trainee to Course Batch (1.8)
                        batch:{
                            connect:{
                                batchId: Number(batchId)
                            }
                        },
                        courses:{ 
                            connect:{
                                courseId: Number(courseId)
                            }
                        }
                    }
                }
            }
        });
        res.status(201).json(traineeReg);
    }   
    catch(error){
        res.status(400).json({msg: error.message});
    }
};

//Update Specific Trainee Registration (1.5)
export const updateTraineeReg = async(req,res)=>{
    const {registrationNumber,SSSNum,TINNum,SGLicense,expiryDate,dateEnrolled,registrationStatus} = req.body;
    try{
        const traineeReg = await prisma.trainees.update({
            where:{
                traineeId: Number(req.params.id)
            },
            data:{
                SSSNum: SSSNum,
                TINNum: TINNum,
                SGLicense: SGLicense,
                expiryDate: expiryDate,
                registrations:{
                    update:{
                        where:{
                            registrationNumber: registrationNumber
                        }, 
                        data:{
                            dateEnrolled: dateEnrolled,
                            registrationStatus: registrationStatus
                        } 
                    }
                }
            }
        });
        res.status(200).json(traineeReg);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
};

//Display Specific Trainee Registration (1.6)
export const displayTraineeReg = async(req,res)=>{
    try{
        const traineeReg = await prisma.registrations.findUnique({
            where:{
                registrationNumber: Number(req.params.id)
            }
        });
        res.status(200).json(traineeReg);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
};

//Delete/Drop Specific Trainee Registration (1.7)
export const deleteTraineeReg = async(req,res)=>{
    try{
        const traineeReg = await prisma.registrations.delete({
            where:{
                registrationNumber: Number(req.params.id)
            }
        });
        res.status(200).json(traineeReg);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
}

//Trainee Masterlist (1.9)
export const viewTraineeMaster = async(req,res)=>{
    try{
        const trainee = await prisma.trainees.findMany()
        console.log(res.status);
        res.status(200).json(trainee);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
}

/*COURSE MANAGEMENT*/

//Create New Course (2.1)
export const createCourse = async(req,res)=>{
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
}

//Update Course Details (2.2)
export const updateCourse = async(req,res)=>{
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
}

//View Specific Course (2.3)
export const viewCourse = async(req,res)=>{
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
}

//Create New Training Year (2.4)
export const newTrainingYr = async(req,res)=>{
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
}

//Update Training Year (2.5)
export const updateTrainingYr = async(req,res)=>{
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
}

//Trainee Masterlist (2.6)
export const viewCourseMaster = async(req,res)=>{
    try{
        const course = await prisma.courses.findMany({})
        res.status(200).json(course);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
}

//Training Year Masterlist (2.7)
export const viewTrainingYrMaster = async(req,res)=>{
    try{
        const trainingYr = await prisma.trainingYears.findMany({})
        res.status(200).json(trainingYr);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
}

/*COURSE BATCH MANAGEMENT*/

//Create New Course Batch(3.1)
export const addCourseBatch = async(req,res)=>{
    const {laNumber,batchName,startDate,endDate,maxStudents} = req.body;
    try{
        const batch = await prisma.batch.create({
            data:{
                laNumber:laNumber,
                batchName:batchName,
                startDate: startDate,
                endDate: endDate,
                maxStudents: maxStudents
            }
        });
        res.status(201).json(batch);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
}

//Update Course Batch Details (3.2)
export const updateCourseBatch = async(req,res)=>{
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
}

//View Specific Batch (3.4)
export const viewCourseBatch = async(req,res)=>{
    try{
        const batch = await prisma.batch.findUnique({
            where:{
                batchId:Number(req.params.id)
            }
        });
        res.status(200).json(batch);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
}

//Batch Masterlist (3.5)
export const viewCourseBatchMaster = async(req,res)=>{
    try{
        const batch = await prisma.batch.findMany({});
        res.status(200).json(batch);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
}