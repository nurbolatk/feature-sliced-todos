// App initialization logic = global styles, providers and HOCs
import * as React from 'react'
import { withProviders } from "./providers";
import { Routing } from "pages";
import './index.scss'

const App = () : JSX.Element => {
    return <div>
        <Routing />
    </div>
}

export default withProviders(App)