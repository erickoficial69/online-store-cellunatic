import { useRouter } from "next/router";
import { destroySesion } from "../controllers/usuarios.controllers";
import Link from 'next/link'

type Admin_Menu_params={
    setModal:(param:string | boolean)=>void
    tasaCambio:{
        monto:number
    }
}

export const Admin_menu = ({setModal,tasaCambio}:Admin_Menu_params)=>{
    const {push} = useRouter()

    return (
        <ul className="admin_nav" >
            <li onClick={() => setModal('update_tasa_cambio')}>
                1$ = {tasaCambio.monto} bs
            </li>
            <li onClick={() => setModal('manage_productos')} >
                Nuevo Producto
            </li>
            <li onClick={() => setModal('manage_secciones')} >
                Nuevo Seccion
            </li>
            <li onClick={() => setModal('create_accesorio')} >
                Nuevo Accesorio
            </li>
            <li onClick={() => setModal('create_repuesto')} >
                Nuevo Repuesto
            </li>
            <li>
                <Link href="/cpanel/config" ><a>Config</a></Link>
            </li>
            <li onClick={() => {destroySesion(); push('/login')}}>
                Cerrar Sesion
            </li>
        </ul>
    )
}
