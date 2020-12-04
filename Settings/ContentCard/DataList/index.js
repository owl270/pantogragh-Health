import React from "react";

import {Scrollbars} from "react-custom-scrollbars";
import Data from "./Data";

import PantoCheckButton from "../../../../components/PantoCheckButton";
import PantoButton from "../../../../components/PantoButton";
import PantoSelectList from "../../../../components/PantoSelectList";

import {connect} from "react-redux";
import * as actions from "../../_DataHandler/_actions";
import {Link, useLocation} from "react-router-dom";
import moment from "moment";
import DeviceStatus from "./icons/DeviceStatus";
import {$API, download} from "../../../../../api/server";
import Aux from "../../../../components/_Aux";


function MoreDetail(props) {
    let location = useLocation();
    return <>
        <Link
            to={{
                pathname: `/supervision/${props.train}/${props.device}/${moment(props.start).format("X")}/${moment(props.end).format("X")}`,
                state: {background: location}
            }}
        >
            {props.children}
        </Link>
    </>
}

function DeviceStatusCheck(props) {
    let location = useLocation();
    return <>
        <Link
            to={{
                pathname: `/deviceStatus/${props.train}/${props.device}/${moment(props.start).format("X")}/${moment(props.end).format("X")}`,
                state: {background: location}
            }}
        >
            {props.children}
        </Link>
    </>
}

class DataList extends React.Component {

    constructor(props) {
        super(props);

        this.setSelect = this.setSelect.bind(this)
        this.setToolsOpen = this.setToolsOpen.bind(this)

        this.addToDownloadQueue = this.addToDownloadQueue.bind(this)
        this.downloadSomeSignal = this.downloadSomeSignal.bind(this)
        this.sendDownloadRequest = this.sendDownloadRequest.bind(this)
        this.downloadCompleted = this.downloadCompleted.bind(this)

        this.requestVideo = this.requestVideo.bind(this)
        this.requestedVideo = this.requestedVideo.bind(this)
        this.sendRequestVideo = this.sendRequestVideo.bind(this)

        this.moreDetail = this.moreDetail.bind(this)
        this.deviceStatus = this.deviceStatus.bind(this)

        this.selectAll = this.selectAll.bind(this)
        this.setSorting = this.setSorting.bind(this)
    }


    renderThumb({style, ...props}) {
        const thumbStyle = {
            backgroundColor: "#4467A5",
            width: "4px",
            padding: 0,
            borderRadius: "5px",
        };
        return <div style={{...style, ...thumbStyle}} {...props} />;
    }

    renderTrackVertical({style, ...props}) {
        const thumbStyle = {
            position: "absolute",
            width: "4px",
            right: "2px",
            bottom: "2px",
            top: "0",
            borderRadius: "5px",
            backgroundColor: "#2B2C2E",
        };
        return <div style={{...style, ...thumbStyle}} {...props} />;
    }

    renderView({style, ...props}) {
        const thumbStyle = {
            marginRight: "-30px",
            marginBottom: "-30px",
            paddingRight: "13px",
            paddingBottom: "13px",
        };
        return <div style={{...style, ...thumbStyle}} {...props} />;
    }

    renderThumbX({style, ...props}) {
        const thumbStyle = {
            display: "none",
        };
        return <div style={{...style, ...thumbStyle}} {...props} />;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.download_queue !== this.props.download_queue) {
            if (this.props.download_queue.length === 1) {
                this.props.setInDownloading(0)
            } else {
                if (prevProps.download_queue.length - 1 === this.props._in_downloading) {
                    if (this.props._completed_download === this.props._in_downloading) {
                        this.props.setInDownloading(this.props._in_downloading + 1)
                    }
                }
            }
        } else if (prevProps._in_downloading !== this.props._in_downloading) {
            const $queue = this.props.download_queue
            if (this.props._in_downloading !== null && $queue[this.props._in_downloading]) {
                this.sendDownloadRequest(this.props._in_downloading)
            }
        }
        else if (prevProps.request_video !== this.props.request_video) {
            const $req = this.props.request_video
            if($req && $req.length) this.sendRequestVideo($req[$req.length - 1])
        }
    }





    setSelect(id, value) {
        this.props.selectSignal(id, value)
    }

    setToolsOpen(id, value) {
        this.props.setToolsOpen(id, value)
    }


    // tools

    addToDownloadQueue(id) {
        let ff = []
        if (typeof id === "object") {
            for (let ii = 0; ii < id.length; ii++) {
                if (this.props.signals[id[ii]] && this.props.signals[id[ii]]['has_acceleration']) {
                    ff.push(id[ii])
                }
            }
        } else {
            if (this.props.signals[id] && this.props.signals[id]['has_acceleration']) {
                ff.push(id)
            }
        }
        if (ff.length) this.props.addToDownloadQueue(ff)
    }

    downloadSomeSignal() {
        this.addToDownloadQueue(this.props.signals_selected)
    }

    sendDownloadRequest(q) {

        const queue = this.props.download_queue[q]

        let body = {
            train: this.props.train,
            device: this.props.device,
            utc_offset: moment().utcOffset()
        }
        let qq = []
        let ff = {}
        for (let ii = 0; ii < queue.length; ii++) {
            ff = this.props.signals[queue[ii]]
            qq.push([
                moment(ff.start).utc(false),
                moment(ff.end).utc(false)
            ])
        }
        body.utc_offset = moment(ff.start).utc(false).utcOffset()
        body['signals'] = qq

        $API.downloadSignal(body, (response) => {
            if (response.ok) {
                const {result} = response
                download(result)
                this.props.selectAllSignal(false)
            }
            this.downloadCompleted(q)
        })


    }

    downloadCompleted(qid) {
        if(this.props._in_queue.includes(this.props.toolsOpen)) this.props.setToolsOpen(null)
        this.props.downloadCompleted(qid)
        if ((this.props.download_queue.length - 1) > this.props._in_downloading) {
            this.props.setInDownloading(this.props._in_downloading + 1)
        }
    }

    sendRequestVideo(id){
        let ff = this.props.signals[id]
        let data = {
            train: this.props.train,
            device: this.props.device,
            duration: [
                moment(ff.start).utc(false),
                moment(ff.end).utc(false)
            ]
        }
        $API.requestVideo(data, (response) => {
            if (response.ok) {
                const etc = data
                this.props.addNotification({
                    type: 'success',
                    duration: 3000,
                    children: <Aux>
                        <b>Video request</b>
                        <br/>
                        {moment(etc.duration[0]).local(false).format("YYYY-MM-DD HH:mm") + " to " + moment(etc.duration[1]).local(false).format("YYYY-MM-DD HH:mm")}
                    </Aux>
                })
            }
            this.requestedVideo(id)
        })
    }

    requestVideo(id) {
        this.props.requestVideo(id)
    }
    requestedVideo(id) {
        if(id===this.props.toolsOpen) this.props.setToolsOpen(null)
        this.props.requestedVideo(id)
    }

    moreDetail(prp) {
        let $p = {
            train: this.props.train,
            device: this.props.device,
            children: "More Detail",
            ...prp
        }
        return <MoreDetail {...$p}/>
    }

    deviceStatus(prp) {
        let $p = {
            train: this.props.train,
            device: this.props.device,
            children: <DeviceStatus/>,
            ...prp
        }
        return <DeviceStatusCheck {...$p}/>
    }


    selectAll() {
        this.props.selectAllSignal()
    }

    setSorting(v) {
        this.props.setSorting(v)
    }

    render() {

        const {
            signals,

            train,
            device,
            train_name,
            device_name,

            signals_selected,
            toolsOpen,
            isDisabled,

            sorting_list,
            sorting,
            sorting_open,
            setSortingOpen,

            download_queue,
            _in_downloading,
            _in_queue,

            requested_videos,
            request_video,
            uploaded_videos,
            not_recorded_videos,

            get_result_time
        } = this.props


        const $sd = _in_downloading !== null ? download_queue[_in_downloading] : null

        const $signal_counts = signals.length

        const $data_list = signals.map((item, i) => {

            let $toolsOpen = toolsOpen === i
            let downloadSignalStatus = item.has_acceleration ? null : "No Signal"
            if (!downloadSignalStatus) {
                if (_in_queue.includes(i)) {
                    downloadSignalStatus = 'Pending...'
                    $toolsOpen = true
                    if ($sd && $sd.includes(i)) downloadSignalStatus = 'Downloading...'
                }
            }
            let requestVideoStatus =
                uploaded_videos.includes(i) ? "Uploaded"
                    : not_recorded_videos.includes(i) ? "Not Recorded"
                    : requested_videos.includes(i) ? "Requested"
                        : request_video.includes(i) ? "Requesting..."
                            : null

            if(request_video.includes(i) && !requested_videos.includes(i)) $toolsOpen = true


            return (
                <Data
                    index={i}

                    train={train}
                    train_name={train_name}
                    device={device}
                    device_name={device_name}

                    setToolsOpen={this.setToolsOpen}
                    toolsOpen={$toolsOpen}

                    setSelect={this.setSelect}
                    selected={signals_selected.includes(i)}

                    tools={{
                        downloadSignal: this.addToDownloadQueue,
                        requestVideo: this.requestVideo,
                        moreDetail: this.moreDetail,
                        deviceStatus: this.deviceStatus,
                    }}

                    toolsStatus={{
                        downloadSignal: downloadSignalStatus,
                        requestVideo: requestVideoStatus
                    }}

                    {...item}
                />
            )
        })


        let isSelectAll = false
        if (signals.length > 0 && signals_selected.length > 0) {
            if (signals.length === signals_selected.length) isSelectAll = true
            else isSelectAll = 'some'
        }

        return (
            <div className="data-list">
                <h6>
                    {$signal_counts > 0 ? [<b>{$signal_counts}</b>, " signals"] : "No signal"}
                     <span>{(get_result_time > 0) ? "("+(get_result_time/1000).toFixed(2)+" Seconds)" : null}</span>
                </h6>

                <div className="data-box">
                    <div className="data-tools-section">
                        <PantoCheckButton
                            value={isSelectAll}
                            label={<label>Select All</label>}
                            onChange={this.selectAll}
                            disabled={isDisabled("select_all")}
                        />

                        <div className="sorting">
                            <label>Sort by</label>
                            <PantoSelectList
                                open={sorting_open}
                                onOpen={() => {
                                    setSortingOpen(true)
                                }}
                                onClose={() => {
                                    setSortingOpen(false)
                                }}
                                disabled={isDisabled("sorting")}
                                onChange={this.setSorting}
                                placeholder={"sort"}
                                items={sorting_list}
                                value={sorting}
                                height={25}
                            />
                        </div>

                        <PantoButton
                            onClick={this.downloadSomeSignal}
                            disabled={isDisabled("download_signals")}
                        >
                            Download Signals
                        </PantoButton>
                    </div>

                    <div className="data-section hide-scrollbar">
                        <Scrollbars
                            ref="scrollbars_datalist"
                            renderThumbVertical={this.renderThumb}
                            renderTrackVertical={this.renderTrackVertical}
                            renderThumbHorizontal={this.renderThumbX}
                            renderView={this.renderView}

                        >
                            <ul>{$data_list}</ul>
                        </Scrollbars>
                    </div>
                </div>
            </div>
        );
    }
}

const stt2prp = (state) => {
    return {
        train: state.train,
        device: state.device,
        train_name: state.train_name,
        device_name: state.device_name,

        signals: state.signals,

        isDisabled: (item) => {
            return actions.isDisabled(state, item)
        },

        signals_selected: state.signals_selected,
        toolsOpen: state.toolsOpen,

        download_queue: state.download_queue,
        _in_queue: state._in_queue,
        _in_downloading: state._in_downloading,
        _completed_download: state._completed_download,

        request_video: state.request_video,
        requested_videos: state.requested_videos,
        uploaded_videos: state.uploaded_videos,
        not_recorded_videos: state.not_recorded_videos,

        sorting_list: state.sorting_list,
        sorting: state.sorting,
        sorting_open: state.sorting_open,

        get_result_time: state.get_result_time


    }
}

const dispatch2prp = (dispatch, state) => {
    return {
        addNotification: (value) => actions.addNotification(dispatch, value),

        selectSignal: (id, value) => actions.selectSignal(dispatch, id, value),
        setToolsOpen: (id, value) => actions.setToolsOpen(dispatch, id, value),
        selectAllSignal: (value) => actions.selectAllSignal(dispatch, value),

        setSortingOpen: (value) => actions.set(dispatch, 'sorting_open', value),
        setSorting: (value) => actions.setSorting(dispatch, value),

        addToDownloadQueue: (signal) => actions.addToDownloadQueue(dispatch, signal),
        setInDownloading: (qid) => actions.setInDownloading(dispatch, qid),
        downloadCompleted: (qid) => actions.downloadCompleted(dispatch, qid),

        requestVideo: (id) => actions.requestVideo(dispatch, id),
        requestedVideo: (id) => actions.requestedVideo(dispatch, id),

    }
}

export default connect(stt2prp, dispatch2prp)(DataList)
