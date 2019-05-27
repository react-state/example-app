import { TodoModel } from './todo.model';

let initialState = {
    todos: <TodoModel[]>[],
    storage: <StorageState>{
        itemToStore: 'some value'
    },
    form: {
        condition: {
            new: true,
            used: false,
            notSpecified: true,
        },
        location: 'europe',
        address: 'Some Street 1a',
        cars: ['volvo', 'opel'],
        color: 'orange',
        description: 'car description',
        group: {
            complexElement: 'complex element value'
        }
    },
    asyncDemo: <AsyncDemoState>{
        checkbox: false,
        disabled: true
    }
};

export { initialState };

export interface AsyncDemoState {
    checkbox: boolean;
    disabled: boolean;
}

export interface StorageState {
    itemToStore: string;
}