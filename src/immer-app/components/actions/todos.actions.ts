import { HasStore, InjectStore } from '@react-state/store';
import { TodoModel } from "../../../todo.model";

@InjectStore('todos')
export class TodosStateActions extends HasStore<TodoModel[]> {

    addTodo(item: TodoModel) {
        this.store.update(state => {
            state.push(item);
        }, { message: "Item Added" })
    }

    deleteTodo(index: number) {
        this.store.update(state => {
            state.splice(index, 1);
        });
    }

    get todosAsync(): TodoModel[] {
        return this.store.map((state) => {
            return state;
        }) as any;
    }
}