import React from 'react';
import PantoInput from "../../../components/PantoInput";

class ParamRangeSlider extends React.Component {


    state = {
        mouse_down: false,
        selected_caret: null,
        first_caret: 0,
        last_caret: 0.1
    }


    render() {
        const $first_caret = 2.5 + this.state.first_caret * 289.5
        const $last_caret = 2.5 + this.state.last_caret * 289.5


        const handlePointerMove = (e) => {
            if (this.state.mouse_down) {
                const rect = e.target.getBoundingClientRect()
                const w = e.target.clientWidth
                const x = e.nativeEvent.offsetX

                e.persist();
                console.log(e);
                // let x = e.clientX - rect.left + e.offset().left
                // let y = e.clientY - rect.top + e.offset().top
                // const w = rect.width
                //

                const $ZZ = x / w
                let $cmp = (this.state.selected_caret === 'first_caret' ? ($ZZ < this.state.last_caret) : $ZZ > this.state.first_caret)
                if ($ZZ >= 0 && $ZZ <= 1 && $cmp) {
                    this.setState({
                        [this.state.selected_caret]: $ZZ
                    })
                }
            }
        };
        const handlePointerUp = (e) => {
            this.setState({
                mouse_down: false
            })
        };
        const handlePointerDown = (e, w) => {
            this.setState({
                mouse_down: true,
                selected_caret: w
            })
        };

        const handleClick = (e) => {
            // const w = e.target.clientWidth
            // const x = e.nativeEvent.offsetX
            //
            // const $ZZ = x/w
            // if($ZZ>=0 && $ZZ<=1) {
            //     this.setState({
            //         last_caret: $ZZ
            //     })
            // }
        };

        const {disabled} = this.props


        return (

            <div
                className="panto-range-slider"
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onClick={handleClick}
            >

                <div className="range-inputs">
                    <PantoInput disabled={disabled}/>
                    <span className={"unit" + (disabled ? " disabled" : "")}>cm</span>
                </div>

                <svg viewBox="0 0 295.775 26" className={"range-slider-content" + (disabled ? " disabled" : "")}>

                    <style>
                        {
                            `
                            .range-slider-content.disabled .chart-slider {
                                fill: #71737A
                            }
                            .range-slider-content.disabled .range-caret {
                                fill: #71737A
                            }
                            `
                        }
                    </style>


                    <path
                        className="slider"
                        fill="none"
                        stroke="#2b2c2e"
                        strokeLinecap="round"
                        strokeWidth={3}
                        d="M4 23.657h287.5"
                    />

                    <path
                        d="M40 18.0l8-3.07 8-6.14 6.451-5.577 2.748-1.427 3.184-.671 3.006-.462 3.185.462 3.772 2.1 2.936 2.946 1.806 2.632 2.322 2.412 2.58 1.974 3.354 1.754 3.624.507 3.285-.966 2.636-1.295 3.612-1.974 3.612-.877h3.612l5.16.877 3.4 1.432 3.823.541s3.354.658 4.128.877 6.192.877 6.192.877l12.125.877s4.644 1.1 5.418 1.1 6 1.432 6 1.432l1.417 1.643v4.735l-120.44.022v-5.141z"
                        fill="#5d7192"
                        opacity={0.59}
                        className="chart-slider"
                    />

                    <g
                        className="range-caret"
                        transform={"translate(" + $first_caret + " 0)"}
                        fill="#91b9fb"
                        onPointerDown={(e) => handlePointerDown(e, 'first_caret')}
                        onPointerUp={handlePointerUp}
                    >
                        <path d="M0.5 6 l-3.5-7h7z"/>
                        <rect
                            width={1}
                            height={26}
                            rx={0.5}
                            transform="translate(0 -1)"
                            strokeWidth={8}
                            stroke="transparent"
                        />
                    </g>
                    <g
                        className="range-caret"
                        transform={"translate(" + $last_caret + " 0)"}
                        fill="#91b9fb"
                        onPointerDown={(e) => handlePointerDown(e, 'last_caret')}
                        onPointerUp={handlePointerUp}
                    >
                        <path d="M0.5 6 l-3.5-7h7z"/>
                        <rect
                            width={1}
                            height={26}
                            rx={0.5}
                            transform="translate(0 -1)"
                            strokeWidth={8}
                            stroke="transparent"
                        />
                    </g>
                </svg>

                <div className="range-inputs">
                    <PantoInput disabled={disabled}/>
                    <span className={"unit" + (disabled ? " disabled" : "")}>cm</span>
                </div>


            </div>
        )
    }

}

export default ParamRangeSlider