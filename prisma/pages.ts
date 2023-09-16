import prisma from "./client";

export async function getAllPages(){
    const pages = await prisma.page.findMany()
    return pages
}

export async function createPage(data:any){
    try{
        await prisma.page.create({
            data:data
        })
    }catch(error){
        console.log(error)
    }
}

export async function getSinglePageByName(pageName:string){
   try {
    const page = await prisma.page.findMany({
        where:{
            name:pageName
        }
    })
    return page
   } catch (error) {
    return error
   }
}
export async function getSinglePageById(id:string){
    try {
     const page = await prisma.page.findUnique({
         where:{
             id:id
         }
     })
     return page
    } catch (error) {
     return error
    }
 }