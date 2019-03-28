import { HasStore, InjectStore } from "react-state-rxjs";
import { Map } from 'immutable';

@InjectStore(['${stateIndex}'])
export class TodoStateActions  extends HasStore<Map<any, any>> {
    get todoDescriptionAsync() {
        return this.store.map((state) => {
            return state.get('description');
        });
    }
}