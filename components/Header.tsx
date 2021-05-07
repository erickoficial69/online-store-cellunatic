import Link from 'next/link'
import {useContext} from 'react'
import GlobalAppContext from '../context/app/app_state'
import { SearchBar } from './SearchBar'

const Header = () => {
    const {  loaderCTRL, navBar, setNavBar }:any = useContext(GlobalAppContext)
    return (
        <header>
            <div className="container header_barr">

                <Link href="/" >
                    <a className="logo" onClick={() => loaderCTRL('/')} >
                        <img style={{ margin: '0 5px' }} src="/favicon.ico" alt="cellunatic logo" width="32px" height="32px" />
                        <b>Cellunatic</b>
                    </a>
                </Link>

                <SearchBar />
                
                <div className="nav_header">
                    <Link href="/cpanel" >
                        <button onClick={()=>loaderCTRL('/cpanel')} className="btn_login" >Cpanel</button>
                    </Link>
                    
                    <button onClick={()=>setNavBar(!navBar)} >menu</button>
                </div>
            </div>

        </header>
    )
}
export default Header