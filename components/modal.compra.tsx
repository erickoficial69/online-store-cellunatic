import { useContext, useEffect } from 'react'
import GlobalAppContext from '../context/app/app_state'

type Props = {
    setModal:(param:boolean)=>void
}

const ModalCompra = ({ setModal }: Props) => {
    const {appData,getAppData}:any = useContext(GlobalAppContext)

    useEffect(()=>{
        getAppData()
    },[])

    return (
        <>
        <div onClick={()=>setModal(false)} style={{ position: 'fixed', width: '100vw', height: '100vh',top:0,left:0,right:0,bottom:0, zIndex: 1000, background:'var(--primary-color)' }} ></div>
            <div style={{ padding:'10px 5px', borderRadius:5, position: 'fixed',top:'5%',bottom:'5%',left:'calc(50% - 150px)',background:'var(--primary-color)', border:'1px solid var(--font-color)',width: '300px', overflowX: 'hidden', overflowY: 'auto', zIndex: 1001 }}>
                <h4 style={{margin:'5px 0',textAlign:'center',width:'100%'}}>Ofertar a travez de:</h4>

                {appData.contact.phone?(
                    <a href={`tel:${appData.contact.phone}`}>
                        <b>Telefono</b>
                        <button>{appData.contact.phone}</button>
                    </a>
                        ):null}

                {appData.contact.telegram?(
                    <a href={`tel:${appData.contact.telegram}`}>
                        <b>Telegram</b>
                        <button>{appData.contact.telegram}</button>
                    </a>
                        
                        ):null}

                {appData.contact.whatsapp?(
                    <a href={`tel:${appData.contact.whatsapp}`}>
                        <b>Whatsapp</b>
                        <button>{appData.contact.whatsapp}</button>
                    </a>
                        ):null}
                            
                {appData.contact.email?(
                    <a href={`mailto:${appData.contact.email}`}>
                        <b>Correo</b>
                        <button>{appData.contact.email}</button>
                    </a>
                        ):null}

                {appData.contact.facebook?(
                    <a href={appData.contact.facebook?.replace('http','https')} target="_blank" rel="noopener noreferrer">
                        <b>Facebook</b>
                        <button>{appData.contact.facebook?.replace(/^https?:\/\//,'')}</button>
                    </a>
                        ):null}

                {appData.contact.instagram?(
                    <a href={appData.contact.instagram?.replace('http','https')}>
                        <b>Instagram</b>
                        <button>{appData.contact.instagram?.replace(/^https?:\/\//,'')}</button>
                    </a>
                        ):null}

                {appData.contact.twitter?(
                    <a href={appData.contact.twitter?.replace('http','https')} target="_blank" rel="noopener noreferrer">
                        <b>Twitter</b>
                        <button>{appData.contact.twitter?.replace(/^https?:\/\//,'')}</button>
                    </a>
                        ):null}

                        <button style={{margin:'20px auto'}} onClick={()=>setModal(false)} >Cerrar</button>
            </div>

            <style jsx>
                {
                    `
                    button{
                        border:unset;
                        border-radius:unset;
                        border-bottom:1px solid var(--secondary-color);
                        overflow:hidden;
                        width:150px;
                    }
                    button,p{
                        transition:all .3s linear;
                    }
                    a{
                        width:100%;
                        display:flex;
                        flex-flow: row wrap;
                        margin:10px 0;
                    }
                    b{
                        width:100px;
                        text-transfom:uppercase;
                        overflow:hidden;
                    }
                    a:hover > button{
                        width:100%;
                        border-color:var(--font-color);
                    }
                    a:hover > b{
                        width:100%;
                        color:var(--secondary-color);
                    }
                    `
                }
            </style>
        </>
    )
}
export default ModalCompra