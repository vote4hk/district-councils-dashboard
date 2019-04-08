import * as type from '../actions/types'

export default function dccaReducer(state = {}, action) {
    switch (action.type) {
        case type.LOAD_DCCA_DATA:
            return {
                ...state,
                dccaList: action.payload
            }
        default:
            return state
    }
}