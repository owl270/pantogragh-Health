import React from "react";
import PantoCard from "../../../components/PantoCard";
import PantoButton from "../../../components/PantoButton";
import Aux from "../../../components/_Aux";

//************************
const _info = [
    {
        title: "Call",
        icon: "ph-telephone",
        content: "+42563213564"
    },
    {
        title: "Address",
        icon: "ph-address",
        content: <Aux>
            lorem, ipsum, lorem
            <br/>
            Berlin, Germany
        </Aux>
    },
    {
        title: "E-mail",
        icon: "ph-email",
        content: "Support@pantohealth.com"
    }
]
//****************

class Index extends React.Component {
    render() {
        //***********
        const $info_items = _info.map((v, i) => {
            return <li className={"info"}>
                <div className="info-title">
                    <i className={`panto-icon ${v.icon}`}/>
                    <span>{v.title}:</span>
                </div>
                <div className="info-text">{v.content}</div>
            </li>
        })
        //*********

        return (
            <PantoCard>
                <ul>
                    {/***************/}
                    {$info_items}
                    {/***********/}
                </ul>

                <PantoButton
                    className={"info-button"}
                >New Ticket</PantoButton>
            </PantoCard>
        );
    }
}

export default Index;
