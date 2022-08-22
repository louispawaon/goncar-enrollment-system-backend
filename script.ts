import * as express from 'express';
import {Request,Response} from 'express';
import {PrismaClient} from '@prisma/client';

const app = express();
app.use(express.json());
//npm run devStart
//const router = require('express').Router();
const prisma = new PrismaClient();

/*TEST CODE*/
/*app.post("/",(req:Request,res:Response)=>{


});*/
  
async function main(){
  // TRAINEE ENROLLMENT MODULE

  //trainees
  await prisma.trainees.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.registrations.deleteMany();
  await prisma.employees.deleteMany();
  await prisma.trainingYears.deleteMany();
  await prisma.courses.deleteMany();
  await prisma.employees.deleteMany();
  await prisma.roles.deleteMany();

  const traineeTestdate = new Date('2015-02-02')
  // const trainee = await prisma.trainees.create({
  //   data:{
  //     firstName:"Try",
  //     middleName:"Meh",
  //     lastName:"Dela Cruz",
  //     birthDay:'1996-01-01',
  //     sex:"Female",
  //     address:"Davao City",
  //     emailAdd:"juandcruz@testtest.com",
  //     cpNum:"0912343533222",
  //     educationalAttainment:"College Graduate",
  //     yearGrad:'2022-05-01',
  //     SSSNum:"12312-3123213-3213",
  //     TINNum:"1312321-123213-12321",
  //     SGLicense:"123123-312312-31231",
  //     expiryDate:"2022-05-01",
  //   }
  // });

  // console.log(trainee);

     //registrations
    const registrations = await prisma.registrations.create({
      data:{
        dateEnrolled:"1996-01-01",
        registrationStatus:"enrolled",
        traineeId:1,
        batchId:1,
        courseId:1,
        trainingYearId:1
      }

    });
    console.log(registrations)

    //Training module. Batch

    // const batchsampledate = new Date('2010-05-05')
    // const batch = await prisma.batch.create({
    //   data:{
    //     laNumber:"insert LA NUMBER HERE",
    //     batchName:"insert BATCHNAME HERE",
    //     startDate:batchsampledate,
    //     endDate:batchsampledate,
    //     maxStudents:5,
    //     //batchRegistration:,
    //     //courses:5,
    //     courseId:213123,
    //     trainingYearId:20,
    //     employeeId:20
    //   }
    // });
    // console.log(batch);

    //tuition view

    // const tuitionview = await prisma.tuitionview.create({
    //   data:{
    //     tuition: 32.32,
    //     courseId:1,
    //     trainingYearId:1
    //   }
    // });
    // console.log(tuitionview);

    //training Years

      const trainingYears = await prisma.trainingYears.create({
        data:{
          trainingYearSpan:"lmao"
        }
      });

      console.log(trainingYears);

    //courses

      const courses = await prisma.courses.create({
        data:{
          courseId:10,
          courseName:"progremeng",
          courseDescription:"Mao ni ang description",
          requiredHours:999,
          units:6868
        }
      });

      console.log(courses);

     //financial modules transactions
     
    //  const transactions = await prisma.transactions.create({   SAME FOREIGN KEY ERROR 
    //   data:{
    //     transactionId:1,
    //     payableCost:696969,
    //     paymentMethod:"Gcash",
    //     registraionNumber:23123,
    //     payableId:123123
    //   }   
    //  });
    
    //  console.log(transactions);

    //payables

    // const payables = await prisma.payables.create({
    //   data:{
    //     payableName:"payablename",
    //     payableCost:23131.23,
    //     // payableTransaction transactions[] @relation("payable")
    //     // courses            courses        @relation("course", fields: [courseId], references: [courseId])
    //     courseId:2,
    //     // trainingYears      trainingYears  @relation(fields: [trainingYearId], references: [trainingYearId])
    //     trainingYearId:2
    //   }
    // });

      // console.log(payables);
    //payable names

    // const payableNames = await prisma.payableNames.create({
    //   data:{
    //     payableName:"unique string here",
    //     // courses     courses @relation("course", fields: [courseId], references: [courseId])
    //     courseId:2
    //   }
    // });

    //   console.log(payableNames);

    //ADMINISTRATIVE MODULES

      //employees 

    const date = new Date('2015-01-01')
    const employees = await prisma.employees.create({
        data:{  
            roleId:10,           
            firstName:"Try",
            middleName:"Meh",
            lastName:"Dela Cruz",
            birthDay:date,
            sex:"Female",
            emailAdd:"juandcruz@testtest.com",
            cpNum:"09082828183",
            employeeStatus:"Hired",
            dateHired:date
          }
        });
      console.log(employees);
        

      //roles
      const roles = await prisma.roles.create({
        data:{
          roleId:3,  //always have to be unique so need nimo i change ang Id kada run nimo HAHA
          roleName:"President"
        }
      });
      console.log(roles);

}

main()
  .catch(e=>{
  console.error(e.message)
  })
  .finally(async()=>{
  await prisma.$disconnect()
})


app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)