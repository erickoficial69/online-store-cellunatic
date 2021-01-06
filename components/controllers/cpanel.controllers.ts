import { AppData } from "../../interfaces/interfaces"
import fetch from 'isomorphic-fetch'

export const updateApp = async(app:AppData)=>{
    const send = await fetch(`${process.env.API}/app`, {
            method: 'put',
            body: JSON.stringify({ newData: app }),
            headers: {
                "content-type": "application/json"
            }
        })
        await send.json()
}

export const getTasa = async()=>{
    const req = await fetch(`${process.env.API}/app/tasacambio`)
    return await req.json()
}

export const updateTasa = async({monto,_id}:any)=>{
    const send = await fetch(`${process.env.API}/app/tasacambio`, {
            method: 'put',
            body: JSON.stringify({ monto, _id}),
            headers: {
                "content-type": "application/json"
            }
        })
        await send.json()
}