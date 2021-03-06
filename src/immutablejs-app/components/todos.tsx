import * as React from "react";

import { ComponentState, ReactComponentWithStateActions } from '@react-state/store';
import { TodoDescription } from "./description";
import { TodosStateActions } from "./actions/todos.actions";
import { TodoModel } from "../../todo.model";

@ComponentState(TodosStateActions)
export class Todos extends ReactComponentWithStateActions<any, any, TodosStateActions> {
    description: HTMLInputElement;
    name: HTMLInputElement;

    render() {
        const todoItems = this.actions.todosAsync.map((item, index) => {
            return (<tr key={item.toString() + index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{item.get('name')}</td>
                <td><TodoDescription key={item.toString() + index + 1} statePath={this.statePath} stateIndex={index} /></td>
                <td><button className="btn btn-danger" onClick={() => this.deleteItem(index)}>X</button></td>
            </tr>)
        });

        return (

            <div className="container">
                <form className="form-inline">
                    <label className="sr-only" htmlFor="inlineFormInput">Name</label>
                    <input type="text" name="name" ref={input => this.name = input} className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Name" />

                    <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                    <input type="text" name="description" ref={input => this.description = input} className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Description" />

                    <button type="button" className="btn btn-primary" onClick={() => this.addItem()}>Submit</button>
                </form>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoItems}
                    </tbody>
                </table>
            </div>
        )
    }

    deleteItem(index: number) {
        this.actions.deleteTodo(index);
    }

    addItem() {
        this.actions.addTodo({ name: this.name.value, description: this.description.value } as TodoModel);
        this.name.value = '';
        this.description.value = '';
    }
}