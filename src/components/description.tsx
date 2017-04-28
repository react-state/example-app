import * as React from "react";

import { ComponentState, IComponentStateActions } from "react-state-rxjs";
import { TodoStateActions } from "./actions/todo.actions";

@ComponentState(TodoStateActions)
export class TodoDescription extends React.Component<any, any> implements IComponentStateActions<TodoStateActions> {
    actions: TodoStateActions;
    statePath: any;

    render(){
        return <div>{ this.actions.todoDescriptionAsync }</div>
    }
}