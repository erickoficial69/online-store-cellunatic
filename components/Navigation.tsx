import Link from 'next/link'
import {useContext, useEffect, useMemo} from 'react'
import GlobalAppContext from '../context/app/app_state'
import ProductsList from './products.list'
import * as manifest from '../public/site.webmanifest.json'


const Navigation = () => {
    const { loaderCTRL, navBar, setNavBar, productos, getProductos }:any = useContext(GlobalAppContext)
   
    const sidebar_memo = useMemo(()=><ProductsList productos={productos.data} seccion="*" />,[productos])
    useEffect(()=>{
        getProductos()
    },[])
    return  navBar ?(
            <>
                <div onClick={()=>setNavBar(!navBar)} className="effect_menu"></div>
                <nav className="principal" onClick={()=>setNavBar(!navBar)} >
                    { 
                        <>
                            <h3>Cellunatic</h3>
                            <ul>
                                {manifest.shortcuts.map(path=>{
                                    return (
                                        <li key={path.short_name} onClick={() => loaderCTRL(path.url)} >
                                            <Link href={`${path.url}`} >
                                                <a>
                                                    {path.name}
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
            </>
                ):null
}
export default Navigation