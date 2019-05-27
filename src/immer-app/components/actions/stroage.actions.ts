import { HasStore, InjectStore } from '@react-state/store';
import { StorageState } from '../../../initial-state';

@InjectStore(['storage'])
export class StorageStateActions extends HasStore<StorageState> {
    add() {
        return this.store.storage.save();
    }

    remove() {
        this.store.storage.remove();
    }

    clear() {
        this.store.storage.clear();
    }

    load() {
        this.store.storage.load();
    }

    change() {
        this.store.update(state => {
            state.itemToStore = 'changed value';
        });
    }

    get deeperItem() {
        return this.state.itemToStore;
    }
}