import React from "react";

import PantoButton from "../../../components/PantoButton";

import Aux from "../../../components/_Aux";

import {connect} from "react-redux";
import moment from "moment";
import * as actionTypes from "../_DataHandler/_actions";


let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
}


class Index extends React.Component {

    interval = 0

    state = {
        isPlayingBefore: false
    }


    play = () => {
        const can_do = !this.props.loading && !this.props.add_figure_open && !this.props.loading_video
        if (can_do) {
            this.props.set('playing', true)
            if (document.getElementById("video")) document.getElementById("video").play()
        }
    }
    pause = () => {
        const can_do = !this.props.loading && !this.props.add_figure_open && !this.props.loading_video
        if (can_do) {
            this.props.set('playing', false)
            if (document.getElementById("video")) document.getElementById("video").pause()
        }
    }
    togglePlay = () => {
        if (!this.props.playing) this.play()
        else this.pause()
    }

    forward5min = () => {
        const can_do = !this.props.loading && !this.props.add_figure_open && !this.props.loading_video

        if (can_do) {
            this.props.set('current_time', this.props.current_time + (5000 / 60000))
            this.play()
        }
    }
    backward5min = () => {
        const can_do = !this.props.loading && !this.props.add_figure_open && !this.props.loading_video
        if (can_do) {
            this.props.set('current_time', this.props.current_time - (5000 / 60000))
            this.play()
        }
    }


    buttonPressHandle = (event) => {
        const can_do = !this.props.loading && !this.props.add_figure_open && !this.props.loading_video
        if (event.keyCode === 27) {
            event.preventDefault()
            if (can_do) this.props.unmount()
        } else if (event.keyCode === 32) {
            event.preventDefault()
            this.togglePlay()
        } else if (event.keyCode === 37) {
            event.preventDefault()
            this.backward5min()
        } else if (event.keyCode === 39) {
            event.preventDefault()
            this.forward5min()
        }

    }


    componentDidMount() {
        document.addEventListener("keydown", this.buttonPressHandle, false);
        document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.buttonPressHandle, false);
        document.removeEventListener(visibilityChange, this.handleVisibilityChange);
    }


    handleVisibilityChange = () => {
        if (document[hidden]) {
            this.setState({isPlayingBefore: this.props.playing})
            this.pause()
        }
        else {
            if(this.state.isPlayingBefore) this.play()
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.current_time !== this.props.current_time) {
            if (this.props.current_time < 0 || this.props.current_time > 1) {
                if (this.interval) clearInterval(this.interval)
                this.props.set('current_time', 0)
                this.pause()
            } else {
                if (document.getElementById("video")) document.getElementById("video").currentTime = this.props.current_time * 60
            }
        }


        if (prevProps.videos !== this.props.videos || prevProps.showing_number !== this.props.showing_number || prevProps.playing !== this.props.playing) {
            if (this.props.playing) {
                this.interval = setInterval(() => {
                    this.props.set('current_time', this.props.current_time + (this.props.interval_time / 60000))
                }, this.props.interval_time)
            } else {
                if (this.interval) clearInterval(this.interval)
            }
        }


    }


    render() {


        const $played_second = this.props.current_time * 60
        const $showing_seconds = moment($played_second * 1000).format('ss')

        const $played_percent = this.props.current_time * 100


        let $controllerClass = ["video-control--control-box"]
        let $videoListClass = ["video-control--videos-list"]

        if (!this.props.playing) $videoListClass.push("rendered")


        const $video = this.props.videos[this.props.showing_number]
        const videoNotOkay = !$video || !$video.exists || !this.props.video_blob.length

        const can_do = !this.props.loading && !this.props.add_figure_open && !this.props.loading_video


        const present_show_time = this.props.duration[0].clone().add(this.props.showing_number, 'minutes')


        let $prev, $next
        if (this.props.showing_number > 0) {
            const v = this.props.videos[this.props.showing_number - 1]
            const t = this.props.duration[0].clone().add(this.props.showing_number - 1, 'minutes')

            $prev = (v && v.exists) ? <PantoButton
                    className="first-list"
                    onClick={() => {
                        if (can_do) this.props.set('showing_number', this.props.showing_number - 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.355 11.246">
                        <g transform="translate(-39.516 -40.355)">
                            <path
                                d="M50.358,45.16l-9.5-4.706a.936.936,0,0,0-.906.036.9.9,0,0,0-.441.778v9.421a.9.9,0,0,0,.441.775.929.929,0,0,0,.488.137.945.945,0,0,0,.418-.1l9.5-4.712a.907.907,0,0,0,.51-.814A.918.918,0,0,0,50.358,45.16Z"/>
                        </g>
                    </svg>
                    Play {t.format("HH:mm")}
                </PantoButton>
                :
                <PantoButton
                    className={'outline first-list'}
                    onClick={() => {
                        if (can_do) this.props.set('request_video', this.props.showing_number - 1)
                    }}
                    loading={this.props.request_video === this.props.showing_number - 1}
                    disabled={this.props.request_video === this.props.showing_number - 1}
                >
                    Request for {t.format("HH:mm")}
                </PantoButton>
        }

        if (this.props.showing_number + 1 < this.props.videos.length) {
            const v = this.props.videos[this.props.showing_number + 1]
            const t = this.props.duration[0].clone().add(this.props.showing_number + 1, 'minutes')
            $next = (v && v.exists) ? <PantoButton
                    className="last-list"
                    onClick={() => {
                        if (can_do) this.props.set('showing_number', this.props.showing_number + 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.355 11.246">
                        <g transform="translate(-39.516 -40.355)">
                            <path
                                d="M50.358,45.16l-9.5-4.706a.936.936,0,0,0-.906.036.9.9,0,0,0-.441.778v9.421a.9.9,0,0,0,.441.775.929.929,0,0,0,.488.137.945.945,0,0,0,.418-.1l9.5-4.712a.907.907,0,0,0,.51-.814A.918.918,0,0,0,50.358,45.16Z"/>
                        </g>
                    </svg>
                    Play {t.format("HH:mm")}
                </PantoButton>
                :
                <PantoButton
                    className={'outline last-list'}
                    onClick={() => {
                        if (can_do) this.props.set('request_video', this.props.showing_number + 1)
                    }}
                    loading={this.props.request_video === this.props.showing_number + 1}
                    disabled={this.props.request_video === this.props.showing_number + 1}
                >
                    Request for {t.format("HH:mm")}
                </PantoButton>
        }

        let label_text
        if (!$video || !$video.exists) {
            label_text = 'Not uploaded'
        } else {
            if (this.props.loading_video) {
                label_text = 'Rendering...'
            } else {
                label_text = 'Not recorded'
            }
        }


        return (

            <Aux>


                <div className="video-player">

                    {videoNotOkay ? null :
                        <video
                            id="video"
                            height={"100%"}
                            width={"100%"}
                            controls={false}
                            loop={false}
                            muted={true}
                            onContextMenu={(e) => {
                                e.preventDefault()
                            }}
                            style={{background: "black"}}
                        >
                            <source src={this.props.video_blob} type="video/mp4"/>
                        </video>
                    }


                    <div className="video-control">


                        <div
                            className={"video-control--poster" + (videoNotOkay ? " rendered" : "")}
                            style={{"--text-label": `'${label_text}'`}}
                        />

                        <div className="video-control--timer-content">
                            <div className="base-time">{present_show_time.format("HH:mm:")}</div>
                            <div className="seconds">{$showing_seconds}</div>
                        </div>


                        <div className={$videoListClass.join(" ")}>

                            <div className="video-control--video-list-bg"/>


                            <div className="video-control--control-items">


                                {$prev}


                                <div className="video-description">
                                    <span>one minute video</span>
                                    <b>{present_show_time.format("HH:mm")}</b>
                                </div>

                                {$next}


                            </div>

                        </div>

                        <div className={$controllerClass.join(" ")}>

                            <div className="playing-controls">
                                <i className="panto-icon ph-video-player-5m-backward" onClick={this.backward5min}/>
                                {this.props.playing ?
                                    <i className="panto-icon ph-video-player-pause" onClick={this.pause}/>
                                    :
                                    <i className="panto-icon ph-video-player-play" onClick={this.play}/>
                                }
                                <i className="panto-icon ph-video-player-5m-forward" onClick={this.forward5min}/>
                            </div>

                            <div className="video-control--progress-bar">
                                <div className="progress-played-line" style={{width: $played_percent + "%"}}/>
                                <div
                                    className="video-control--progress-bar-controller"
                                    onClick={(e) => {
                                        const w = e.target.getBoundingClientRect().width
                                        const x = e.nativeEvent.offsetX
                                        const z = x / w
                                        this.props.set('current_time', z)
                                    }}
                                />
                            </div>

                        </div>


                    </div>

                </div>

            </Aux>
        )

    }


}


const stt2prp = (state) => {
    return {
        showing_number: state.showing_number,
        // duration: state.duration,
        videos: state.videos,
        current_time: state.current_time,
        video_blob: state.video_blob,
        playing: state.playing,
        interval_time: state.interval_time,
        request_video: state.request_video,

        add_figure_open: state.add_figure_open,
        loading_video: state.loading_video,
        loading_signal: state.loading_signal

    }
}

const dispatch2prp = (dispatch) => {
    return {
        set: (state, value) => dispatch({type: actionTypes.SET, state, value})
    }
}

export default connect(stt2prp, dispatch2prp)(Index)