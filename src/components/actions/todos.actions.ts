import * as Immutable from 'immutable';
import { HasStore, InjectStore } from "react-state-rxjs";
import { TodoModel } from "./todo.model";
import { Observable } from "rxjs";

@InjectStore('todos')
export class TodosStateActions extends HasStore<Immutable.List<any>> {

    addTodo(item: TodoModel) {
        this.store.update(state => {
            state.push(Immutable.fromJS(item));
        })
    }

    deleteTodo(index: number) {
        this.store.update(state => {
            state.delete(index);
        }, false);
    }

    get todosAsync(): Observable<any>  {
        return this.store.map(state => {
            return state.toArray();
        });
    }
}