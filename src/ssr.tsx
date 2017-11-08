import * as React from "react";
import { renderToString } from 'react-dom/server';
import { ReactState } from "react-state-rxjs";
import { StaticRouter } from "react-router";
import { Main } from "../src/components/main";
import { initialState } from "../src/initial-state";

export class Render {
    static sendResponse(req: any, res: any, data: any) {
        ReactState.init((routerHistory: any) => {
            const ReactApp = renderToString(
                <StaticRouter location={req.url} context={{}}>
                    <Main history={routerHistory} />
                </StaticRouter>
            );
            const document = data.replace(/<div id="example"><\/div>/, `<div id="example">${ReactApp}</div>`);
            res.send(document).end()
        }, initialState, true, true);
    }
}