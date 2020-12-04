// general

export const isDisabled = (state, action) => {
    if(state['disabled_all']) return true
    //
    return false
}



// getter

export const isNewCatenaryModalOpen = (state, catenary) => {
    return state['new_catenary_modal_open'] === catenary;
}





// setter

export const setNewCatenaryModalOpen = (dispatch, catenary, toggle) => {
    let $v = null
    if(toggle) $v = catenary
    return dispatch({type: 'SET', state: 'new_catenary_modal_open', value: $v});
}

export const set = (dispatch, state, value) => {
    return dispatch({type: 'SET', state, value});
}

export const setProjects = (dispatch, my_projects) => {
    return dispatch({type: 'SET_MY_PROJECTS', value: my_projects});
}

export const setMyTags = (dispatch, my_tags) => {
    return dispatch({type: 'SET_MY_TAGS', value: my_tags});
}

export const setLoading = (dispatch, value) => {
    return dispatch({type: 'SET_LOADING', value});
}