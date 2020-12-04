import React from "react";

// redux
import {connect, Provider} from "react-redux";
import {createStore} from "redux";


import Aux from "../../components/_Aux";
import "./style.scss";
import InfoSection from "./InfoSection";
import TicketSection from "./TicketSection";


class Index extends React.Component {
    render() {
        return (
            <Aux>
                <div className="panto-row">
                    <div className="panto-col info-col">
                        <InfoSection/>
                    </div>
                    <div className="panto-col ticket-col">
                        <TicketSection/>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Index;
