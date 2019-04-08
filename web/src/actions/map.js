import * as type from './types'

export function panMap(payload) {
    return dispatch => {
        dispatch({
            type: type.PAN_MAP,
            payload
        })
    }
}

export function clickMap(payload) {
    return dispatch => {
        dispatch({
            type: type.CLICK_MAP,
            payload
        })
    }
}

export function clickDCCA(payload) {
    return dispatch => {
        dispatch({
            type: type.CLICK_DCCA,
            payload
        })
    }
}