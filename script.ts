import * as express from 'express';
import {Request,Response} from 'express';
import {PrismaClient} from '@prisma/client';

const app = express();
app.use(express.json());

//const router = require('express').Router();
const prisma = new PrismaClient();

/*TEST CODE*/
/*app.post("/",(req:Request,res:Response)=>{


});*/
  
async function main(){
  await prisma.trainees.deleteMany();
  const user = await prisma.trainees.create({
    data:{
      firstName:"Juan",
      middleName:"Hatdog",
      lastName:"Dela Cruz",
      birthDay:'1996-01-01',
      sex:"Male",
      address:"Davao City",
      emailAdd:"juandcruz@test.com",
      cpNum:"0912343533222",
      educationalAttainment:"College Graduate",
      yearGrad:'2022-05-01',
      SSSNum:"12312-3123213-3213",
      TINNum:"1312321-123213-12321",
      SGLicense:"123123-312312-31231",
      expiryDate:"2022-05-01",
    }
  });

  console.log(user);
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