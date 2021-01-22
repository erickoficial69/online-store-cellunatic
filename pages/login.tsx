import { Container, Input, InputLabel, FormControl, Button, FormGroup, Typography } from '@material-ui/core'
import Template from '../components/App'
import { useEffect, useState } from 'react'
import {  Context } from '../interfaces/interfaces'
import { loginUser } from '../components/controllers/usuarios.controllers'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface Props {
    context: Context
}

const LoginForm = ({ context }: Props) => {
    const { setAppLoader, verifySesion } = context
    const { push } = useRouter()
    const [disabled, setDisabled] = useState<boolean>(false)

    const login = async () => {
        const correo:any = document.getElementById('correo')
        const password:any = document.getElementById('password')

            if(correo.value === "" || password.value === ""){
                setDisabled(true)
                setTimeout(()=>{
                    setDisabled(false)
                },2000)
                return
            }
            setAppLoader(true)
            try{

                const sesion = await loginUser({correo:correo.value,password:password.value})
                if(!sesion){
                    alert('error, verifica sus credenciales')
                    return setAppLoader(false)        
                }
                localStorage.cellunatic = JSON.stringify(sesion)
                push('/cpanel')

            }catch(err){
                    console.log(err)
                    alert('hubo un error de conexion')
            }
        
        setAppLoader(false)
    }

    useEffect(() => {
        const result = verifySesion()
        
        if(result.correo !== "") push('/cpanel')

        setAppLoader(false)
    }, [])

    return (
        <Container>
            <Head>
                <title>Cellunatic - Login</title>
            </Head>
            <div className="containerForm">
                <FormGroup style={{padding:10,borderRadius:5,background:'rgb(20,20,20)'}}>
                    <Typography color="textPrimary" style={{ marginBottom: '10px', textAlign:'center' }} variant="h4" >Login</Typography>

                    <FormControl style={{margin:5}}>
                        <InputLabel >{disabled?'no puede estar vacio':'Email' }</InputLabel>
                        <Input error={disabled} type="email" id="correo" placeholder="Jhon@gmail.com" />
                    </FormControl>

                    <FormControl style={{margin:5}}>
                        <InputLabel>{disabled?'no puede estar vacio':'Contraseña'}</InputLabel>

                        <Input error={disabled} type="password" id="password" placeholder="*********" />
                    </FormControl>

                    <Button style={{ marginTop: '5px' }} disabled={disabled} variant="outlined" onClick={login} >Login</Button>
                    
                    {/* <Typography style={{ marginTop: '20px' }} variant="caption" >Nó tienes cuenta? <b onClick={()=>push('/register')} >Registrate</b></Typography> */}
                </FormGroup>
            </div>

        </Container>
    )
}

export default Template(LoginForm)