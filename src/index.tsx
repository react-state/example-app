import * as React from "react";
import * as ReactDOM from 'react-dom';

import { History } from 'history';
import { Main as ImmutableMain } from './immutablejs-app/components/main';
import { Main as ImmerMain } from './immer-app/components/main';
import { ReactState } from "@react-state/store";
import { initialState } from './initial-state';
import { ImmutableJsDataStrategy } from '@react-state/immutablejs-data-strategy';
import { ImmerDataStrategy } from '@react-state/immer-data-strategy';

const isProd = false;

if (window.location.search === '') {
    ReactState
        .debugger(true, { enableConsoleOutput: false, })
        .changeHistoryDefaultOptions({ storeHistoryItems: 5 })
        .addDataStrategy(ImmutableJsDataStrategy)
        .init((routerHistory: History) => {
            ReactDOM.render(<ImmutableMain history={routerHistory} />, document.getElementById('exampleapp'));
        }, initialState, isProd);
} else if (window.location.search === '?immer') {
    ReactState
        .debugger(true, { enableConsoleOutput: false, })
        .changeHistoryDefaultOptions({ storeHistoryItems: 5 })
        .addDataStrategy(ImmerDataStrategy)
        .init((routerHistory: History) => {
            ReactDOM.render(<ImmerMain history={routerHistory} />, document.getElementById('exampleapp'));
        }, initialState, isProd);
}