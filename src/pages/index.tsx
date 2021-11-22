import {lazy} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

const TaskListPage = lazy(() => import("./task-list"));
const TaskDetailsPage = lazy(() => import("./task-details"));
const KitchenSinkPage = lazy(() => import("./kitchen-sink"));

export const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={TaskListPage}/>
            <Route exact path="/kitchen-sink" component={KitchenSinkPage}/>
            <Route exact path="/:id" component={TaskDetailsPage}/>

            <Redirect to="/"/>
        </Switch>
    );
};