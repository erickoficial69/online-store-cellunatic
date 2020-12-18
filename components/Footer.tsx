import { Context } from '../interfaces/interfaces'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { Facebook, Instagram, Mail, Phone, Telegram, Twitter, WhatsApp } from '@material-ui/icons'

type Props = {
    context: Context
}

const Footer = ({ context }: Props) => {
    const {app} = context

    return (
        <footer style={{background:'rgb(10,10,10)',padding:'10px 0',marginTop:'70px'}}>
            <Container>
                <Typography color="textPrimary" variant="h4" style={{margin:'20px 0',textAlign:'center'}}>Contáctenos</Typography>
                <Grid container spacing={4} >
                    <Grid item xs={12} md={6} xl={4}>
                            <Typography color="textPrimary" variant="h5">Cellunatic</Typography>
                            <Typography style={{maxWidth:'600px',textAlign:'justify'}} color="textPrimary" paragraph>
                                Cellunatic, tienda de accesorios, repuestos y servicio técnico profesional en telefonía móvil y dispositivos móviles
                            </Typography>


                            <Typography  variant="caption" color="textPrimary" style={{textAlign:'center',margin:'10px',maxWidth:'600px'}} paragraph> {app.addres} </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} xl={8}>
                        <Grid container spacing={2} >
                            
                            {app.contact.phone?(
                                    <Grid item ><a href={`tel:${app.contact.phone}`}><Button variant="outlined" startIcon={<Phone />} size="small">{app.contact.phone}</Button></a></Grid>
                            ):null}
                            

                            {app.contact.telegram?(
                                    <Grid item ><a href={`tel:${app.contact.telegram}`}><Button variant="outlined" startIcon={<Telegram />} size="small">{app.contact.telegram}</Button></a>
                            </Grid>
                            ):null}

                            
                            {app.contact.whatsapp?(
                                    <Grid item ><a href={`tel:${app.contact.whatsapp}`}><Button variant="outlined" startIcon={<WhatsApp />} size="small">{app.contact.whatsapp}</Button></a></Grid>
                            ):null}
                                  
                            {app.contact.email?(
                                    <Grid item ><a href={`mailto:${app.contact.email}`}><Button variant="outlined" startIcon={<Mail />} size="small">{app.contact.email}</Button></a></Grid>
                            ):null}

                           {app.contact.facebook?(
                                    <Grid item ><a href={app.contact.facebook?.replace('http','https')} target="_blank" rel="noopener noreferrer"><Button variant="outlined" startIcon={<Facebook/>} size="small">{app.contact.facebook?.replace(/^https?:\/\//,'')}</Button></a></Grid>
                            ):null}

                            {app.contact.instagram?(
                                    <Grid item ><a href={app.contact.instagram?.replace('http','https')}><Button variant="outlined" startIcon={<Instagram/>} size="small">{app.contact.instagram?.replace(/^https?:\/\//,'')}</Button></a></Grid>
                            ):null}

                            {app.contact.twitter?(
                                    <Grid item ><a href={app.contact.twitter?.replace('http','https')} target="_blank" rel="noopener noreferrer"><Button variant="outlined" startIcon={<Twitter/>} size="small">{app.contact.twitter?.replace(/^https?:\/\//,'')}</Button></a></Grid>
                            ):null}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    )
}
export default Footer