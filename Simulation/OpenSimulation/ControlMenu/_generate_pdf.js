import * as React from "react";
import * as actions from "../_DataHandler/_actions";
import {connect} from "react-redux";

class Index extends React.Component {

    generatePdf = () => {
        this.props.setControlMenuSubOpen(null)
    }

    render() {

        const {project} = this.props

        let prp = {}
        prp.onClick = this.generatePdf
        if(this.props.open_control_menu_sub==='generate_pdf') prp.className = "opened"


        return <li {...prp}>
            <span>Generate PDF</span>
        </li>
    }

}



const stt2prp = (state) => {
    return {
        project: state.project,
    };
};

const dispatch2prp = (dispatch) => {
    return {
        addNotification: (notify) => actions.addNotification(dispatch, notify),
        setControlMenuSubOpen: (value) => actions.setControlMenuSubOpen(dispatch, value),
    };
};

export default connect(stt2prp, dispatch2prp)(Index);