import Link from 'next/link'
import {useContext} from 'react'
import GlobalAppContext from '../context/app/app_state'
import { SearchBar } from './SearchBar'

const Header = () => {
    const { setSidebar, loaderCTRL, navBar, setNavBar }:any = useContext(GlobalAppContext)
    return (
        <header>
            <div className="container header_barr">

                <Link href="/" >
                    <a className="logo" onClick={() => loaderCTRL('/')} >
                        <img style={{ margin: '0 5px' }} src="/favicon.ico" alt="cellunatic logo" width="32px" />
                        <b>Cellunatic</b>
                    </a>
                </Link>

                <SearchBar />
                
                <div className="nav_header">
                    <button className="btn_filter" onClick={()=>{setNavBar(!navBar);setSidebar(true)}} >fill</button>
                    
                    <Link href="/cpanel" >
                        <button onClick={()=>loaderCTRL('/cpanel')} className="btn_login" >Cpanel</button>
                    </Link>
                    
                    <button onClick={()=>{setNavBar(!navBar);setSidebar(false)}} >menu</button>
                </div>
            </div>

        </header>
    )
}
export default Header