import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Rx from 'rxjs';

import { History } from 'history';
import { Main } from "./components/main";
import { ReactState } from "react-state-rxjs";
import { initialState } from './initial-state';

const isProd = false;

ReactState.init((routerHistory: History) => {
    ReactDOM.render(<Main history={routerHistory} />, document.getElementById("example"))
}, initialState, isProd)