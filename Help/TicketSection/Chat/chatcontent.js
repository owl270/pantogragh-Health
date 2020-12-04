import React from "react";
import PantoCard from "../../../../components/PantoCard";
import PantoInput from "../../../../components/PantoInput";
import PantoButton from "../../../../components/PantoButton";
import {Scrollbars} from "react-custom-scrollbars";


const _title = 'Ticket Title 1'
const _avatar = 'file_url' /*replace with a url of image on internet*/

//revers
// from the last message to the first one
// you must use flex-direction: column-reverse I think google it...
const _messages = [
    {
        _id: "5d97897789",
        type: "text",
        time: "2020-10-09T11:34:49.474Z",
        text: "Lorem ipsum dolor sit amet, consectetuer\n from user 1\n",
        from: 1 /* it can be 0 or 1 or -1   => 0: user, 1: support, -1: alert  */
    },
    {
        _id: "5d97897789",
        type: "text",
        time: "2020-10-09T11:34:49.474Z",
        text: "Nothing planned, you?\n from user 0",
        from: 0 /* it can be 0 or 1 or -1   => 0: user, 1: support, -1: alert  */
    },
    {
        _id: "5d97897789",
        type: "text",
        time: "2020-10-09T11:34:49.474Z",
        text: "Please hold for one moment, I’ll check \n from user 0 \n" +
            "with my manager.",
        from: 0 /* it can be 0 or 1 or -1   => 0: user, 1: support, -1: alert  */

    },
    {
        _id: "5d97897789",
        type: "file",
        time: "2020-10-09T11:34:49.474Z",
        url: "file_url",
        format: "jpg", /** use it for icons **/
        from: 1 /* it can be 0 or 1 or -1   => 0: user, 1: support, -1: alert  */
    },
    {
        _id: "5d97897789",
        type: "text",
        time: "2020-10-09T11:34:49.474Z",
        text: "Lorem ipsum dolor sit amet, consectetuer\n" +
            "adipiscing elit, sed diam nonummy nibh.\n" +
            "Lorem ipsum dolor\n from user 1",
        from: 1 /* it can be 0 or 1 or -1   => 0: user, 1: support, -1: alert  */
    },
    {
        _id: "5d97897789",
        type: "alert",
        time: "2020-10-09T11:34:49.474Z",
        text: "23 June \n from user -1",
        from: -1 /* it can be 0 or 1 or -1   => 0: user, 1: support, -1: alert */
    },
]


class Index extends React.Component {

    renderThumbY({style, ...props}) {
        const thumbStyle = {
            backgroundColor: '#4467A5',
            width: '4px',
            padding: 0,
            borderRadius: '5px'
        }
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderTrackY({style, ...props}) {
        const thumbStyle = {
            position: "absolute",
            width: "4px",
            right: "0px",
            bottom: "0px",
            top: "0px",
            borderRadius: "5px",
            backgroundColor: "#2B2C2E"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    render() {



        let $messages =_messages.map((v, i) => {
            if(v.from===1){
                return(<div className="content-msg" key={i}>
                        <div className="image-user">

                        </div>
                        <div className={"msg-row other-text"}> {v.text}

                            <div className="msg-time">12:30</div>
                        </div>
                    </div>
                )
            } else if (v.from=== 0) {
                return(<div className="content-msg" key={i}>
                        <div className="msg-row my-text">{v.text}
                            <div className="msg-time">18:12</div>
                        </div>
                    </div>
                )
            }else if (v.from=== -1) {
                return(
                    <div className="content-msg" key={i}>
                        <div className="alert">    {v.text} </div>
                    </div>
                )
            }

        })


        return (
            <PantoCard>
                <div className="chat-box">
                    <div className="header">
                        <h6 className="ticket-title">{_title}</h6>
                        <div className="ticket-chat">
                            <PantoButton className="close-ticket-chat">close ticket</PantoButton>
                        </div>
                    </div>
                    <div className=" msg-container">
                        <Scrollbars
                            ref="scrollbars"
                            renderThumbVertical={this.renderThumbY}
                            renderTrackVertical={this.renderTrackY}
                            hideTracksWhenNotNeeded
                        >
                            <ul>
                                {$messages}
                            </ul>
                        </Scrollbars>

                    </div>

                    <div className="ticket-input">
                        <PantoInput  placeHolder="Type your message"  />
                        <div className="button-container">
                            <button className="send-button">
                                <i className="panto-icon  ph-send-button"></i>
                            </button>
                            <button className="send-button">
                                <i className="panto-icon  ph-send-button"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </PantoCard>

        );
    }
}

export default Index;
