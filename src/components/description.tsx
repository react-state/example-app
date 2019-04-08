import * as React from "react";
import { ComponentState, ReactComponentWithStateActions } from "react-state-rxjs";
import { TodoStateActions } from "./actions/todo.actions";

@ComponentState(TodoStateActions)
export class TodoDescription extends ReactComponentWithStateActions<any, any, TodoStateActions> {
    render() {
        return <div>{this.actions.todoDescriptionAsync}</div>
    }
}