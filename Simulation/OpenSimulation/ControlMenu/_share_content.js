import React from "react"
import {connect} from "react-redux";
import PantoInput from "../../../../components/PantoInput"
import PantoButton from "../../../../components/PantoButton"
import config from "../../../../../config"
import {CopyToClipboard} from "react-copy-to-clipboard";


class Index extends React.Component {

    state = {
        write_copied: false,
        read_copied: false
    }

    gUrl(tkn, sht, opt) {
        return config.baseUrl + "empowerment/simulation/" + tkn + "?" + opt + "=" + sht[opt]
    }

    copy(e) {
        if(e==='w'){
            this.setState({
                write_copied: true
            }, () => {
                setTimeout(()=> {
                    this.setState({
                        write_copied: false
                    })
                }, 1500)
            })
        }
        else {
            this.setState({
                read_copied: true
            }, () => {
                setTimeout(()=> {
                    this.setState({
                        read_copied: false
                    })
                }, 1500)
            })
        }
    }

    render() {

        const tkn = this.props.project_token
        const sht = this.props.project_share_tokens

        return <>
            <div className="panto-row">
                <div className="share-item">
                    <b>Write access:</b>
                    <CopyToClipboard text={this.gUrl(tkn, sht, 'w')} onCopy={() => {this.copy('w')}}>
                        <PantoButton disabled={this.state.write_copied}>{this.state.write_copied ? 'Copied' : 'Copy'}</PantoButton>
                    </CopyToClipboard>
                </div>
            </div>

            <div className="panto-row">
                <PantoInput readOnly value={this.gUrl(tkn, sht, 'w')}/>
            </div>

            <div className="panto-row">
                <div className="share-item">
                    <b>Read access:</b>
                    <CopyToClipboard text={this.gUrl(tkn, sht, 'r')} onCopy={() => {this.copy('r')}}>
                        <PantoButton disabled={this.state.read_copied}>{this.state.read_copied ? 'Copied' : 'Copy'}</PantoButton>
                    </CopyToClipboard>
                </div>
            </div>

            <div className="panto-row">
                <PantoInput readOnly value={this.gUrl(tkn, sht, 'r')}/>
            </div>

        </>

    }

}

const stt2prp = (state) => {
    return {
        project_token: state.project.token,
        project_share_tokens: state.project.share_tokens,

    };
};

const dispatch2prp = (dispatch) => {
    return {};
};

export default connect(stt2prp, dispatch2prp)(Index);