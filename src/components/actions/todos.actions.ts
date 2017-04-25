import * as Immutable from 'immutable';
import { HasStore, InjectStore,Store } from "react-state-rxjs";
import { TodoModel } from "./todo.model";

@InjectStore('todos')
export class TodosStateActions implements HasStore {

    store: Store<any>;
    state: any;

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

    get todosAsync() {
        return this.store.map((state) => {
            return state.toArray();
        });
    }
}