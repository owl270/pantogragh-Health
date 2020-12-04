// general

export const isDisabled = (state, action) => {
    if(state['disabled_all']) return true
    if(!state['signals'].length){
        if(action==='sorting' || action==='select_all' || action==='download_signals'){
            return true
        }
    }
    else{
        if(!state['signals_selected'].length){
            if(action==='download_signals') return true
        }
    }
    return false
}



// getter







// setter

export const set = (dispatch, state, value) => {
    return dispatch({type: 'SET', state, value});
}

export const setDevice = (dispatch, index) => {
    return dispatch({type: 'SET_DEVICE', index});
}

export const setLoading = (dispatch, value) => {
    return dispatch({type: 'SET_LOADING', value});
}


export const setSignals = (dispatch, value) => {
    return dispatch({type: 'SET_SIGNALS', value});
}

export const setSorting = (dispatch, value) => {
    return dispatch({type: 'SET_SORTING', value});
}

export const setToolsOpen = (dispatch, id, value) => {
    return dispatch({type: 'OPEN_TOOL', id, value});
}

export const selectSignal = (dispatch, id, value) => {
    return dispatch({type: 'SELECT_SIGNAL', id, value});
}

export const selectAllSignal = (dispatch, value=null) => {
    return dispatch({type: 'SELECT_ALL_SIGNALS', value});
}


export const addToDownloadQueue = (dispatch, signal) => {
    return dispatch({type: 'ADD_DOWNLOAD_QUEUE', signal});
}

export const setInDownloading = (dispatch, qid) => {
    return dispatch({type: 'SET_IN_DOWNLOADING', qid});
}

export const downloadCompleted = (dispatch, qid) => {
    return dispatch({type: 'DOWNLOAD_COMPLETED', qid});
}

export const requestVideo = (dispatch, id) => {
    return dispatch({type: 'REQUEST_VIDEO', id});
}

export const requestedVideo = (dispatch, id) => {
    return dispatch({type: 'REQUESTED_VIDEO', id});
}




export const addNotification = (dispatch, value) => {
    return dispatch({type: 'ADD_NOTIFY', value});
}