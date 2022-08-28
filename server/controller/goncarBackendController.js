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
        const trainee = await prisma.trainees.findMany({})
        res.status(200).json(trainee);
    }
    catch(error){
        res.status(400).json({msg: error.message});
    }
}

