import * as React from "react"
import moment from "moment";


class Index extends React.Component {

    state = {
        caret_focused: null,
    }


    componentDidMount() {
        this.pt_svg = this.refs.svg_container.createSVGPoint()
        this.showTrip(true)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.calendar_range !== this.props.calendar_range) {
            this.showTrip()
        }
    }


    showTrip(initial=false){
        if(this.props.calendar_range[0] && this.props.calendar_range[1] && !initial) {
            let bet_days = this.props.calendar_range[1].diff(this.props.calendar_range[0], 'days')
            let bet_hours = ((bet_days / 2) * 24)

            const {calendar_range, setStartDuration, setEndDuration} = this.props

            const $start_duration = calendar_range[0].clone().add(bet_hours - 12, 'hours')
            const $end_duration = calendar_range[0].clone().add((bet_hours + 12), 'hours')
            setStartDuration($start_duration)
            setEndDuration($end_duration)
        }
    }


    cursorPoint = (event) => {
        this.pt_svg.x = event.clientX;
        this.pt_svg.y = event.clientY;
        return this.pt_svg.matrixTransform(this.refs.svg_container.getScreenCTM().inverse());
    }

    _mouseMove = (event) => {
        let {x, y} = this.cursorPoint(event);
        x -= 32
        if (x < 0) x = 0
        if (x > 1000) x = 1000


        const {caret_focused} = this.state
        const {calendar_range, start_duration, end_duration, setStartDuration, setEndDuration} = this.props


        if (caret_focused === 'start') {
            const days_length = calendar_range[1].clone().add(1, 'day').diff(calendar_range[0], 'days')
            const __distance_points = 1000 / (days_length - 1)
            const $start = Math.round((x / __distance_points) * 24)

            const $start_duration = calendar_range[0].clone().add($start, 'hours')
            if ($start_duration < end_duration) {
                setStartDuration($start_duration)
            }
        }
        else if (caret_focused === 'end') {
            const days_length = calendar_range[1].clone().add(1, 'day').diff(calendar_range[0], 'days')
            const __distance_points = 1000 / (days_length - 1)
            const $end = Math.round((x / __distance_points) * 24)

            const $end_duration = calendar_range[0].clone().add($end, 'hours')
            if ($end_duration > start_duration) {
                setEndDuration($end_duration)
            }
        }

    }


    render() {

        const {
            calendar_range,
            start_duration,
            end_duration,
            show_trips_devices
        } = this.props

        let $svg_body

        if (!calendar_range[0] || !start_duration) {
            let $text = "Choose duration from calendar"
            // if(!this.props.device_trips.length) $text = "No trip found in selected duration"
            $svg_body = [
                <rect
                    fill={"rgba(0,0,0,0.1)"}
                    stroke={"#9a0303"}
                    strokeWidth={5}
                    height={"100%"}
                    width={"100%"}
                    strokeDasharray={15}
                />,
                <text
                    transform="translate(537 150)"
                    fill="#fff"
                    fontSize={30}
                    fontFamily="SegoeUI-Bold, Segoe UI"
                    fontWeight={700}
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    <tspan x={0} y={0}>
                        {$text}
                    </tspan>
                </text>
            ]
        }
        else {

            let days = []

            let date = calendar_range[0].clone().subtract(1, 'day');
            while (date.isBefore(calendar_range[1], 'day')) {
                days.push(date.add(1, 'day').clone())
            }


            const days_length = calendar_range[1].clone().add(1, 'day').diff(calendar_range[0], 'days')
            const __distance_points = 1000 / (days_length - 1)

            const $days = days.map((item, i) => {
                return (
                    <g key={i} transform={`translate(${i * __distance_points} 0)`}>
                        <circle
                            r={((i === 0 || i === days_length - 1) ? 10 : 7.5)}
                            fill="#fff"
                        />
                        <text
                            transform="translate(0 40)"
                            fill="#fff"
                            fontSize={30}
                            fontFamily="SegoeUI-Bold, Segoe UI"
                            fontWeight={700}
                            letterSpacing="-.024em"
                            dominantBaseline="middle"
                            textAnchor="middle"
                        >



                            <tspan x={0} y={0}>
                                {item.format('D')}
                            </tspan>
                            <tspan fontSize={25} baselineShift={10}>
                                {

                                    parseInt(item.format('D')) === 1 ? "st"
                                        : parseInt(item.format('D')) === 2 ? "nd"
                                        : parseInt(item.format('D')) === 3 ? "rd" : "th"
                                }
                            </tspan>



                        </text>
                    </g>
                )
            })


            let $hours = []

            if(days.length===2) {
                let hours = []
                let hhhrrr = days[0].clone().subtract(2, 'hours');
                while (hhhrrr.isBefore(days[1].clone().subtract(2, 'hours'), 'hours')) {
                    hours.push(hhhrrr.add(2, 'hours').clone())
                }
                const __distance_points_hr = 1000 / (hours.length)
                $hours = hours.map((item, i) => {
                    if(i===0) return null
                    return (
                        <g key={i} transform={`translate(${i * __distance_points_hr} -10)`}>
                            <text
                                transform="translate(0 40)"
                                fill="#adb5bd"
                                fontSize={24}
                                fontFamily="SegoeUI-Bold, Segoe UI"
                                fontWeight={500}
                                dominantBaseline="middle"
                                textAnchor="middle"
                            >

                                <tspan x={0} y={0}>
                                    {item.format('H')}
                                </tspan>
                            </text>
                        </g>
                    )
                })
            }






            const $trips = this.props.device_trips.map((item, ii) => {

                if(!show_trips_devices.includes(ii)) return null
                const $color_number = show_trips_devices.indexOf(ii)

                return item.trips.map((trips, i) => {


                    const $st = moment(trips['start']).diff(calendar_range[0], 'minutes') / (24*60)
                    const $en = moment(trips['end']).diff(calendar_range[0], 'minutes') / (24*60)

                    return (
                        <g
                            transform={`translate(${$st * __distance_points} ${-25 + ii * -27.5})`}
                            stroke={"#e9ecef"}
                            className={`trip-line device-color-${$color_number}`}
                            strokeWidth="2">

                            <line
                                x2={($en - $st) * __distance_points}
                            />

                            <g transform={`translate(0 -8)`}>
                                <line
                                    y2={14}
                                />
                                <line
                                    y2={14}
                                    transform={`translate(${($en - $st) * __distance_points} 0)`}
                                />
                            </g>
                        </g>
                    )
                })
            })


            const $start = start_duration ? start_duration.diff(calendar_range[0], 'hours') / 24 : 0
            const _start_selection = __distance_points * $start

            const $end = end_duration ? end_duration.diff(calendar_range[0], 'hours') / 24 : 0
            const _end_selection = __distance_points * $end

            const _length_selection = _end_selection - _start_selection


            $svg_body = <g transform="translate(0 250)">



                <path
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth={4}
                    d="M26 0h1012"
                />

                <g
                    transform="translate(32 -200)"
                    onMouseUp={(event) => {
                        this.setState({
                            caret_focused: null
                        })
                        this.refs.svg_container.removeEventListener('mousemove', this._mouseMove)
                    }}
                >


                    <rect
                        fill={"#4285f4"}
                        opacity={0.1}
                        height={205}
                        y={-5}

                        width={_length_selection}
                        x={_start_selection}
                    />

                    <g
                        transform={`translate(${_start_selection} 0)`}
                        style={{cursor: 'e-resize'}}
                        fill={this.state.caret_focused === 'start' ? "#4c8cf6" : "#91b9fb"}
                        onMouseDown={(event) => {
                            this.setState({
                                caret_focused: 'start'
                            })
                            this.refs.svg_container.addEventListener('mousemove', this._mouseMove)
                        }}
                        onMouseUp={(event) => {
                            this.setState({
                                caret_focused: null
                            })
                            this.refs.svg_container.removeEventListener('mousemove', this._mouseMove)
                        }}

                    >
                        <path
                            d="M-2 -2h4v200h-4z"
                            strokeWidth={15}
                            stroke={"transparent"}
                        />
                        <path d="M0 2l-10-20h20z"/>
                    </g>

                    <g
                        transform={`translate(${_end_selection} 0)`}
                        style={{cursor: 'e-resize'}}
                        fill={this.state.caret_focused === 'end' ? "#4c8cf6" : "#91b9fb"}
                        onMouseDown={(event) => {
                            this.setState({
                                caret_focused: 'end'
                            })
                            this.refs.svg_container.addEventListener('mousemove', this._mouseMove)
                        }}
                        onMouseUp={(event) => {
                            this.setState({
                                caret_focused: null
                            })
                            this.refs.svg_container.removeEventListener('mousemove', this._mouseMove)
                        }}
                    >
                        <path
                            d="M-2 -2h4v200h-4z"
                            strokeWidth={15}
                            stroke={"transparent"}
                        />
                        <path d="M0 2l-10-20h20z"/>
                    </g>


                </g>

                <g transform="translate(32 0)">
                    {$days}
                    {$hours}
                    {$trips}
                </g>

                <text
                    transform="translate(1060 -240)"
                    fill="rgb(195, 195, 195)"
                    fontSize={15}
                    fontFamily="SegoeUI-Bold, Segoe UI"
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    <tspan x={0} y={0}>1h</tspan>
                </text>

            </g>
        }

        return ([


            <svg
                viewBox="0 0 1074 300"
                ref="svg_container"
                onMouseUp={() => {
                    this.setState({
                        caret_focused: null
                    })
                    this.refs.svg_container.removeEventListener('mousemove', this._mouseMove)
                }}
                onMouseLeave={() => {
                    this.setState({
                        caret_focused: null
                    })
                    this.refs.svg_container.removeEventListener('mousemove', this._mouseMove)
                }}
            >
                {$svg_body}
            </svg>
    ]
        )
    }
}



export default Index
