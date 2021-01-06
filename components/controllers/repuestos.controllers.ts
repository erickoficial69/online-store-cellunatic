import { Repuesto } from "../../interfaces/interfaces"
import fetch from 'isomorphic-fetch'

export const toBase64 = (file:any) => new Promise((resolve,reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = err => reject(err)
})

export const updateRepuesto = async (repuesto:Repuesto) => {
    const newData =repuesto
    const get = await fetch(`${process.env.API}/repuestos`,{
        method:'put',
        body: JSON.stringify({newData,id:repuesto._id}),
        headers:{
            "content-type":"application/json"
        }
    })
    return  await get.json()
}

export const createRepuesto = async (repuesto:Repuesto) => {
    
    const newRepuesto = {
            color: repuesto.color,
            imagenes: repuesto.imagenes,
            modelo: repuesto.modelo,
            nombre: repuesto.nombre,
            precio: repuesto.precio,
            producto: repuesto.producto
    }
    
    const get = await fetch(`${process.env.API}/repuestos`,{
        method:'post',
        body: JSON.stringify({newRepuesto}),
        headers:{
            "content-type":"application/json"
        }
    })
    return  await get.json()
}

export const deleteRepuesto = async(repuesto:Repuesto)=>{
    const get = await fetch(`${process.env.API}/repuestos/${repuesto._id}`,{
        method:'delete',
        headers:{
            "content-type":"application/json"
        }
    })
    return await get.json()
}

export const getRepuesto = async(id:string)=>{
    const get = await fetch(`${process.env.API}/repuestos/detail/${id}`)
    return await get.json()
}

export const getRepuestos = async(limit?:number)=>{
    const get = await fetch(`${process.env.API}/repuestos/${limit}`)
    return await get.json()
}

export const getCustomRepuesto = async(search:string,limit:number)=>{
    const get = await fetch(`${process.env.API}/repuestos/filter`,{
        method:'post',
        body:JSON.stringify({search,limit}),
        headers:{
            "content-type":"application/json"
        }
    })
    return await get.json()
}