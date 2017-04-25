import { HasStore, InjectStore, Store } from "react-state-rxjs";

@InjectStore(['${stateIndex}'])
export class TodoStateActions implements HasStore {

    store: Store<any>;

    get todoDescriptionAsync() {
        return this.store.map((state) => {
            return state.get('description');
        });
    }
}