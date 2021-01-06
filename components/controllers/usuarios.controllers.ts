import { User } from "../../interfaces/interfaces"
import fetch from 'isomorphic-fetch'

export const getUser = async(param:string)=>{
    const get = await fetch(`${process.env.API}/user`,{
        method:'post',
        body:JSON.stringify({param:{correo:param}}),
        headers:{
            "content-type":"application/json"
        }
    })

    return await get.json()
}

export const createUserUser = async(user:User)=>{
    const get = await fetch(`${process.env.API}/users`,{
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
    const get = await fetch(`${process.env.API}/user`,{
        method:'post',
        body:JSON.stringify({param}),
        headers:{
            "content-type":"application/json"
        }
    })

    return await get.json()
}