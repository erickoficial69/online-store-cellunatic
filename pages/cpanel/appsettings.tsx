import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { verifySesion } from '../../components/controllers/usuarios.controllers'
import GlobalAppContext from '../../context/app/app_state'
import { User } from '../../interfaces/interfaces'


type InputTarget = ChangeEvent<HTMLInputElement>

const AppSettings = () => {
    const { push, back } = useRouter()
    const { loaderCTRL, appData, updateApp }:any = useContext(GlobalAppContext)
    const [user, setUser] = useState<User>({ correo: '', password: '' })

    const setContact = (e: InputTarget) => {
        const { contact } = appData

        updateApp({ ...appData, contact: { ...contact, [e.target.name]: e.target.value } })
    }

    const app_change_data = (e: InputTarget) => {

        updateApp({ ...appData, [e.target.name]: e.target.value })
    }


    const saveChanges = async () => {
        loaderCTRL('load')
        await updateApp(appData)
        loaderCTRL(false)
    }


    useEffect(() => {
        const result = verifySesion()

        if (result.correo === "") push('/login')

        setUser(result)
        loaderCTRL(document.location.pathname)
    }, [])

    return user.rango && user.rango === "administrador" ? ( <main>
            <Head>
                <title>Cellunatic - App settings</title>
            </Head>
                <section className="full_width" >
                <ul style={{ marginTop: '65px' }}>
                        <li>
                            <p style={{color:'white'}} >{appData.name}</p>
                        </li>
                        <li>
                            <button onClick={() => back()}>atras</button>
                        </li>
                    </ul>
                   

                        <div>
                            <form style={{position: 'relative' }}>

                                
                                    <label>Keywords</label>
                                    <input onChange={app_change_data} type="text" name="keywords" value={appData.keywords} />
                                

                                
                                    <label>Dirección</label>
                                    <input onChange={app_change_data} type="text" name="addres" value={appData.addres} />
                                

                                <button style={{ marginTop: '10px' }} onClick={saveChanges} >Actualizar</button>
                            </form>
                        </div>

                        <div >
                            <form style={{ position: 'relative' }}>
                                

                                
                                    
                                    <input type="email" name="email" onChange={setContact} value={appData.contact.email} />
                                
                                    <input type="url" name="facebook" onChange={setContact} value={appData.contact.facebook} />
                      
                                    <input type="url" name="instagram" onChange={setContact} value={appData.contact.instagram} />
                                

                                <button style={{ marginTop: '10px' }} onClick={saveChanges} >Actualizar</button>
                            </form>
                        </div>

                        <div >
                            <form style={{ position: 'relative' }}>
                                
                                    
                                    <input type="url" name="twitter" onChange={setContact} value={appData.contact.twitter} />
                                

                                
                                    
                                    <input type="tel" name="phone" onChange={setContact} value={appData.contact.phone} />
                                

                                
                                    
                                    <input type="tel" name="whatsapp" onChange={setContact} value={appData.contact.whatsapp} />
                                

                                
                                    
                                    <input type="url" name="telegram" onChange={setContact} value={appData.contact.telegram} />
                                

                                <button style={{ marginTop: '10px' }} onClick={saveChanges} >Actualizar</button>
                            </form>
                        </div>
                    
                </section>
            </main>) : null
}

export default AppSettings