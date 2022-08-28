import * as express from 'express';

const app = express();
app.use(express.json());

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

//npm run devStart
//const router = require('express').Router();

async function main(){
//ABANDONED 

/*
  await prisma.trainees.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.registrations.deleteMany();
  await prisma.employees.deleteMany(); 
*/

/*
const trainee = await prisma.trainees.create({
  data:{
    firstName:"Try",
    middleName:"Meh",
    lastName:"Dela Cruz",
    birthDay:new Date('1996-01-01'),
    sex:"Female",
    address:"Davao City",
    emailAdd:"juandcruz@testtest.com",
    cpNum:"0912343533222",
    educationalAttainment:"College Graduate",
    yearGrad:'2022-05-01',
    SSSNum:"12312-3123213-3213",
    TINNum:"1312321-123213-12321",
    SGLicense:"123123-312312-31231",
    expiryDate:new Date('2022-05-01')
}});

console.log(trainee)

const traineeRegistration = await prisma.trainees.update({
  where:{
    traineeId:1
  },
  data:{
    registrations:{
      create:{
        dateEnrolled:new Date('2022-02-01'),
        registrationStatus:"enrolled",
      }
    }
  }
});

console.log(traineeRegistration)

const traineeShow = await prisma.trainees.findUnique({
  where:{
    traineeId:1
  },
  include:{
    registrations:true
  }
});

console.log(traineeShow)
*/
}

main()
  .catch(e=>{
  console.error(e.code+" + "+e.message)
  })
  .finally(async()=>{
  await prisma.$disconnect()
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)