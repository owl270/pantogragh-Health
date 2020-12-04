
import PantoCard from "../../../components/PantoCard";
import React from "react";
import Aux from "../../../components/_Aux";

import NewCatenary from "./NewCatenary"
import MyProjects from "./MyProjects"
import {connect} from "react-redux";





class Index extends React.Component{

    render() {
        return <Aux>
            <PantoCard
                loading={this.props.card_loading}
            >
                <NewCatenary/>
                <hr/>
                <MyProjects token={this.props.token}/>
            </PantoCard>
        </Aux>

    }

}




const stt2prp = (state) => {
    return {
        card_loading: state.card_loading
    };
};

const dispatch2prp = (dispatch, state) => {
    return {

    };
};

export default connect(stt2prp, dispatch2prp)(Index);