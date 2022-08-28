import * as express from 'express';

const app = express();
app.use(express.json());
/*
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
    firstName:"Louis",
    middleName:"Jaboc",
    lastName:"Pawaon",
    birthDay:new Date('2001-10-16'),
    sex:"Male",
    address:"Davao City",
    emailAdd:"lpawaon@gmail.com",
    cpNum:"0912343533222",
    educationalAttainment:"College Graduate",
    yearGrad:'2022-05-01',
}});

console.log(trainee)
*/
/*
const batch = await prisma.batch.create({
  data:{
    laNumber:"123-123-132",
    batchName:"Agila",
    startDate: new Date('2022-10-18'),
    endDate: new Date ('2022-10-22'),
    maxStudents: Number(30)
  }
});

const course = await prisma.courses.create({
  data:{
      courseName:"PLTC",
      courseDescription:"Something something details",
      requiredHours: Number(120),
      units: Number(5)
  }
});

const traineeRegistration = await prisma.trainees.update({
  where:{
    traineeId:1
  },
  data:{
    SSSNum:"12312-3123213-3213",
    TINNum:"1312321-123213-12321",
    SGLicense:"123123-312312-31231",
    expiryDate:new Date('2022-05-01'),
    registrations:{
      create:{
        dateEnrolled:new Date('2022-02-01'),
        registrationStatus:"enrolled",
        batch:{
          connect:{
            batchId:1
          }
        },
        courses:{
          connect:{
            courseId:1
          }
        }
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

/*const findtime = await prisma.courses.findMany({
  include:{
    registration: true,
    batch:true
  }
})
console.log(JSON.stringify(findtime))*/
/*const trainingYear = await prisma.trainingYears.create({
  data:{
    trainingYearSpan:"2022-2023"
  }
});

const registration = await prisma.registrations.update({
  where:{
    registrationNumber:1
  },
  data:{
    trainingYears:{
      connect:{
        trainingYearId:1
      }
    }
  }
})
}

main()
  .catch(e=>{
  console.error(e.code+" + "+e.message)
  })
  .finally(async()=>{
  await prisma.$disconnect()
})
*/
app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)