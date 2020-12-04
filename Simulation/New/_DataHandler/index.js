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

        case 'SET_NEW_CATENARY':
            set('new_catenary_props', action.value);
            set('new_catenary_modal_open', null);
            break;

        case 'SET_MY_PROJECTS':
            set('my_projects', action.value);
            break;

        case 'SET_MY_TAGS':
            set('my_tags', action.value);
            break;

        case 'SET_LOADING':
            set('card_loading', action.value);
            set('disabled_all', action.value);
            break;

        case 'SET_ARRAY':
            setArray(action.state, action.value, action.element);
            break;




        default:
            break
    }


    return $state

};

export default reducer;