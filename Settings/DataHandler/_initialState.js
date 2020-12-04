export default {
  loading: false,
  loading_label: 'Getting Last Trip...',

  user_changes: [],

  deleteUser: null,
  position_list: [
    {
      name: 'Engineer',
      value: 'Engineer'
    },
    {
      name: 'Manager',
      value: 'Manager'
    },
    {
      name: 'CEO',
      value: 'CEO'
    },
    {
      name: 'Other',
      value: 'Other'
    },
  ],

  train_list: [
    {
      name: 'User',
      value: 'User'
    },
    {
      name: 'Admin',
      value: 'Admin'
    },
    {
      name: 'PANTOen',
      value: 'PANTOen'
    },
  ],

  focused_item: '',

  users:[],
  train_id: null,
  train_name: '',

  device_list: [],
  device_id: null,
  device_name: '',
  user_email: '',


  device_trips: [],

  gpsGuid: {
    gps: 7
  },
  pointMeaning: {
    point: 6
  },
  emailAddress: '',

  section: {
    type: 'by_time',
    time: 2,
    distance: 8
  },

  point: {
    red: 2,
    yellow: 8,
    white: 5
  },
  region: {
    red: 9,
    yellow: 4,
    white: 5
  },

  height: {
    redUp: 8,
    yellowUp: 6,
    whiteUp: 55,

    redDown: 9,
    yellowDown: 10,
    whiteDown: 65
  },

  zig_zag: {
    redRight: 26,
    yellowRight: 94,
    whiteRight: 74,

    redLeft: 15,
    yellowLeft: 26,
    whiteLeft: 14
  },

  notifications_keys: [],
  notifications: [],

  users: []
};
