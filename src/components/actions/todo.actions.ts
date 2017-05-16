import { HasStore, InjectStore } from "react-state-rxjs";
import * as Immutable from 'immutable';

@InjectStore(['${stateIndex}'])
export class TodoStateActions  extends HasStore<Immutable.Map<any, any>> {
    get todoDescriptionAsync() {
        return this.store.map((state) => {
            return state.get('description');
        });
    }
}