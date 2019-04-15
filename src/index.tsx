import * as React from "react";

import { hydrate } from "react-dom"
import { History } from 'history';
import { Main } from "./components/main";
import { ReactState } from "react-state-rxjs";
import { initialState } from './initial-state';

const isProd = false;

ReactState
    .debugger(true, { enableConsoleOutput: false })
    .changeHistoryDefaultOptions({ collectHistory: false })
    .init((routerHistory: History) => {
        hydrate(<Main history={routerHistory} />, document.getElementById("example"))
    }, initialState, isProd);