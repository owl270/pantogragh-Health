export default {
    loading: false,
    loading_label: '',

    disabled_all: false,
    notifications: [],

    map_railway_active: true,
    map_city_border_active: true,
    map_city_name_active: false,

    what_when_modal: false,
    calendar_range: [null, null],

    show_trips: [],

    device_trips: [],


    device_index: null,

    train: null,
    train_name: null,
    device: null,
    device_name: null,


    duration: [null, null],


    sorting_list: [
        {
            name: "start->end",
            value: "start_end"
        },
        {
            name: "end->start",
            value: "end_start"
        },
        {
            name: "shock point",
            value: "shock_point"
        }
    ],
    sorting: 'start_end',
    sorting_open: false,

    signals: [
        /*
        {
            start: "2020-11-13T12:34:00Z",
            end: "2020-11-13T12:35:00Z",
            points: [
                ["2020-11-13T12:34:00.058Z", [50.882236, 4.3941932]]
            ],
            speed: 80,
            has_acceleration: true,

            acc_duration: 59000,
            properties: {
                shock: [2, 0, 0]
            },
            _shocks: 2
        }
        */
    ],

    signals_selected: [],
    toolsOpen: null,




    download_queue: [],
    _in_downloading: null,
    _completed_download: null,
    _in_queue: [],


    request_video: [],
    requested_videos: [],
    uploaded_videos: [],
    not_recorded_videos: [],

    get_result_time: null,



}
