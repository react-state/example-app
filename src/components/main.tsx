import * as React from "react";

import { Link, Route, Router } from 'react-router-dom';

import { RouterHistory } from "./router-history";
import { StateHistoryComponent } from "react-state-rxjs";
import { Todos } from "./todos";
import { FormsComponent } from "./forms.component";
import { StorageComponent } from "./external-storage";

export class Main extends React.Component<any, undefined> {
    render() {

        const links =
            <nav className="nav">
               <li className="nav-item">
                    <Link className="nav-link" to="/" title="Todos">Todos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/router-history" title="Router history">Router history</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/forms" title="Forms">Forms</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/external-storage" title="External Storage">External Storage</Link>
                </li>
            </nav>

        return (
            <div>
                <div className="container">
                    <Router history={this.props.history}>
                        <div>
                            {links}
                            <Route exact path="/" component={Todos} />
                            <Route path="/router-history" component={RouterHistory} />
                            <Route path="/forms" component={FormsComponent} />
                            <Route path="/external-storage" component={StorageComponent} />
                        </div>
                    </Router>
                </div>
                <StateHistoryComponent routerHistory={this.props.history} />
            </div>
        )
    }
}