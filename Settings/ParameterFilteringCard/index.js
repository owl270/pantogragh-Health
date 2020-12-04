import * as React from "react";
import PantoCard from "../../../components/PantoCard";


import ShockPointIcon from "./icons/ShockPoint";
import HeightIcon from "./icons/Height";
import ZigZagIcon from "./icons/ZigZag";
import {Scrollbars} from "react-custom-scrollbars";
import ParamRangeSlider from "./ParamRangeSlider"
import PantoCheckButton from "../../../components/PantoCheckButton";

const parameters_filtering = [
    {
        title: "Shock Point",
        icon: ShockPointIcon,
        content: ParamRangeSlider
    },
    {
        title: "Height",
        icon: HeightIcon,
        content: ParamRangeSlider
    },
    {
        title: "Zig Zag",
        icon: ZigZagIcon,
        content: ParamRangeSlider
    }
]


class Index extends React.Component {


    renderThumbX({style, ...props}) {
        const thumbStyle = {
            backgroundColor: "#4467A5",
            borderRadius: "5px",
        };
        return <div style={{...style, ...thumbStyle}} {...props} />;
    }

    renderTrackX({style, ...props}) {
        const thumbStyle = {
            position: "absolute",
            height: "6px",
            right: "0px",
            left: "0px",
            bottom: "2px",
            borderRadius: "5px",
            backgroundColor: "#2B2C2E",
        };
        return <div style={{...style, ...thumbStyle}} {...props} />;
    }

    renderView({style, ...props}) {
        const thumbStyle = {};
        return <div style={{...style, ...thumbStyle}} {...props} />;
    }

    renderThumbY({style, ...props}) {
        const thumbStyle = {
            display: "none",
        };
        return <div style={{...style, ...thumbStyle}} {...props} />;
    }



    render() {



        const $filtering = parameters_filtering.map((v, i) => {
            return <>
                <div className="filtering-group">
                    <label className="filtering-label">
                        <v.icon/>
                        {v.title}
                    </label>

                    <div className="filtering-content">
                        <PantoCheckButton
                            value={false}
                            onChange={(value) => {
                                // selection.select(index, value)
                            }}
                        />
                        <ParamRangeSlider disabled={true}/>
                    </div>

                </div>
            </>
        })


        return <>

            <PantoCard
                loading={this.props.loading}
                loading_label={this.props.loading_label}
            >

                <header>
                    <h6>Parameter Filtering</h6>
                </header>

                <div className="filtering-container hide-scrollbar">
                    <Scrollbars
                        ref="scrollbars"
                        renderThumbVertical={this.renderThumbY}
                        renderTrackHorizontal={this.renderTrackX}
                        renderThumbHorizontal={this.renderThumbX}
                        renderView={this.renderView}
                        hideTracksWhenNotNeeded
                    >
                        <div className="filtering-parameters-container">
                            {$filtering}
                        </div>
                    </Scrollbars>

                </div>

            </PantoCard>

        </>
    }


}


export default Index