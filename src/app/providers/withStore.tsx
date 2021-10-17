import {ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "shared/store";

export const withStore = (component: () => ReactNode) => () => {
    return (
        <Provider store={store}>
            {component()}
        </Provider>
    )
}
