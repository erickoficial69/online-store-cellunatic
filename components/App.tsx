import { AppBar, Toolbar, CircularProgress, Backdrop, createMuiTheme, ThemeProvider,colors } from '@material-ui/core'
import Head from 'next/head'
import ProviderApp, { Consumer } from '../context/Store.app'
import Header from './Header'
import { Context } from '../interfaces/interfaces'
import Footer from './Footer'
const {green,blue,orange} = colors

const theme = createMuiTheme({
    palette:{
        background:{
            default:'rgb(20,20,20)',
            paper:'rgb(20,20,20)'
        },
        primary:{
            main:'rgb(20,20,20)',
            dark:'rgb(0,0,0)',
            light:'rgb(50,50,50)',
            contrastText:'rgb(250,250,250)'
        },
        secondary:{
            main:blue[700],
            dark:blue[900],
            light:blue[500],
            contrastText:'rgb(250,250,250)'
        },
        text:{
            primary:'rgb(250,250,250)',
            secondary:blue[900],
            disabled:'rgb(250,250,250)',
            hint:'rgb(250,250,250)'
        },
        success:{
            main:green[900]
        },
        warning:{
            main:orange[900]
        },
        type:'dark'
    }
})


const Template = (Page: any) => {

    return (props: any) => (
        <ProviderApp>
            <Consumer>
                {(context: any) => {
                    const { appLoader }: Context = context
                    return (
                        <ThemeProvider theme={theme}>
                            <Head>
                                <link rel="stylesheet" href="/index.css" />
                                <link rel="manifest" href="/site.webmanifest.json" />

                                <meta name="description" content="Cellunatic, tienda de accesorios, repuestos y servicio técnico profesional en telefonía móvil y dispositivos móviles" />

                                <meta name="keywords" content="accesorios,repuestos,telefonia movil,servicio técnico,dispositivos móviles" />
                                <meta name="author" content="Diaz web app" />

                                <link rel="apple-touch-icon" href="/logo512x512.png" />
                                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

                            </Head>

                            <AppBar component="header" >
                                <Toolbar style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}  >
                                    <Header {...props} context={context} />
                                </Toolbar>
                            </AppBar>
                            <Backdrop open={appLoader ? true : false} style={{ zIndex: 2000 }} >
                                <CircularProgress color="secondary" />
                            </Backdrop>
                            <Page {...props} context={context} />
                            <Footer context={context}/>
                        </ThemeProvider>
                    )
                }}
            </Consumer>
        </ProviderApp>
    )
}

export default Template