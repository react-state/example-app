import { HasStore, InjectStore } from '@react-state/store';
import { TodoModel } from '../../../todo.model';

@InjectStore(['${stateIndex}'])
export class TodoStateActions  extends HasStore<TodoModel> {
    get todoDescriptionAsync() {
        return this.store.map((state) => {
            return state.description;
        });
    }
}