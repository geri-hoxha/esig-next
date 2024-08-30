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


export function isParticipantsArray(
    participants: any
): participants is Array<{ id: string }> {
    // Check if it's an array and all elements in the array have an 'id' property
    return (
        Array.isArray(participants) &&
        participants.every(
            (participant) => typeof participant === "object" && "id" in participant
        )
    );
}

function reducer<T>(state: T, action: IAction<T>): T {

    const { type, payload } = action;

    const { key, item, identifier = { key: 'id', value: '' } } = payload;

    const selectedArray: any = state[key] as Array<any>

    switch (type) {

        case CREATE:

            if (isParticipantsArray(selectedArray)) {

                const ids = selectedArray.map((item) => {
                    if (item.id) return item.id;
                    return {};
                });

                if (ids.includes(action.payload.item?.id)) {
                    throw new Error(
                        `${action.payload.item.displayName} eshte ekzistent dhe nuk mund te duplikohet. Veprimi u anullua!`
                    );
                }

            }

            return { ...state, [key]: [...selectedArray, item] };

        case UPDATE:
            return {
                ...state, [key]: [...selectedArray.map((_item: any) => {
                    if (_item[identifier.key ?? 'id'] === identifier.value) {
                        return item;
                    }

                    return _item;
                })]
            };

        case DELETE:
            return { ...state, [key]: [...selectedArray.filter((item: any) => item[identifier.key ?? 'id'] !== identifier.value)] };

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
    ActionTypes
}

export type {
    IAction,
}