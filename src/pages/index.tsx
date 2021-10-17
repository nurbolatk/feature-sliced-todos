import {lazy} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

const TaskListPage = lazy(() => import("./task-list"));
const TaskDetailsPage = lazy(() => import("./task-details"));

export const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={TaskListPage}/>
            <Route exact path="/:id" component={TaskDetailsPage}/>
            <Redirect to="/"/>
        </Switch>
    );
};