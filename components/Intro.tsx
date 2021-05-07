import Link from 'next/link'
import { useContext } from 'react'
import GlobalAppContext from '../context/app/app_state'
import { Seccion } from '../interfaces/interfaces'

const Intro = ()=>{
    const {loaderCTRL, secciones}:any = useContext(GlobalAppContext)
    return <article className="intro" >

                <img loading="lazy" src="/logo192x192.png" alt="Cellunatic logo" />

                <div>
                    <h1 className="coursive" >Cellunatic 2017 CG C.A</h1>
                    <p >Gente que Responde!</p>
                </div>

                <nav className="botonera" style={{ width: '100%', textAlign: 'center' }} >
                    {secciones.map((seccion:Seccion)=><Link key={seccion.title} href={`/${seccion.url}`} ><button onClick={()=>loaderCTRL(`/${seccion.url}`)} >{seccion.title}</button></Link>
                    )}
                </nav>
        </article>
}

export default Intro