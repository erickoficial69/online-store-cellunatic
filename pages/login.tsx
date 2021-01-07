import { Container, Input, InputLabel, FormControl, Button, FormGroup, Typography } from '@material-ui/core'
import Template from '../components/App'
import { useEffect, useState, ChangeEvent } from 'react'
import { User, Context } from '../interfaces/interfaces'
import { loginUser } from '../components/controllers/usuarios.controllers'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface Props {
    context: Context
}

type InputParam = ChangeEvent<HTMLInputElement>

const LoginForm = ({ context }: Props) => {
    const { setAppLoader, verifySesion } = context
    const { push } = useRouter()
    const [userData, setUserData] = useState<User>({
        correo: '',
        password: ''
    })
    const [disabled, setDisabled] = useState<boolean>(false)

    const setUser = async (e: InputParam) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }


    const verifyPass = async () => {
        if (userData.password === '') return setDisabled(true)
        setDisabled(false)
    }

    const login = async () => {

        if (userData.password === '' || userData.correo === '') return setDisabled(true)

        setAppLoader(true)
        try{

            const sesion = await loginUser(userData)
            if(!sesion){
                alert('error, verifica sus credenciales')
                return
                setApploader(false)
            }
            localStorage.cellunatic = JSON.stringify(sesion)
            push('/cpanel')
        }catch(err){
            console.log(err)
            alert('hubo un error de conexion')
            return
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
                <FormGroup style={{background:'rgb(20,20,20)',padding:10,borderRadius:5}} >
                    <Typography color="textPrimary" style={{ marginBottom: '30%', textAlign:'center' }} variant="h4" >Login</Typography>

                    <FormControl style={{margin:5}}>
                        <InputLabel className="label" >Email</InputLabel>
                        <Input style={{color:'black'}} error={disabled} type="email" onChange={(e: InputParam) => {
                            setUser(e);
                        }} name="correo" placeholder="Jhon@gmail.com" />
                    </FormControl>

                    <FormControl style={{margin:5}}>
                        <InputLabel>Contraseña</InputLabel>

                        <Input style={{color:'black'}} error={disabled} type="password" name="password" onChange={(e: InputParam) => {
                            setUser(e)
                            verifyPass()
                        }} placeholder="*********" />
                    </FormControl>

                    <Button style={{ marginTop: '5px' }} disabled={disabled} variant="contained" color="secondary" onClick={login} >Login</Button>
                    
                    {/* <Typography style={{ marginTop: '20px' }} variant="caption" >Nó tienes cuenta? <b onClick={()=>push('/register')} >Registrate</b></Typography> */}
                </FormGroup>
            </div>

        </Container>
    )
}

export default Template(LoginForm)