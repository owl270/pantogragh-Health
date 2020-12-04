import * as React from "react"

Array.prototype.max = function () {
    return Math.max.apply(null, this); // <-- passing null as the context
};
Array.prototype.min = function () {
    return Math.min.apply(null, this); // <-- passing null as the context
};


class Index extends React.Component {


    render() {

        let x = this.props.x
        let y = this.props.y


        const y_max = y.max()
        const y_min = y.min()

        const $YMax = Math.ceil(y_max)
        const $YMin = Math.floor(y_min)

        /** real numbers y **/
        const y_between = $YMax - $YMin

        const $center_y = $YMax - (y_between / 2)


        /** point svg y **/
        const $y_max = -53
        const $y_min = 53
        const $y_between = $y_max - $y_min


        /** unit y **/
        const unit_y = $y_between / y_between


        /** point svg x **/
        const $x_max = 639
        const $x_min = 0
        const $x_between = $x_max - $x_min

        /** real numbers x **/
        const x_between = 60000

        /** unit x **/
        const unit_x = $x_between / x_between


        let $y_axis = []

        const uu = y_between;
        let un = uu / uu

        if (uu > 7) {
            un = Math.ceil((un * (uu / 4)))
        }


        for (let i = $YMin; i <= $YMax; i += un) {
            const hh = (i - $YMin) * (108 / uu)
            $y_axis.push(
                <text
                    key={i}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    transform={`translate(${hh} 0)`}
                >
                    <tspan x={0} y={0}>
                        {Math.ceil(i)}
                    </tspan>
                </text>
            )
        }

        const interval = this.props.interval


        let $points = [], $x, $y, showing_points = {}, sh = 0
        for (let ii = 0; ii < x.length; ii++) {
            $x = x[ii] * unit_x
            $y = (y[ii] - $center_y) * unit_y

            $points.push($x + "," + $y)
            if (sh <= x[ii]) {
                showing_points[parseInt((x[ii] / 1000).toString()) * 1000] = $y
                sh = parseInt((x[ii] / 1000).toString()) * 1000 + interval
            }
        }


        const $title = this.props.title
        let th = this.props.l

        let $thresholds
        if(th) {
            th = th.sort()

            $thresholds = th.map((item, i) => {
                if (item > $YMax) return null
                return (
                    <line
                        x2="650"
                        transform={`translate(0 ${(item - $center_y) * unit_y})`}
                        className={`__threshold_line_lvl${(i + 1)}`}
                    />
                )
            })
        }

        const cu = this.props.current_time

        let $pointer_x = cu * $x_between
        let $pointer_y = -55


        let y_title = this.props.ytitle

        return (


            <svg viewBox="0 0 700 155">

                <defs>
                    <style>
                        {
                            ".chart{fill:none;stroke:#0072BD}" +
                            ".__axis{font-size: 10px;fill:#CCCCCC;font-family:SegoeUI-Semibold,Segoe UI;}" +
                            ".__amplitude{transform: rotate(-90deg) translate(-140px, 10px);}" +
                            ".__yx_line{stroke:#CCCCCC;stroke-width:1.5;fill:#CCCCCC;transform:translate(30px, 20px);}" +
                            ".__rect_chart{width:640px;height:110px;fill:#262626;transform: translate(31px, 29px);stroke: #707070;stroke-width: 1px;}" +
                            ".__threshold_line{stroke: #A25154;stroke-width: 1px;stroke-dasharray: 5;}" +
                            ".__threshold_line_lvl1{stroke: #AFB0B2;}" +
                            ".__threshold_line_lvl2{stroke: #A17D48;}" +
                            ".__threshold_line_lvl3{stroke: #A25154;}" +
                            ".__threshold_number{font-size: 10px;fill:#FD5858;font-family:SegoeUI-Semibold,Segoe UI;}" +
                            ".__delete_item{fill: #91b9fb;stroke: transparent;stroke-width: 5;transition: .2s fill;cursor: pointer;}" +
                            ".__delete_item:hover{fill: #fa4f4f;}" +
                            ".__pointer_{transition: 1s all}"

                        }
                    </style>
                </defs>

                <text
                    transform="translate(40 15)"
                    fill="rgba(255,255,255,.8)"
                    fontSize={15}
                    fontWeight={600}
                >
                    <tspan x={0} y={0}>
                        {$title}
                    </tspan>
                </text>

                <rect className="__rect_chart"/>


                <g
                    className={"__axis"}
                >
                    <text
                        className="__amplitude"
                    >
                        <tspan x={0} y={0}>
                            {y_title}
                        </tspan>
                    </text>

                    <g transform="translate(22, 140) rotate(-90)">
                        {$y_axis}
                    </g>


                    <g
                        transform="translate(30 152)"
                    >
                        <text
                            dominantBaseline="middle"
                            textAnchor="middle"
                            transform="translate(0 0)"
                        >
                            <tspan x={0} y={0}>
                                {"0"}
                            </tspan>
                        </text>


                        <text
                            dominantBaseline="middle"
                            textAnchor="middle"
                            transform="translate(106.6667 0)"
                        >
                            <tspan x={0} y={0}>
                                {"10"}
                            </tspan>
                        </text>


                        <text
                            dominantBaseline="middle"
                            textAnchor="middle"
                            transform="translate(213.3334 0)"
                        >
                            <tspan x={0} y={0}>
                                {"20"}
                            </tspan>
                        </text>


                        <text
                            dominantBaseline="middle"
                            textAnchor="middle"
                            transform="translate(320.0001 0)"
                        >
                            <tspan x={0} y={0}>
                                {"30"}
                            </tspan>
                        </text>


                        <text
                            dominantBaseline="middle"
                            textAnchor="middle"
                            transform="translate(426.6668 0)"
                        >
                            <tspan x={0} y={0}>
                                {"40"}
                            </tspan>
                        </text>


                        <text
                            dominantBaseline="middle"
                            textAnchor="middle"
                            transform="translate(533.3335 0)"
                        >
                            <tspan x={0} y={0}>
                                {"50"}
                            </tspan>
                        </text>


                        <text
                            dominantBaseline="middle"
                            textAnchor="middle"
                            transform="translate(640.0002 0)"
                        >
                            <tspan x={0} y={0}>
                                {"time (s)"}
                            </tspan>
                        </text>


                    </g>

                </g>


                <g
                    className={"__yx_line"}
                >
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="120"
                    />
                    <line
                        x1="0"
                        y1="0"
                        x2="660"
                        y2="0"
                        transform="translate(0 120)"
                    />
                </g>


                <g
                    transform="translate(31 84)"
                >
                    <polyline
                        className="chart"
                        points={$points.join(" ")}
                        // points={"0,0 60,0"}
                    />
                </g>

                <g
                    transform="translate(31 84)"
                    className="__threshold_line"
                >
                    {$thresholds}
                </g>

                <g transform="translate(690 77.5)" onClick={() => {
                    this.props.remove(this.props.id)
                }}>
                    <g transform="translate(-69.707 -32)">
                        <path
                            className="__delete_item"
                            d="M69.707,32a1.909,1.909,0,0,0-1.9,1.9v.64H64v1.269h1.269V46.6a1.911,1.911,0,0,0,1.9,1.9h7.615a1.911,1.911,0,0,0,1.9-1.9V35.808h1.269V34.538H74.154V33.9a1.909,1.909,0,0,0-1.9-1.9Zm0,1.269h2.548a.618.618,0,0,1,.63.63v1.909h2.538V46.6a.626.626,0,0,1-.635.635H67.173a.626.626,0,0,1-.635-.635V35.808h2.538V33.9A.618.618,0,0,1,69.707,33.269Zm-1.9,3.808v8.885h1.269V37.077Zm2.538,0v8.885h1.269V37.077Zm2.538,0v8.885h1.269V37.077Z"/>
                    </g>
                </g>

                <g
                    transform="translate(31 84)">
                    <line
                        y2={110}
                        strokeWidth="1"
                        stroke="#FD5858"
                        transform={`translate(${$pointer_x} ${$pointer_y})`}
                        className="__pointer_"
                    />
                </g>


            </svg>
        )
    }
}

export default Index
