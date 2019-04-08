import * as type from '../actions/types'


export default function mapReducer(state = {}, action) {
    switch (action.type) {
        case type.PAN_MAP:
            return {
                ...state,
                ...action.payload
            }
        case type.CLICK_MAP:
            return {
                ...state,
                lastClick: {
                    lng: action.payload.lng,
                    lat: action.payload.lat
                }
            }
        case type.CLICK_DCCA:
            return {
                ...state,
                selectedFeature: action.payload
            }
        default:
            return state
    }
}