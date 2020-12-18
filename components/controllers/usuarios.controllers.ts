import { User } from "../../interfaces/interfaces"
import fetch from 'isomorphic-fetch'

const API:any = process.env.CELLUNATICBACKEND || 'http://localhost:3001'

export const getUser = async(param:string)=>{
    const get = await fetch(`${API}/user`,{
        method:'post',
        body:JSON.stringify({param:{correo:param}}),
        headers:{
            "content-type":"application/json"
        }
    })

    return await get.json()
}

export const createUserUser = async(user:User)=>{
    const get = await fetch(`${API}/users`,{
        method:'post',
        body:JSON.stringify(user),
        headers:{
            "content-type":"application/json"
        }
    })

    return await get.json()
}

export const loginUser = async(user:User)=>{
    const param ={
        correo:user.correo,
        password:user.password
    }
    const get = await fetch(`${API}/user`,{
        method:'post',
        body:JSON.stringify({param}),
        headers:{
            "content-type":"application/json"
        }
    })

    return await get.json()
}