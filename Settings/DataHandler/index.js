import * as actionTypes from './_actions';
import initialState from './_initialState';

import update from 'react-addons-update';
import * as moment from 'moment';

export const isDisabled = (state, item) => {
  if (state['loading']) return true;

  if (item === 'section_distance') {
    if (state.section.type !== 'by_distance') {
      return true;
    }
  } else if (item === 'section_time') {
    if (state.section.type !== 'by_time') {
      return true;
    }
  } else if (item === 'download_signals') {
    if (state.signal_list.length === 0 || state.signals_selected.length === 0) {
      return true;
    }
  } else if (item === 'sorting') {
    if (state.signal_list.length === 0) {
      return true;
    }
  } else if (item === 'select_all') {
    if (state.signal_list.length === 0) {
      return true;
    }
  }
  return false;
};

export const isFocused = (state, item) => {
  if (!state.device_id) {
    if (item === 'device_list') return true;
  }
  return state['focused_item'] === item;
};

const reducer = (state = initialState, action) => {
  let $state = { ...state };

  let { queue } = action;

  const set = (_state, _value) => {
    $state[_state] = _value;
  };

  const setArray = (_state, _value, _element) => {
    $state[_state] = update($state[_state], { [_element]: { $set: _value } });
  };

  const pushArray = (_state, _value) => {
    $state[_state] = update($state[_state], { $push: _value });
  };

  const spliceArray = (_state, _element) => {
    $state[_state] = update($state[_state], { $splice: [[_element, 1]] });
  };

  const addUserChange = (item) => {
    pushArray('user_changes', [item]);
  };

  const changeMapPoints = (id, points) => {
    $state['signal_list'] = update($state['signal_list'], {
      [id]: { points: { $set: points } }
    });
  };

  const addNotification = (action) => {
    let $id = action.id;
    let done = false;
    if ($id) {
      if ($state.notifications_keys.includes($id)) {
        const index = $state.notifications_keys.indexOf($id);
        $state['notifications'] = update($state['notifications'], {
          [index]: { emphasize: { $set: [true] } }
        });
        done = true;
      }
    } else $id = 'notify_' + new Date().getTime();

    if (!done) {
      pushArray('notifications', [action.notification]);
      pushArray('notifications_keys', [$id]);
    }
  };

  switch (action.type) {
    case actionTypes.SET:
      set(action.state, action.value);
      break;

    case actionTypes.SET_ARRAY:
      setArray(action.state, action.value, action.element);
      break;

    case actionTypes.PUSH_ARRAY:
      pushArray(action.state, action.value);
      break;

    case actionTypes.CHANGE_TRAIN:
      if (action.value !== $state.train_id) {
        let train = $state.train_list.filter((item) => {
          return Object.keys(item).some((key) => {
            return action.value === item[key];
          });
        })[0];
        set('train_id', train.value);
        set('train_name', train.name);
        addUserChange('train');
      }

      break;

    case actionTypes.CHANGE_DEVICE:
      if (action.value !== $state.device_id) {
        let device = $state.device_list.filter((item) => {
          return Object.keys(item).some((key) => {
            return action.value === item[key];
          });
        })[0];
        set('device_id', device.value);
        set('device_name', device.name);
        addUserChange('device');
      }
      break;

    case actionTypes.CHANGE_POSITION:
      set('position', action.value);
      break;

    case actionTypes.CHANGE_SECTION_TYPE:
      if (action.value !== $state.section.type) {
        if (action.value === 'by_distance') {
          addNotification({
            id: 'distance_section_disabled',
            notification: {
              type: 'warning',
              children: 'This feature is disabled'
            }
          });
        } else {
          setArray('section', action.value, 'type');
          addUserChange('section_type');
        }
      }

      break;

    case actionTypes.CHANGE_POINT_YELLOW:
      if (action.value !== $state.point.yellow) {
        setArray('point', action.value, 'yellow');
        addUserChange('point_yellow');
      }
      break;

    case actionTypes.CHANGE_POINT_WHITE:
      if (action.value !== $state.point.white) {
        setArray('point', action.value, 'white');
        addUserChange('point_white');
      }
      break;

    case actionTypes.CHANGE_POINT_RED:
      if (action.value !== $state.point.red) {
        setArray('point', action.value, 'red');
        addUserChange('point_red');
      }
      break;

    case actionTypes.CHANGE_REGION_RED:
      if (action.value !== $state.region.red) {
        setArray('region', action.value, 'red');
        addUserChange('region_red');
      }
      break;

    case actionTypes.CHANGE_REGION_WHITE:
      if (action.value !== $state.region.white) {
        setArray('region', action.value, 'white');
        addUserChange('region_white');
      }
      break;

    case actionTypes.CHANGE_REGION_YELLOW:
      if (action.value !== $state.region.yellow) {
        setArray('region', action.value, 'yellow');
        addUserChange('region_yellow');
      }
      break;

    case actionTypes.CHANGE_UP_RED:
      if (action.value !== $state.height.redUp) {
        setArray('height', action.value, 'redUp');
        addUserChange('height_redUp');
      }
      break;

    case actionTypes.CHANGE_UP_WHITE:
      if (action.value !== $state.height.whiteUp) {
        setArray('height', action.value, 'whiteUp');
        addUserChange('height_whiteUp');
      }
      break;

    case actionTypes.CHANGE_UP_YELLOW:
      if (action.value !== $state.height.yellowUp) {
        setArray('height', action.value, 'yellowUp');
        addUserChange('height_yellowUp');
      }
      break;

    case actionTypes.CHANGE_DOWN_RED:
      if (action.value !== $state.height.redDown) {
        setArray('height', action.value, 'redDown');
        addUserChange('height_redDown');
      }
      break;

    case actionTypes.CHANGE_DOWN_WHITE:
      if (action.value !== $state.height.whiteDown) {
        setArray('height', action.value, 'whiteDown');
        addUserChange('height_whiteDown');
      }
      break;

    case actionTypes.CHANGE_DOWN_YELLOW:
      if (action.value !== $state.height.yellowDown) {
        setArray('height', action.value, 'yellowDown');
        addUserChange('height_yellowDown');
      }
      break;

    case actionTypes.CHANGE_RIGHT_RED:
      if (action.value !== $state.zig_zag.redRight) {
        setArray('zig_zag', action.value, 'redRight');
        addUserChange('zig_zag_redRight');
      }
      break;

    case actionTypes.CHANGE_RIGHT_WHITE:
      if (action.value !== $state.zig_zag.whiteRight) {
        setArray('zig_zag', action.value, 'whiteRight');
        addUserChange('zig_zag_whiteRight');
      }
      break;

    case actionTypes.CHANGE_RIGHT_YELLOW:
      if (action.value !== $state.zig_zag.yellowRight) {
        setArray('zig_zag', action.value, 'yellowRight');
        addUserChange('zig_zag_yellowRight');
      }
      break;

    case actionTypes.CHANGE_LEFT_RED:
      if (action.value !== $state.zig_zag.redLeft) {
        setArray('zig_zag', action.value, 'redLeft');
        addUserChange('zig_zag_redLeft');
      }
      break;

    case actionTypes.CHANGE_LEFT_WHITE:
      if (action.value !== $state.zig_zag.whiteLeft) {
        setArray('zig_zag', action.value, 'whiteLeft');
        addUserChange('zig_zag_whiteLeft');
      }
      break;

    case actionTypes.CHANGE_LEFT_YELLOW:
      if (action.value !== $state.zig_zag.yellowLeft) {
        setArray('zig_zag', action.value, 'yellowLeft');
        addUserChange('zig_zag_yellowLeft');
      }
      break;

    case actionTypes.CHANGE_GUID_GPS:
      if (action.value !== $state.gpsGuid.gps) {
        setArray('gpsGuid', action.value, 'gps');
        addUserChange('gpsGuid_gps');
      }
      break;

    case actionTypes.CHANGE_POINT_MEANING:
      if (action.value !== $state.pointMeaning.point) {
        setArray('pointMeaning', action.value, 'point');
        addUserChange('pointMeaning_point');
      }
      break;

    case actionTypes.CHANGE_EMAIL_ADDRESS:
      if (action.value !== $state.user_email) {
        setArray('user_email', action.value, 'user_email');
        addUserChange('user_email');
      }
      break;

    case actionTypes.TOGGLE_MAP_RAILWAY:
      set('map_railway_active', action.value);
      break;

    case actionTypes.TOGGLE_MAP_CITY_BORDER:
      set('map_city_border_active', action.value);
      break;

    case actionTypes.TOGGLE_MAP_CITY_NAME:
      set('map_city_name_active', action.value);
      break;

    case actionTypes.CHANGE_DURATION:
      const $dv = action.value;
      const $ds = $state.duration;

      const ee = $dv[0] === $ds[0] && $dv[1] === $ds[1];

      if (!ee) {
        set('duration', action.value);
        addUserChange('duration');
      }
      break;

    case actionTypes.CHANGE_TIMING:
      if (action.value !== $state.timing) {
        let unit = null;
        if (action.value === '1D') unit = 'day';
        else if (action.value === '1W') unit = 'week';
        else if (action.value === '1M') unit = 'month';

        if (unit !== null) {
          let now = moment();
          set('duration', [now.clone().subtract(1, unit), now.clone()]);
          set('calendar_range', [
            now.clone().local().subtract(1, unit).startOf('day'),
            now.clone().local().endOf('day').add(1, 'millisecond')
          ]);
          set('timing', action.value);
          addUserChange('duration');
        } else {
          set('timing', 'custom');
        }
      }
      break;

    case actionTypes.CHANGE_OPEN_TOOL:
      set('open_tools', action.value);
      break;

    case actionTypes.CLOSE_OPEN_TOOL:
      set('open_tools', null);
      break;

    case actionTypes.SELECT_SIGNAL:
      if (action.value) {
        pushArray('signals_selected', [action.ID]);
      } else {
        const selected = $state.signals_selected.indexOf(action.ID);
        spliceArray('signals_selected', selected);
      }
      break;

    case actionTypes.SELECT_ALL:
      if ($state.signals_selected.length > 0) {
        $state.signals_selected = [];
      } else {
        $state.signals_selected = [...$state.signal_list.keys()];
      }
      break;

    case actionTypes.SET_FOCUSED:
      set('focused_item', action.item);
      break;

    case actionTypes.SET_BLURRED:
      set('focused_item', null);
      break;


    case actionTypes.ADD_USER:
      $state = {
        ...$state,
        users: [...$state.users, action.user]
      };

    case actionTypes.DELETE_USER:
      return {
        ...$state,
        users: $state.users.filter( user => user.id !== action.payload)
      };

    default:
      break;
  }

  return $state;
};

export default reducer;
