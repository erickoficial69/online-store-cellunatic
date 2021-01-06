import { Container, FormGroup, Input, Typography, FormControl, InputLabel, Button, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core'
import { Email, Facebook, Instagram, Phone, Telegram, Twitter, Update, WhatsApp, ArrowBack } from '@material-ui/icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import Template from '../components/App'
import { updateApp } from '../components/controllers/cpanel.controllers'
import { Context, User } from '../interfaces/interfaces'

interface Props {
    context: Context
}

type InputTarget = ChangeEvent<HTMLInputElement>

const App_settings = ({ context }: Props) => {
    const { push, back } = useRouter()
    const { setAppLoader, verifySesion, appData, setAppData } = context
    const [user, setUser] = useState<User>({ correo: '', password: '' })

    const setContact = (e: InputTarget) => {
        const { contact } = appData

        setAppData({ ...appData, contact: { ...contact, [e.target.name]: e.target.value } })
    }

    const app_change_data = (e: InputTarget) => {

        setAppData({ ...appData, [e.target.name]: e.target.value })
    }


    const saveChanges = async () => {
        setAppLoader(true)
        await updateApp(appData)
        setAppLoader(false)
    }


    useEffect(() => {
        const result = verifySesion()

        if (result.correo === "") push('/login')

        setUser(result)
        setAppLoader(false)
    }, [])

    return user.rango && user.rango === "administrador" ? ( <>
            <Head>
                <title>Cellunatic - App settings</title>
            </Head>
               <List style={{ marginTop: '65px' }}>
                    <ListItem>
                        <ListItemText style={{color:'white'}} >{appData.name}</ListItemText>
                    </ListItem>
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => back()}><ArrowBack /></IconButton>
                    </ListItemSecondaryAction>
                </List>

                <Container>
                    <Grid container spacing={2} >    

                        <Grid item xs={12} md="auto">
                            <FormGroup style={{position: 'relative' }}>

                                <FormControl style={{margin:'10px 0'}}>
                                    <InputLabel><Typography>Keywords</Typography></InputLabel>
                                    <Input onChange={app_change_data} inputMode="text" name="keywords" value={appData.keywords} />
                                </FormControl>

                                <FormControl style={{margin:'10px 0'}}>
                                    <InputLabel><Typography>Dirección</Typography></InputLabel>
                                    <Input onChange={app_change_data} inputMode="text" name="addres" value={appData.addres} />
                                </FormControl>

                                <Button size="small" style={{ marginTop: '10px' }} variant="contained" onClick={saveChanges} startIcon={<Update />} >Actualizar</Button>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} md="auto">
                            <FormGroup style={{ position: 'relative' }}>
                                

                                <FormControl style={{margin:'10px 0'}}>
                                    <InputLabel><Email /></InputLabel>
                                    <Input inputMode="email" name="email" onChange={setContact} value={appData.contact.email} />
                                </FormControl>

                                <FormControl style={{margin:'10px 0'}}>
                                    <InputLabel><Facebook /></InputLabel>
                                    <Input inputMode="url" name="facebook" onChange={setContact} value={appData.contact.facebook} />
                                </FormControl>

                                <FormControl style={{margin:'10px 0'}}>
                                    <InputLabel><Instagram /></InputLabel>
                                    <Input inputMode="url" name="instagram" onChange={setContact} value={appData.contact.instagram} />
                                </FormControl>

                                <Button size="small" style={{ marginTop: '10px' }} variant="contained" onClick={saveChanges} startIcon={<Update />} >Actualizar</Button>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} md="auto">
                            <FormGroup style={{ position: 'relative' }}>
                                <FormControl style={{margin:'10px 0'}}>
                                    <InputLabel><Twitter /></InputLabel>
                                    <Input inputMode="url" name="twitter" onChange={setContact} value={appData.contact.twitter} />
                                </FormControl>

                                <FormControl style={{margin:'10px 0'}}>
                                    <InputLabel><Phone /></InputLabel>
                                    <Input inputMode="tel" type="tel" name="phone" onChange={setContact} value={appData.contact.phone} />
                                </FormControl>

                                <FormControl style={{margin:'10px 0'}}>
                                    <InputLabel><WhatsApp /></InputLabel>
                                    <Input inputMode="tel" type="tel" name="whatsapp" onChange={setContact} value={appData.contact.whatsapp} />
                                </FormControl>

                                <FormControl style={{margin:'10px 0'}}>
                                    <InputLabel><Telegram /></InputLabel>
                                    <Input inputMode="url" name="telegram" onChange={setContact} value={appData.contact.telegram} />
                                </FormControl>

                                <Button size="small" style={{ marginTop: '10px' }} variant="contained" onClick={saveChanges} startIcon={<Update />} >Actualizar</Button>
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Container>
            </>) : null
}

export default Template(App_settings)