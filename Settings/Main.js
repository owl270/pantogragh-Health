import * as React from "react";
import {Notification, PantoNotification} from "../../components/PantoNotify";
import {connect} from "react-redux";
import ParameterFilteringCard from "./ParameterFilteringCard";
import ContentCard from "./ContentCard";



class Index extends React.Component {



    render() {

        const {notifications} = this.props

        const $notify = notifications.map((value, index) => {
            return <Notification
                {...value}
                key={index}
            />
        })

        return <>
            <PantoNotification>
                {$notify}
            </PantoNotification>

            <div className="panto-row">
                <div className="panto-col ways-col">
                    <ParameterFilteringCard/>
                </div>
            </div>

            <div className="panto-row">
                <div className="panto-col data-map-result-col">
                    <ContentCard refresh={this.props.refresh}/>
                </div>

            </div>
        </>


    }

}

const stt2prp = (state) => {
    return {
        notifications: state.notifications,
    };
};



export default connect(stt2prp)(Index);