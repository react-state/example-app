import * as React from "react";
import { PersistStateManager, ComponentState, Store } from "react-state-rxjs";
import { timer } from "rxjs";
import { tap, map } from "rxjs/operators";
import { StorageStateActions } from "./actions/stroage.actions";

@ComponentState(StorageStateActions)
export class StorageComponent extends React.Component {

    actions: StorageStateActions;
    statePath: any;

    constructor(props) {
        super(props);
        PersistStateManager.configureStorage({
            clear: () => timer(2000).pipe(tap(_ => localStorage.clear())),
            getItem: (key: string) => timer(2000).pipe(map(_ => localStorage.getItem(key))),
            removeItem: (key: string) => timer(2000).pipe(tap(_ => localStorage.removeItem(key))),
            setItem: (key: string, value: any) => timer(2000).pipe(tap(_ => localStorage.setItem(key, value))),
        }, () => timer(2000).pipe(map(_ => Object.keys(localStorage))));
    }

    add() {
        this.actions.add();
        this.saveOtherStateToSessionStorage();
    }

    private saveOtherStateToSessionStorage() {
        Store.store.select(['todos']).storage.save({ storageConfig: { storage: sessionStorage, getKeys: () => Object.keys(sessionStorage) } });
    }

    remove() {
        this.actions.remove();
    }

    clear() {
        this.actions.clear();
    }

    load() {
        this.actions.load();
    }

    change() {
        this.actions.change();
    }

    render() {
        return (
        <div>
            ItemToStore value: {this.actions.deeperItem}<br /><br />
            <button onClick={this.add.bind(this)}>add</button>
            <button onClick={this.remove.bind(this)}>remove</button>
            <button onClick={this.clear.bind(this)}>clear</button>
            <button onClick={this.load.bind(this)}>load</button>
            <button onClick={this.change.bind(this)}>change</button>
          </div>
          )
    }
}