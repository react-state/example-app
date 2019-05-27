import { HasStore, InjectStore } from '@react-state/store';
import { takeUntil, tap, switchMap } from 'rxjs/operators';
import { timer, interval, iif, of } from 'rxjs';
import { AsyncDemoState } from '../../../initial-state';

@InjectStore('asyncDemo')
export class AsyncDemoStateActions extends HasStore<AsyncDemoState> {
    get progressAsync(): any {
        return this.store.select(['checkbox'])
            .pipe(
                switchMap(state => iif(() => !!state,
                    interval(20).pipe(
                        takeUntil(timer(4000).pipe(
                            tap(_ => {
                                this.store.update(state => {
                                    state.disabled = false;
                                });
                            }))
                        )),
                    of(0)
                ))
            )
    }

    get disabledAsync(): any {
        return this.store.map(state => state.disabled);
    }

    reset = () => {
        if (this.state.checkbox) {
            this.store.reset();
        }
    }
}