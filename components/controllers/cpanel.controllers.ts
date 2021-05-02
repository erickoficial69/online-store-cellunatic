import { AppData, Seccion } from "../../interfaces/interfaces"

export const updateApp = async(app:AppData)=>{
    const send = await fetch(`${process.env.API}/app`, {
            method: 'put',
            body: JSON.stringify({ newData: app }),
            headers: {
                "content-type": "application/json"
            }
        })
    return await send.json()
}


export const updateTasa = async({monto,_id}:any)=>{
    const send = await fetch(`${process.env.API}/app/tasacambio`, {
            method: 'put',
            body: JSON.stringify({ monto, _id}),
            headers: {
                "content-type": "application/json"
            }
        })
    return await send.json()
}

export const getTasaCambio = async()=>{
    const req = await fetch(process.env.API+`/app/tasacambio`)
    return await req.json()
}

export const getAppData = async()=>{
    const send = await fetch(process.env.API+`/app`)
    return await send.json()
}

export const getSections = async()=>{
    const send = await fetch(process.env.API+`/sections`)
    return await send.json()
}
export const createSection = async(section:Seccion)=>{
    const send = await fetch(process.env.API+`/sections`,{
        method:'post',
        body:JSON.stringify({newData:section}),
        headers:{
            "content-type": "application/json"
        }
    })
    return await send.json()
}
export const updateSection = async(section:Seccion)=>{
    const send = await fetch(process.env.API+`/sections`,{
        method:'put',
        body:JSON.stringify({id:section._id,newData:section}),
        headers:{
            "content-type": "application/json"
        }
    })
    return await send.json()
}
export const deleteSection = async(id:string)=>{
    const send = await fetch(process.env.API+`/sections/${id}`,{
        method:'delete',
        headers:{
            "content-type": "application/json"
        }
    })
    return await send.json()
}