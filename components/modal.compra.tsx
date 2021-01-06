import { AppData } from '../interfaces/interfaces'
import { Button, Typography } from '@material-ui/core'
import { Facebook, Instagram, Mail, Phone, Telegram, Twitter, WhatsApp } from '@material-ui/icons'

type Props = {
    app: AppData
    setModal:(param:boolean)=>void
}

const ModalCompra = ({ app, setModal }: Props) => {

    return (
        <>
        <div onClick={()=>setModal(false)} style={{ position: 'fixed', width: '100vw', height: '100vh',top:0,left:0,right:0,bottom:0, zIndex: 1000, background:'rgba(0,0,0, .8)' }} ></div>
            <div style={{ padding:'10px 5px', borderRadius:5,textAlign:'center', position: 'absolute',top:'25%',left:'calc(50% - 150px)',background:'rgb(20,20,20)', width: '300px', overflowX: 'hidden', overflowY: 'auto', zIndex: 1001 }}>
                <Typography color="textPrimary" variant="h6" style={{margin:'5px 0',textAlign:'center'}}>Ofertar a travez de:</Typography>

                {app.contact.phone?(
                    <a href={`tel:${app.contact.phone}`}><Button style={{margin:'10px 0', width:'100%'}} variant="outlined" startIcon={<Phone />} size="small">{app.contact.phone}</Button></a>
                        ):null}

                {app.contact.telegram?(
                    <a href={`tel:${app.contact.telegram}`}><Button style={{margin:'10px 0', width:'100%'}} variant="outlined" startIcon={<Telegram />} size="small">{app.contact.telegram}</Button></a>
                        
                        ):null}

                {app.contact.whatsapp?(
                    <a href={`tel:${app.contact.whatsapp}`}><Button style={{margin:'10px 0', width:'100%'}} variant="outlined" startIcon={<WhatsApp />} size="small">{app.contact.whatsapp}</Button></a>
                        ):null}
                            
                {app.contact.email?(
                    <a href={`mailto:${app.contact.email}`}><Button style={{margin:'10px 0', width:'100%'}} variant="outlined" startIcon={<Mail />} size="small">{app.contact.email}</Button></a>
                        ):null}

                {app.contact.facebook?(
                    <a href={app.contact.facebook?.replace('http','https')} target="_blank" rel="noopener noreferrer"><Button style={{margin:'10px 0', width:'100%'}} variant="outlined" startIcon={<Facebook/>} size="small">{app.contact.facebook?.replace(/^https?:\/\//,'')}</Button></a>
                        ):null}

                {app.contact.instagram?(
                    <a href={app.contact.instagram?.replace('http','https')}><Button style={{margin:'10px 0', width:'100%'}} variant="outlined" startIcon={<Instagram/>} size="small">{app.contact.instagram?.replace(/^https?:\/\//,'')}</Button></a>
                        ):null}

                {app.contact.twitter?(
                    <a href={app.contact.twitter?.replace('http','https')} target="_blank" rel="noopener noreferrer"><Button style={{margin:'10px 0', width:'100%'}} variant="outlined" startIcon={<Twitter/>} size="small">{app.contact.twitter?.replace(/^https?:\/\//,'')}</Button></a>
                        ):null}
            </div>
        </>
    )
}
export default ModalCompra