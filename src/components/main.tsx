import * as React from "react";

import { Link, Route, Router } from 'react-router-dom';

import { RouterHistoryTest } from "./router-history-test";
import { StateHistoryComponent } from "react-state-rxjs";
import { Todos } from "./todos";

export class Main extends React.Component<any, undefined> {
    render() {

        const links =
            <nav className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/" title="Todos">Todos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/router-history-test" title="Router history Test">Router history Test</Link>
                </li>
            </nav>

        return (
            <div>
                <div className="container">
                    <Router history={this.props.history}>
                        <div>
                            {links}
                            <Route path="/router-history-test" component={RouterHistoryTest} />
                            <Route exact path="/" component={Todos} />
                        </div>
                    </Router>
                </div>
                <StateHistoryComponent routerHistory={this.props.history} />
            </div>
        )
    }
}