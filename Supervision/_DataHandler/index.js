import * as actionTypes from "./_actions";
import initialState from "./_initialState"
import update from "react-addons-update";
import * as moment from "moment";


const reducer = (state = initialState, action) => {

    var {element, value, ID, param, queue, figure} = action

    let $state = {...state}
    switch (action.type) {
        case actionTypes.SET:
            $state[action.state] = action.value
            break



        case actionTypes.UNMOUNT:
            $state = {
                ...$state,
                loading: false,
                showing_number: 0,
                interval_time: 1000,
                figure_properties: null,
                videos: [],
                map_points: [],
                figures: [],
                video_blob: '',
                playing: false,
                current_time: 0,
                request_video: null,
            }

            break


        case actionTypes.MOUNT:
            $state = {
                ...$state,
                showing_number: 0,
                interval_time: 1000,
                figure_properties: null,
                videos: [],
                map_points: [],
                figures: [],
                video_blob: '',
                playing: false,
                current_time: 0,
                request_video: null,
            }

            break


        case actionTypes.ADD_FIGURE:
            $state.figures = update($state.figures, {$push: [figure]})
            break

        case actionTypes.REMOVE_FIGURE:
            $state.figures = update($state.figures, {$splice: [[figure, 1]]})
            break


        default:
            break
    }


    return $state

};

export default reducer;