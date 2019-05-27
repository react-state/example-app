import { fromJS, List, Map } from 'immutable';
import { HasStore, InjectStore } from '@react-state/store';
import { TodoModel } from '../../../todo.model';

@InjectStore('todos')
export class TodosStateActions extends HasStore<List<any>> {

    addTodo(item: TodoModel) {
        this.store.update(state => {
            state.push(fromJS(item));
        }, { message: "Item Added" })
    }

    deleteTodo(index: number) {
        this.store.update(state => {
            state.delete(index);
        });
    }

    get todosAsync(): List<Map<any, any>> {
        return this.store.map((state) => {
            return state.toArray();
        }) as any;
    }
}