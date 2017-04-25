import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Rx from 'rxjs';

import { History } from 'history';
import { Main } from "./components/main";
import { ReactState } from "react-state-rxjs";
import { initialState } from './initial-state';

ReactState.init((state: any, routerHistory: History) => {
    ReactDOM.render(<Main history={routerHistory} />, document.getElementById("example"))
}, initialState)