// App initialization logic = global styles, providers and HOCs
import * as React from 'react'
import {withProviders} from "./providers";
import {Routing} from "pages";
import './index.scss'
import {DataFetcher} from 'entities/task'

const App = (): JSX.Element => {

    return <div>
        <DataFetcher/>
        <Routing/>
    </div>
}

export default withProviders(App)