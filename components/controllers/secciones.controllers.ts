import { Seccion } from "../../interfaces/interfaces"

export const updateSeccion = async (seccion?:Seccion) => {
    const newData = seccion
    const get = await fetch(`${process.env.API}/sections`,{
        method:'put',
        body: JSON.stringify({newData,id:seccion?._id}),
        headers:{
            "content-type":"application/json"
        }
    })
    return  await get.json()
}

export const getSecciones = async()=>{
    const get = await fetch(`${process.env.API}/sections`)
    return await get.json()
}

export const deleteSeccion = async(id:string)=>{
    const get = await fetch(`${process.env.API}/sections/${id}`,{
        method:'delete',
        headers:{
            "content-type":"application/json"
        }
    })
    return await get.json()
}

export const createSeccion = async(param?:Seccion)=>{
    const get = await fetch(`${process.env.API}/sections`,{
        method:'post',
        body:JSON.stringify({newData:param}),
        headers:{
            "content-type":"application/json"
        }
    })
    return await get.json()
}