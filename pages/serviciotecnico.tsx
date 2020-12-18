import { Container, Button, Typography, Box, List, ListItem, ListItemText, ListItemIcon, Grid } from '@material-ui/core'
import { ArrowDownward, Label } from '@material-ui/icons'
import Head from 'next/head'
import { useEffect } from 'react'
import App from '../components/App'
import { Context } from '../interfaces/interfaces'

type Props={
    context: Context
}

const ServicioTecnico = ({context}:Props)=>{
    const {setAppLoader} = context
    
    useEffect(()=>{
        setAppLoader(false)
    },[])
    return(
        <>
            <Head>
                <title>Cellunatic - servicio tectnico</title>
            </Head>
            <div className="banner" style={{position:'relative',width:'100%',height:'100vh',maxHeight:"720px",display:'flex',flexFlow:'column',justifyContent:'center'}}>
                <img style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute'}} src="/img/300.png" alt="imagen servicio tecnico" />
                <div style={{width:'100%',height:'100%',position:'absolute',background:'rgba(0,0,0, .7)'}} ></div>

                <Typography component="h1" color="textPrimary" style={{position:'relative',textAlign:'center'}} variant="h4">Servicio Técnico Profesional</Typography>
                <Typography color="textPrimary" style={{position:'relative',textAlign:'center',margin:'10px'}} paragraph>Solucion y detección de fallas en telefonia móvil, con la mejor atención porque...</Typography>
                <Typography component="h2" color="textPrimary" style={{position:'relative',textAlign:'center',margin:'10px'}}><b>Somos gente que responde!</b></Typography>

                <div style={{position:'absolute',bottom:10,right:0,left:0,textAlign:'center'}}>
                    <a href="#tag">
                        <Button variant="outlined" startIcon={<ArrowDownward />} color="secondary" >
                            Ver más
                        </Button>
                    </a>
                </div>
                
            </div>
            <Container>
                <hr  id="tag" style={{marginBottom:'65px'}}/>
                <Box>
                    <Typography component="h2" color="textPrimary" variant="h4" style={{textAlign:'center',margin:'0 0 20px 0'}} >Servicio Técnico Hardware</Typography>

                    <Typography color="textPrimary" paragraph>
                        Debido a que contamos con repuestos originales en stock, podemos asegurarte una rápida y
                        especializada atención, el precio de la reparación de su teléfono celular está directamente
                        ligado a la calidad de nuestros repuestos. Para ofrecerle la solución acorde a tu problema
                        ponete en contacto para una atención especializada. Algunas de las principales soluciones de
                        hardware para tu celular son:
                    </Typography>

                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <List>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary" /></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Reparación de Display y Pantallas táctiles</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Problemas con el Cable Flex o Cámara</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Cambio de Micrófonos o Campanillas</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Problemas con el PIN de carga o Cambio de Batería</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Arreglo conectores USB y Soldado de Placas</ListItemText>
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <List>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Arreglo / Reemplazo de Parlantes</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Problemas con los Botones</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Solución a tu equipo Mojado</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>y mucho más, consultános.</ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Box>

                <Box>
                    <Typography component="h2" color="textPrimary" variant="h4" style={{textAlign:'center',margin:'20px 0'}} >Servicio Técnico Software</Typography>
                    <Typography color="textPrimary" paragraph>
                        Si tienes problemas con la funcionalidad o el sistema operativo de tu celular. Contamos con el
                        Software necesario para realizar cualquier arreglo, dejando la funcionalidad del celular
                        operable al 100%. Algunas de las principales Soluciones de Software para tu celular son:
                    </Typography>

                    <Grid container>
                        <Grid item xs={12} >
                            <List>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Downgrade, Actualización y Flasheo de Software o Firmware.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Configuración o Instalación de Aplicaciones, GPS, Utilidades y Juegos.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Configuramos tu celular para un correcto.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Reinstalación del sistema operativo.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><Label color="secondary"/></ListItemIcon>
                                    <ListItemText style={{color:'white'}}>Arreglo conectores USB y Soldado de Placas</ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>

                    <Typography color="textPrimary">
                        Liberación y desbloqueo de tu teléfono celular, realizado tanto por Software como por Código,
                        no comprometemos el teléfono.
                    </Typography>
                </Box>
            </Container>
        </>
    )
}
export default App(ServicioTecnico)