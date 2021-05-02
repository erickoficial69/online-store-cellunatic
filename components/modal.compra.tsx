import { useContext } from 'react'
import GlobalAppContext from '../context/app/app_state'

type Props = {
    setModal:(param:boolean)=>void
}

const ModalCompra = ({ setModal }: Props) => {
    const {appData}:any = useContext(GlobalAppContext)

    return (
        <>
        <div onClick={()=>setModal(false)} style={{ position: 'fixed', width: '100vw', height: '100vh',top:0,left:0,right:0,bottom:0, zIndex: 1000, background:'rgba(0,0,0, .8)' }} ></div>
            <div style={{ padding:'10px 5px', borderRadius:5,textAlign:'center', position: 'absolute',top:'25%',left:'calc(50% - 150px)',background:'rgb(20,20,20)', width: '300px', overflowX: 'hidden', overflowY: 'auto', zIndex: 1001 }}>
                <p style={{margin:'5px 0',textAlign:'center'}}>Ofertar a travez de:</p>

                {appData.contact.phone?(
                    <a href={`tel:${appData.contact.phone}`}><button style={{margin:'10px 0', width:'100%'}}  >{appData.contact.phone}</button></a>
                        ):null}

                {appData.contact.telegram?(
                    <a href={`tel:${appData.contact.telegram}`}><button style={{margin:'10px 0', width:'100%'}}  >{appData.contact.telegram}</button></a>
                        
                        ):null}

                {appData.contact.whatsapp?(
                    <a href={`tel:${appData.contact.whatsapp}`}><button style={{margin:'10px 0', width:'100%'}}  >{appData.contact.whatsapp}</button></a>
                        ):null}
                            
                {appData.contact.email?(
                    <a href={`mailto:${appData.contact.email}`}><button style={{margin:'10px 0', width:'100%'}}  >{appData.contact.email}</button></a>
                        ):null}

                {appData.contact.facebook?(
                    <a href={appData.contact.facebook?.replace('http','https')} target="_blank" rel="noopener noreferrer"><button style={{margin:'10px 0', width:'100%'}}  >{appData.contact.facebook?.replace(/^https?:\/\//,'')}</button></a>
                        ):null}

                {appData.contact.instagram?(
                    <a href={appData.contact.instagram?.replace('http','https')}><button style={{margin:'10px 0', width:'100%'}} >{appData.contact.instagram?.replace(/^https?:\/\//,'')}</button></a>
                        ):null}

                {appData.contact.twitter?(
                    <a href={appData.contact.twitter?.replace('http','https')} target="_blank" rel="noopener noreferrer"><button style={{margin:'10px 0', width:'100%'}} >{appData.contact.twitter?.replace(/^https?:\/\//,'')}</button></a>
                        ):null}
            </div>
        </>
    )
}
export default ModalCompra