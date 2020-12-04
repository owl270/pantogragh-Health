import initialState from "./_initialState"

import update from "react-addons-update";



const reducer = (state = initialState, action) => {
    let $state = {...state}

    const set = (_state, _value) => {
        $state[_state] = _value
    }

    const setArray = (_state, _value, _element) => {
        $state[_state] = update($state[_state], {[_element]: {$set: _value}})
    }

    const pushArray = (_state, _value) => {
        $state[_state] = update($state[_state], {$push: _value})
    }

    const spliceArray = (_state, _element) => {
        $state[_state] = update($state[_state], {$splice: [[_element, 1]]})
    }


    // if(actions.isDisabled($state, action)) return $state;

    switch (action.type) {

        case 'SET':
            set(action.state, action.value);
            break;

        case 'SET_ARRAY':
            setArray(action.state, action.value, action.element);
            break;

        case 'PUSH_ARRAY':
            setArray(action.state, action.value, action.element);
            break;

        case 'SPLICE_ARRAY':
            spliceArray(action.state, action.value, action.element);
            break;

        case 'ADD_NOTIFY':
            pushArray('notifications', [action.value])
            break;

        case 'SET_DEVICE':
            const $dt = $state['device_trips'][action.index]
            console.log($dt)
            set('device_index', action.index);
            set('device', $dt.device_id);
            set('device_name', $dt.device);
            set('train', $dt.train_id);
            set('train_name', $dt.train);
            break;


        case 'SET_LOADING':
            set('loading', action.value)
            set('disabled_all', action.value)
            break;


        case 'SET_SIGNALS':
            set('signals', action.value)
            set('toolsOpen', null)
            set('signals_selected', [])

            set('download_queue', [])
            set('_in_downloading', null)
            set('_completed_download', null)
            set('_in_queue', [])

            set('request_video', [])
            set('requested_videos', [])
            set('uploaded_videos', [])
            set('not_recorded_videos', [])
            break;


        case 'SET_SORTING':
            set('sorting', action.value)
            break;

        case 'OPEN_TOOL':
            if(action.value) set('toolsOpen', action.id);
            else set('toolsOpen', null);
            break;


        case 'SELECT_SIGNAL':
            if (action.value) {
                pushArray('signals_selected', [action.id])
            }
            else {
                const selected = $state.signals_selected.indexOf(action.id)
                spliceArray('signals_selected', selected)
            }
            break

        case 'SELECT_ALL_SIGNALS':
            if(action.value===null) {
                if ($state.signals_selected.length > 0) {
                    $state.signals_selected = []
                } else {
                    $state.signals_selected = [...$state.signals.keys()]
                }
            }
            else if(action.value===true){
                $state.signals_selected = [...$state.signals.keys()]
            }
            else{
                $state.signals_selected = []
            }

            break



        case 'ADD_DOWNLOAD_QUEUE':
            if (typeof action.signal !== "object") action.signal = [action.signal]
            let shQu = action.signal
            if (shQu.length > 0) {
                pushArray('download_queue', [shQu])
                pushArray('_in_queue', shQu)
            }
            break

        case 'SET_IN_DOWNLOADING':
            $state._in_downloading = action.qid
            break

        case 'DOWNLOAD_COMPLETED':
            $state._completed_download = action.qid
            const gg = $state['download_queue'][action.qid]
            $state._in_queue = $state._in_queue.filter((val, index) => {
                return !gg.includes(val)
            })
            break



        case 'REQUEST_VIDEO':
            pushArray('request_video', [action.id])
            break

        case 'REQUESTED_VIDEO':
            pushArray('requested_videos', [action.id])
            break


        default:
            break
    }


    return $state

};

export default reducer;