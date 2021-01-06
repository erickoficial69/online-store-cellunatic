import { Context } from '../interfaces/interfaces'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { Facebook, Instagram, Mail, Phone, Telegram, Twitter, WhatsApp } from '@material-ui/icons'


const Footer = (props:any) => {
const {appData}:Context = props.context
    return (
        <footer style={{padding:'10px 0',marginTop:'70px',overflow:'hidden'}}>
            <Container>
                <Typography color="textPrimary" variant="h4" style={{margin:'20px 0',textAlign:'center'}}>Contáctenos</Typography>
                <Grid container spacing={4} >
                    <Grid item xs={12} md={6} xl={4}>
                            <Typography color="textPrimary" variant="h5">Cellunatic</Typography>
                            <Typography style={{maxWidth:'600px',textAlign:'justify'}} color="textPrimary" paragraph>
                                Cellunatic, tienda de accesorios, repuestos y servicio técnico profesional en telefonía móvil y dispositivos móviles
                            </Typography>


                            <Typography  variant="caption" color="textPrimary" style={{textAlign:'center',margin:'10px',maxWidth:'600px'}} paragraph> {appData?appData.addres:''} </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} xl={8}>
                        <Grid container spacing={2} >
                            
                            {appData.contact.phone?(
                                    <Grid item ><a href={`tel:${appData.contact.phone}`}><Button variant="outlined" startIcon={<Phone />} size="small">{appData.contact.phone}</Button></a></Grid>
                            ):null}
                            

                            {appData.contact.telegram?(
                                    <Grid item ><a href={`tel:${appData.contact.telegram}`}><Button variant="outlined" startIcon={<Telegram />} size="small">{appData.contact.telegram}</Button></a>
                            </Grid>
                            ):null}

                            
                            {appData.contact.whatsapp ?(
                                    <Grid item ><a href={`tel:${appData.contact.whatsapp}`}><Button variant="outlined" startIcon={<WhatsApp />} size="small">{appData.contact.whatsapp}</Button></a></Grid>
                            ):null}
                                  
                            {appData.contact.email?(
                                    <Grid item ><a href={`mailto:${appData.contact.email}`}><Button variant="outlined" startIcon={<Mail />} size="small">{appData.contact.email}</Button></a></Grid>
                            ):null}

                           {appData.contact.facebook?(
                                    <Grid item ><a href={appData.contact.facebook?.replace('http','https')} target="_blank" rel="noopener noreferrer"><Button variant="outlined" startIcon={<Facebook/>} size="small">{appData.contact.facebook?.replace(/^https?:\/\//,'')}</Button></a></Grid>
                            ):null}

                            {appData.contact.instagram?(
                                    <Grid item ><a href={appData.contact.instagram?.replace('http','https')}><Button variant="outlined" startIcon={<Instagram/>} size="small">{appData.contact.instagram?.replace(/^https?:\/\//,'')}</Button></a></Grid>
                            ):null}

                            {appData.contact.twitter?(
                                    <Grid item ><a href={appData.contact.twitter?.replace('http','https')} target="_blank" rel="noopener noreferrer"><Button variant="outlined" startIcon={<Twitter/>} size="small">{appData.contact.twitter?.replace(/^https?:\/\//,'')}</Button></a></Grid>
                            ):null}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    )
}
export default Footer