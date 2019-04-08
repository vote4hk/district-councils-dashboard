import * as type from './types'

export function loadDCCAdata(payload) {
    return dispatch => {
        dispatch({
            type: type.LOAD_DCCA_DATA,
            payload
        })
    }
}