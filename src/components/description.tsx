import * as React from "react";

import { ComponentState } from "react-state-rxjs";
import { TodoStateActions } from "./actions/todo.actions";

@ComponentState(TodoStateActions)
export class TodoDescription extends React.Component<any, any> {
    actions: TodoStateActions;
    statePath: any;

    render(){
        return <div>{ this.actions.todoDescriptionAsync }</div>
    }
}