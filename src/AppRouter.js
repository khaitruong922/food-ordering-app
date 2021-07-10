import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
        </BrowserRouter>
    )
}