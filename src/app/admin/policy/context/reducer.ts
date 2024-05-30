enum ActionTypes {
    // used to add an object at the end of the array
    CREATE = 'CREATE',
    // update object based on 'property' argument ('id' is default)  
    UPDATE = 'UPDATE',
    // delete object from array based on 'property' argument ('id' is default)  
    DELETE = 'DELETE',
    // set state from the argument but also keeping the old state
    MASS_UPDATE = 'MASS_UPDATE',
    // used for primitive and reference types to set value on a specific propert
    SET = 'SET'
}

interface IAction<T> {
    type: ActionTypes;
    payload: {
        key: keyof T;
        identifier?: { key?: string, value: string };
        item?: any;
    };
}

const CREATE = ActionTypes.CREATE;

const UPDATE = ActionTypes.UPDATE;

const DELETE = ActionTypes.DELETE;

const MASS_UPDATE = ActionTypes.MASS_UPDATE;

const SET = ActionTypes.SET;

function validateDuplication(selectedArray: any[], item: any) {

    if (selectedArray instanceof Array && selectedArray.map((item) => item.id).includes(item.id)) {
        throw new Error('Error: Entiteti qe po kerkoni te shtoni eshte ekzistent dhe nuk mund ta duplikoni!')
    }
}

function reducer<T>(state: T, action: IAction<T>): T {

    const { type, payload } = action;

    const { key, item, identifier = { key: 'id', value: '' } } = payload;

    const selectedArray = state[key] as Array<any>

    switch (type) {

        case CREATE:
            validateDuplication(selectedArray, item);
            return { ...state, [key]: [...selectedArray, item] };

        case UPDATE:
            validateDuplication(selectedArray, item);
            return {
                ...state, [key]: [...selectedArray.map((_item) => {
                    if (_item[identifier.key ?? 'id'] === identifier.value) {
                        return item;
                    }

                    return _item;
                })]
            };

        case DELETE:
            return { ...state, [key]: [...selectedArray.filter((item) => item[identifier.key ?? 'id'] !== identifier.value)] };

        case MASS_UPDATE:
            return { ...state, ...item };

        case SET:
            return { ...state, [key]: item };

        default:
            throw new Error(`Action Type: ${type} not supported!`);
    }
};


export {
    reducer,
    CREATE,
    UPDATE,
    DELETE,
    MASS_UPDATE,
    SET,
}

export type {
    IAction,
    ActionTypes
}