import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
//this part is where the Prisma queries will be pasted
    const user = await prisma.user.findMany({

    })

    console.log(user.length)
}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
