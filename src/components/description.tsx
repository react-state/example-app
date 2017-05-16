import * as React from "react";
import { ComponentState, HasStateActions, ReactComponentWithStateActions } from "react-state-rxjs";
import { TodoStateActions } from "./actions/todo.actions";
import { Test } from './test'

@ComponentState(TodoStateActions)
export class TodoDescription extends ReactComponentWithStateActions<any, any, TodoStateActions> {
    render(){
        return <div>{ this.actions.todoDescriptionAsync }</div>
    }
}