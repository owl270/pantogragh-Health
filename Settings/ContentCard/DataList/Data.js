import React from "react";
import PantoCheckButton from "../../../../components/PantoCheckButton";
import DataProps from "./DataProps";
import PantoButton from "../../../../components/PantoButton";
import moment from "moment";


import SpeedMeter from "./icons/SpeedMeters";


class Data extends React.Component {


    render() {

        const {
            index,

            start,
            end,
            speed,
            has_acceleration,

            acc_duration,
            properties,


            device_name,


            setToolsOpen,
            toolsOpen,

            setSelect,
            selected,

            tools,
            toolsStatus


        } = this.props

        let classes = []

        if (toolsOpen) classes.push('open-tools')
        if (!speed) classes.push('no-speed')

        const $properties = {...properties}
        const $device = device_name


        const _downloadStatus = toolsStatus.downloadSignal
        const _downloadText = _downloadStatus === null ? "Download Signal" : _downloadStatus;

        const _requestVideoStatus = toolsStatus.requestVideo
        const _requestVideoText = _requestVideoStatus === null ? "Request Video" : _requestVideoStatus;


        const $tools = <>
            <PantoButton
                className="outline"
                onClick={() => {
                    tools.downloadSignal(index)
                }}
                disabled={_downloadStatus !== null}
            >
                {_downloadText}
            </PantoButton>


            <PantoButton
                className="outline"
                onClick={() => {
                    tools.requestVideo(index)
                }}
                disabled={_requestVideoStatus !== null}
            >
                {_requestVideoText}
            </PantoButton>


            <PantoButton className="outline">
                <tools.moreDetail start={start} end={end}/>
            </PantoButton>

            <tools.deviceStatus start={start} end={end}/>
        </>


        return (


            <li className={classes.join(" ")} key={index}>
                <div className={"data-content"}>

                    <PantoCheckButton
                        value={selected}
                        onChange={(value) => {
                            setSelect(index, value)
                        }}
                    />


                    <div
                        className="data-container"
                        onClick={() => {
                            setToolsOpen(index, true)
                        }}
                    >

                        <div className="data-info">

                            <span className="identify">Device: {$device}</span>

                            <span className="date-time">
                                {moment(start).format('DD/MMM/YYYY')}
                                <span>{moment(start).format('HH:mm') + " to " + moment(end).format('HH:mm')}</span>
                            </span>

                            <span className="section-span">
                                <SpeedMeter/> <b>{speed} km/h</b>
                                {
                                    !has_acceleration
                                        ? null
                                        : <span>Acc duration: {moment.utc(acc_duration).format("ss\\s")}</span>
                                }
                            </span>

                        </div>

                        {
                            !has_acceleration
                                ? null
                                : <>
                                    <div className="data-properties">
                                        <DataProps {...$properties}/>
                                    </div>
                                </>
                        }


                    </div>
                </div>

                <div className="tools-content">

                    {$tools}

                    <div
                        className="close-tools"
                        onClick={() => {
                            setToolsOpen(index, false)
                        }}
                        children="×"
                    />

                </div>


            </li>

        )

    }

}

export default Data