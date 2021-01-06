import { Button, Hidden, IconButton } from '@material-ui/core'
import { PersonPin, Menu, Storefront, BugReport, Smartphone } from '@material-ui/icons'
import { Context, User } from '../interfaces/interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavigationApp from './Navigation'

type Props={
    context:Context
}

const Header = ({context}:Props) => {
    const { appLocation, setAppLoader, verifySesion } = context
    const { push } = useRouter()
    const [user, setUser] = useState<User>({ correo: '', password: '' })
    const [openDrawer,setOpenDrawer] = useState<boolean>(false)

    useEffect(() => {
        const result = verifySesion()
        setUser(result)
    },[])

    return (
        <>

            <Link href="/" >
                <Button color="inherit" onClick={() => {
                    if (appLocation !== "/") setAppLoader(true)

                }} >
                    <img style={{ margin: '0 5px' }} src="/favicon.ico" alt="cellunatic logo" width="32px" />
                    Cellunatic
                </Button>
            </Link>
            <NavigationApp context={context} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
            <nav>

                <Hidden mdDown >
                    <Button startIcon={<Storefront />} onClick={() => {
                            if (appLocation !== "/accesorios") setAppLoader(true)
                            push("/accesorios")
                        }} >
                            Accesorios
                    </Button>
                </Hidden>

                <Hidden mdDown >
                    <Button startIcon={<Storefront />} onClick={() => {
                            if (appLocation !== "/repuestos") setAppLoader(true)
                            push("/repuestos")
                        }} >
                            repuestos
                    </Button>
                </Hidden>
                
                <Hidden mdDown >
                    <Button startIcon={<Smartphone />} onClick={() => {
                            if (appLocation !== "/telefonos") setAppLoader(true)
                            push("/telefonos")
                        }} >
                            telefonos
                    </Button>
                </Hidden>
                <Hidden mdDown >
                    <Button startIcon={<BugReport />} onClick={() => {
                            if (appLocation !== "/serviciotecnico") setAppLoader(true)
                            push("/serviciotecnico")
                        }} >
                            servicio tecnico
                    </Button>
                </Hidden>
                {
                    user.rango && user.rango === "administrador" ? (
                        
                            <Hidden mdDown >
                                <Button startIcon={<PersonPin />} onClick={() => {
                                        if (appLocation !== "/cpanel") setAppLoader(true)
                                        push("/cpanel")
                                    }} >
                                        cpanel
                                </Button>
                            </Hidden>
                    ) : (
                            <Hidden mdDown >
                                <Button startIcon={<PersonPin />} onClick={() => {
                                        if (appLocation !== "/cpanel") setAppLoader(true)
                                        push("/cpanel")
                                    }} >
                                    Ingresar
                                </Button>
                            </Hidden>
                        )
                }

                <Hidden lgUp >
                    <IconButton onClick={()=>setOpenDrawer(true)}>
                        <Menu />
                    </IconButton>
                </Hidden>
            </nav>
        </>
    )
}
export default Header