import { useEffect, useState, useContext } from 'react'
import * as userServ from '../components/controllers/usuarios.controllers'
import { useRouter } from 'next/router'
import Head from 'next/head'
import GlobalAppContext from '../context/app/app_state'



const LoginForm = () => {
    const { loaderCTRL }:any = useContext(GlobalAppContext)
    const { push } = useRouter()
    const [disabled, setDisabled] = useState<boolean>(false)

    const login = async (e:any) => {
        e.preventDefault()
        const {correo,password}:any = e.target

            if(correo.value === "" || password.value === ""){
                setDisabled(true)
                setTimeout(()=>{
                    setDisabled(false)
                },2000)
                return
            }
            loaderCTRL(true)
            try{

                const sesion = await userServ.loginUser({correo:correo.value,password:password.value})
                if(!sesion){
                    alert('error, verifica sus credenciales')
                    return loaderCTRL(false)        
                }
                localStorage.cellunatic = JSON.stringify(sesion)
                push('/cpanel')

            }catch(err){
                    console.log(err)
                    alert('hubo un error de conexion')
            }
        
        loaderCTRL(false)
    }

    useEffect(() => {
        const result = userServ.verifySesion()
        
        if(result.correo !== "") push('/cpanel')

        loaderCTRL(document.location.pathname)
    }, [])

    return (
        <>
            <Head>
                <title>Cellunatic - Login</title>
            </Head>
            <div className="containerForm">
                <form onSubmit={login} style={{padding:10,borderRadius:5,background:'rgb(20,20,20)'}}>
                    <h3 style={{ marginBottom: '10px', textAlign:'center' }} >Login</h3>

                    <div style={{margin:5}}>
                        <label >{disabled?'no puede estar vacio':'Email' }</label>
                        <input disabled={disabled} type="email" name="correo" placeholder="Jhon@gmail.com" />
                    </div>

                    <div style={{margin:5}}>
                        <label>{disabled?'no puede estar vacio':'Contraseña'}</label>

                        <input disabled={disabled} type="password" name="password" placeholder="*********" />
                    </div>

                    <button style={{ marginTop: '5px' }} disabled={disabled} >Login</button>
                    
                    {/* <Typography style={{ marginTop: '20px' }} variant="caption" >Nó tienes cuenta? <b onClick={()=>push('/register')} >Registrate</b></Typography> */}
                </form>
            </div>

        </>
    )
}

export default LoginForm