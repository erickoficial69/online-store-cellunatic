import Link from 'next/link'
import {useContext, useMemo} from 'react'
import GlobalAppContext from '../context/app/app_state'
import { Seccion } from '../interfaces/interfaces'
import ProductsList from './products.list'


const Navigation = () => {
    const { loaderCTRL, navBar, setNavBar, productos, secciones }:any = useContext(GlobalAppContext)
   
    const sidebar_memo = useMemo(()=><ProductsList productos={productos.data} seccion="*" />,[productos])

    return (
            <>
                <div onClick={()=>setNavBar(!navBar)} className="effect_menu"></div>
                <nav className="principal" onClick={()=>setNavBar(!navBar)} >
                    { 
                        <>
                            <h3>Cellunatic</h3>
                            <ul>
                                {secciones.map((path:Seccion)=>{
                                    return (
                                        <li key={path.title} onClick={() => loaderCTRL(path.url)} >
                                            <Link href={`/${path.url}`} >
                                                <a>
                                                    {path.title}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })}

                                <li onClick={() => loaderCTRL('/cpanel')} >
                                    <Link href="/cpanel" >
                                        <a>
                                            Cpanel
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                            {sidebar_memo}
                        </>
                    }
                </nav>

                <style jsx global>{
                    `
                     /*Nav y aside*/
                        nav.principal,.effect_menu{
                            width:250px;
                            position: fixed;
                            height:100vh;
                            top:${navBar?'0':'100vh'};
                            left: 0;
                            bottom: 0;
                            overflow-y: auto;
                            overflow-x: hidden;
                            background: var(--primary-color);
                            transition:all .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        }
                        nav.principal,.effect_menu{
                            z-index: 13;
                        }
                        .effect_menu{
                            top:${navBar?'0':'-100vh'};
                            width: 100vw;
                            right:0;
                            background-color: rgba(0,0,0, .8);
                        }
                        aside{
                            display: none;
                            width:250px;
                            background:var(--primary-color);
                        }
                        aside > h3, nav.principal > h3{
                            height: var(--height-header);
                            line-height: var(--height-header);
                            text-transform: uppercase;
                            border-bottom: 1px solid var(--darken);
                            padding: 0 3px;
                        }
                        
                        aside a,nav.principal a{
                            display:block;
                            padding:8px 3px;
                            border-bottom:1px solid var(--secondary-color);
                            text-transform: uppercase;
                        }
                        aside > ul li:hover, nav.principal > ul li:hover{
                            background:var(--alfa);
                        }
                        @media(min-width:1024px){
                            aside{
                                display: block;
                                height:max-content;
                                position: fixed;
                            }
                        }
                    `
                }
                </style>
            </>
        )
                
}
export default Navigation