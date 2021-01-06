import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { PersonPin, Storefront, BugReport, Smartphone } from '@material-ui/icons'
import { Context, User } from '../interfaces/interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
    context: Context
    openDrawer:boolean
    setOpenDrawer:(paran:boolean)=>void
}

const NavigationApp = ({ context, openDrawer, setOpenDrawer }: Props) => {
    const {appLocation, setAppLoader, verifySesion } = context
    
    const { push } = useRouter()
    const [user, setUser] = useState<User>({ correo: '', password: '' })

    useEffect(() => {
        const result = verifySesion()
        setUser(result)
    },[])

    return (
        <Drawer open={openDrawer} anchor="right" onClick={()=>setOpenDrawer(false)} >

            <Link href="/" >
                <Button style={{margin:'10px 0'}} onClick={() => {
                    if (appLocation !== "/") setAppLoader(true)

                }} >
                    <img style={{ margin: '0 5px' }} src="/favicon.ico" alt="cellunatic logo" width="24px" />
                    Cellunatic
                </Button>
            </Link>

            <List>
                <ListItem button onClick={() => {
                                if (appLocation !== "/accesorios") setAppLoader(true)
                                push("/accesorios")
                            }} >
                    <ListItemIcon><Storefront color="secondary" /></ListItemIcon>
                    <ListItemText style={{textTransform:'uppercase'}} >
                                accesorios
                    </ListItemText>
                </ListItem>
                <ListItem button onClick={() => {
                                if (appLocation !== "/repuestos") setAppLoader(true)
                                push("/repuestos")
                            }} >
                    <ListItemIcon><Storefront color="secondary"/></ListItemIcon>
                    <ListItemText style={{textTransform:'uppercase'}} >
                                repuestos
                    </ListItemText>
                </ListItem>
                <ListItem button onClick={() => {
                                if (appLocation !== "/telefonos") setAppLoader(true)
                                push("/telefonos")
                            }} >
                    <ListItemIcon><Smartphone color="secondary"/></ListItemIcon>
                    <ListItemText style={{textTransform:'uppercase'}} >
                                telefonos
                    </ListItemText>
                </ListItem>
                <ListItem button onClick={() => {
                                if (appLocation !== "/serviciotecnico") setAppLoader(true)
                                push("/serviciotecnico")
                            }} >
                    <ListItemIcon><BugReport color="secondary"/></ListItemIcon>
                    <ListItemText style={{textTransform:'uppercase'}} >
                                servicio tecnico
                    </ListItemText>
                </ListItem>
                {
                    user.rango && user.rango === "administrador" ? (
                        
                        <ListItem button onClick={() => {
                                        if (appLocation !== "/cpanel") setAppLoader(true)
                                        push("/cpanel")
                                    }} >
                            <ListItemIcon><PersonPin color="secondary"/></ListItemIcon>
                            <ListItemText style={{textTransform:'uppercase'}} >
                                        cpanel
                            </ListItemText>
                        </ListItem>
                    ) : (
                        <ListItem button onClick={() => {
                                        if (appLocation !== "/cpanel") setAppLoader(true)
                                        push("/cpanel")
                                    }} >
                            <ListItemIcon><PersonPin color="secondary"/></ListItemIcon>
                            <ListItemText style={{textTransform:'uppercase'}} >
                                        ingresar
                            </ListItemText>
                        </ListItem>
                    )
                }
            </List>
        </Drawer>
    )
}
export default NavigationApp