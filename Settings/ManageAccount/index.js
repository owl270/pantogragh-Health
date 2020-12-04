import React from 'react';
import Aux from '../../../components/_Aux';
import PantoCard from '../../../components/PantoCard';
import PantoButton from '../../../components/PantoButton';
import SignUpModal from './SignUpModal';
import EditModal from'./EditModal';
import { Scrollbars } from 'react-custom-scrollbars';
import * as moment from 'moment';
import * as actionTypes from "../DataHandler/_actions";

import { connect } from 'react-redux';

import { Provider } from 'react-redux';
import '../style.scss';

class Index extends React.Component {
  renderThumbY({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: '#4467A5',
      width: '4px',
      padding: 0,
      borderRadius: '5px'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  renderTrackY({ style, ...props }) {
    const thumbStyle = {
      position: 'absolute',
      width: '4px',
      right: '0px',
      bottom: '0px',
      top: '0px',
      borderRadius: '5px',
      backgroundColor: '#2B2C2E'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  constructor(props) {
    super(props);

    this.state = {
      redirect_to: null,
      is_login: false,
      sign_up_modal_visible: false,
      edit_modal_visible: false,
      alert_message: '',
      show_password: false,

      email: '',
      password: ''
    };
  }

  render() {
    const { users } = this.props;
    const handleDelete = (id)=> {
      deleteUser(id)
    }
    const {
      deleteUser,


    } = this.props

    return (
      <Aux>
        <PantoCard>
          <header>
            <h6>Manage account access</h6>
          </header>

          <div className='manage-container'>
            <Aux>
              <div className='some-page-wrapper'>
                <div className='row'>
                  <div className='column'>
                    <div className='header-column'>User name</div>
                  </div>
                  <div className='column'>
                    <div className='header-column'>Last editing</div>
                  </div>
                  <div className='column'>
                    <div className='header-column'>Accessibility</div>
                  </div>
                </div>
                <hr />
                <Scrollbars
                  ref='scrollbars'
                  renderThumbVertical={this.renderThumbY}
                  hideTracksWhenNotNeeded>
                  {users.map((user) => {
                    return (
                      <div className='row'>
                        <div className='column'>
                          <div className='green-column'>
                            {user.first_name} {user.last_name}
                          </div>
                        </div>
                        <div className='column'>
                          <div className='orange-column'>{moment().format('lll')}</div>
                        </div>
                        <div className='column'>
                          <div className='me'>
                            <span> {user.position_list}</span>
                            <button
                              className={'btn'}
                              onClick={() => {
                                this.setState({ edit_modal_visible: true });
                              }}
                              disabled={this.state.is_login}>
                              <i className={'panto-icon ph-setting'}></i>
                            </button>
                            <button className='btn' onClick={()=> handleDelete(user._id)}>
                              <i className={'panto-icon ph-recyclebin'}></i>
                              {user._id}-Del</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className='row'>
                    <div className='column'>
                      <div className='green-column'>r.Ahmadifar</div>
                    </div>
                    <div className='column'>
                      <div className='orange-column'>2020/Sep/20-18:32</div>
                    </div>
                    <div className='column'>
                      <div className='me'>
                        <span> Admin</span>
                        <button className='btn'>
                          <i className={'panto-icon ph-setting'}></i>
                        </button>
                        <button className='btn'>
                          <i className={'panto-icon ph-recyclebin'}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                   */}
                </Scrollbars>
              </div>

              <div className='add-user-btn'>
                <PantoButton
                  className={'user-button'}
                  onClick={() => {
                    this.setState({ sign_up_modal_visible: true });
                  }}
                  disabled={this.state.is_login}>
                  add user
                </PantoButton>
              </div>

              <SignUpModal
                visible={this.state.sign_up_modal_visible}
                dismiss={() => {
                  this.setState({ sign_up_modal_visible: false });
                }}
              />
              <EditModal
                  visible={this.state.edit_modal_visible}
                  dismiss={() => {
                    this.setState({ edit_modal_visible: false });
                  }}
              />
            </Aux>
          </div>
        </PantoCard>
      </Aux>
    );
  }
}
const stt2prp = (state) => {
  return {
    users: state.users,
    loading: state.loading

  };
};


const dispatch2prp = (dispatch) => {
  return {

    deleteUser : (value) => dispatch({type: actionTypes.DELETE_USER, value}),
  }}


export default connect(stt2prp, dispatch2prp)(Index)
