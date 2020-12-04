import * as React from "react";

import {Scrollbars} from "react-custom-scrollbars";
import catenary_list, {RequestCatenary, Modals, Icons} from "../Catenaries";

import {connect} from "react-redux";
import * as actions from "../_DataHandler/_actions";

import {$API} from "../../../../../api/server"

class Index extends React.Component {


    renderThumbX({style, ...props}) {
        const thumbStyle = {
            backgroundColor: '#4467A5',
            height: '4px',
            padding: 0,
            borderRadius: '5px'
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderTrackX({style, ...props}) {
        const thumbStyle = {
            height: "4px",
            right: "1px",
            left: "0px",
            bottom: "0px",
            borderRadius: "5px",
            backgroundColor: "#2B2C2E"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    setNewCatenary = (props) => {
        $API.createSimulationProject(props, (response)=>{
            if(response.ok) this.props.setNewCatenaryModalOpen("", false)
            else this.props.setNewCatenaryModalOpen("", false)
            this.props.setGetProject()
        })
    }




    render() {


        const {
            isNewCatenaryModalOpen,
            setNewCatenaryModalOpen,
            isDisabled,
            my_tags
        } = this.props


        let $modals = []

        const $catenary = catenary_list.map((v, i) => {
            const Icon = Icons[v.id]
            const Modal = Modals[v.id]
            if (Modal) $modals.push(
                <Modal
                    key={i}
                    okay={(catenary_props) => {
                        this.setNewCatenary(catenary_props)
                    }}
                    cancel={() => {
                        setNewCatenaryModalOpen(v.id, false)
                    }}
                    visible={isNewCatenaryModalOpen(v.id)}
                    my_tags={my_tags}
                    disabled={isDisabled}
                />
            )
            return <li
                key={i}
                className={(isDisabled(v.id) ? "disabled" : "")}
                onClick={() => {
                    setNewCatenaryModalOpen(v.id, true)
                }}>
                <div className="catenary-item">
                    <Icon/>
                    <span>{v.title}</span>
                </div>
            </li>
        })

        const RequestCatenaryItem = () => {
            const _id = RequestCatenary.id
            const Icon = Icons[_id]
            return <div className={"request-catenary" + (isDisabled(_id) ? " disabled" : "")}>
                <div className="catenary-item">
                    <Icon/>
                    <span>{RequestCatenary.title}</span>
                </div>
            </div>
        }


        return <>

            <header>
                <h6>New catenary</h6>
                {$modals}
            </header>

            <div className="catenary-list-container">

                <div className="catenary-items hide-scrollbar">
                    <Scrollbars
                        ref="scrollbars"
                        renderThumbHorizontal={this.renderThumbX}
                        renderTrackHorizontal={this.renderTrackX}
                        hideTracksWhenNotNeeded
                    >
                        <ul>
                            {$catenary}
                        </ul>
                    </Scrollbars>
                </div>


                <RequestCatenaryItem/>


            </div>

        </>

    }


}


const stt2prp = (state) => {
    return {
        my_tags: state.my_tags,
        isDisabled: (stt) => actions.isDisabled(state, {type: '', state: stt, value: ''}),
        isNewCatenaryModalOpen: (catenary) => actions.isNewCatenaryModalOpen(state, catenary)
    }
}

const dispatch2prp = (dispatch) => {
    return {
        setNewCatenaryModalOpen: (catenary, toggle) => actions.setNewCatenaryModalOpen(dispatch, catenary, toggle),
        setGetProject: () => actions.set(dispatch, "get_project", [true]),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)