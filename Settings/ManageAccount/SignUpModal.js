import React from 'react';
import { PantoModals, Modal } from '../../../components/PantoModal';
import PantoCheckButton from '../../../components/PantoCheckButton';
import PantoSelectOption from '../../../components/PantoSelectOption';

import CountryCodes from '../../../data/ContryCodes';
import PantoInput from '../../../components/PantoInput';
import PantoSelectList from '../../../components/PantoSelectList';
import PantoButton from '../../../components/PantoButton';
import { validation } from '../../../components/Validations';
import { connect } from 'react-redux';

import * as actionTypes from '../DataHandler/_actions';
import { isDisabled, isFocused } from '../DataHandler';

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_sign_up: false,
      doValidate: false,
      alert_message: '',
      success_modal_visible: false,

      position_list:'Engineer',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_number: '',
      country_code: '+49',
      company: '',
      news_letters: false
    };
  }

  validate = {
    first_name: [
      ['required', true],
      ['min', 3]
    ],
    last_name: [
      ['required', true],
      ['min', 3]
    ],
    email: [['email', true]],
    password: [['password', true]],
    phone_number: [['phone_number', true]]
  };

  field_validation = (field) => {
    let okay = true;
    let valid = null;
    for (let i = 0; i < this.validate[field].length; i++) {
      valid = this.validate[field][i];
      console.log(
        field,
        this.state[field],
        !validation[valid[0]](valid[1], this.state[field])
      );
      if (!validation[valid[0]](valid[1], this.state[field])) {
        okay = false;
      }
    }
    return okay;
  };

  handleChange = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  $signUp = (response) => {
    this.setState({ is_sign_up: false });

    let { ok, result, error, description, detail } = response;
    if (ok) {
      this.modal_dismiss();
      this.setState({
        alert_message: '',
        success_modal_visible: true
      });
    } else {
      this.setState({
        alert_message: description
      });
    }
  };

  handleSignUp = () => {
    let okay = true;
    /*for (const field in this.validate) {
      if (!this.field_validation(field)) okay = false;
    }*/
    if (okay) {
      const sign_up_fields = {
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone_number: [this.state.country_code, this.state.phone_number],
        news_letters: this.state.news_letters,
        company: this.state.company,
        position_list: this.state.position_list
      };
      this.props.setAddUser(sign_up_fields);
    } else {
      this.setState({
        doValidate: true
      });
    }
  };

  modal_dismiss = () => {
    //if (this.state.is_sign_up) return;
    this.props.dismiss();
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_number: '',
      country_code: '+49',
      company: '',
      position_list:'Engineer',
        news_letters: false
    });
  };

  render() {
    const {
      setPosition,
      setTrain,
      setAddUser,
      isDisabled,
      isFocused,
      setFocused,
      setBlurred,
      train_list,
      train_id,
      device_list,
      device_id,

      position_list,
      position
    } = this.props;

    return (
      <PantoModals>
        <Modal
          visible={this.props.visible}
          dismiss={this.modal_dismiss}
          name={'add-user'}
          header={'Add User '}>
          <div className='form-group add-user-form'>
            <div className='input-row'>
              <PantoInput
                type='text'
                placeHolder='First name'
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                spellCheck='false'
                value={this.state.first_name}
                name={'first_name'}
                disabled={this.state.is_sign_up}
                onChange={this.handleChange}
                roles={this.validate.first_name}
                doValidate={this.state.doValidate}
              />

              <PantoInput
                type='text'
                placeHolder='Last name'
                autocomplete='off'
                autocorrect='off'
                autocapitalize='off'
                spellcheck='false'
                value={this.state.last_name}
                name={'last_name'}
                disabled={this.state.is_sign_up}
                onChange={this.handleChange}
                roles={this.validate.last_name}
                doValidate={this.state.doValidate}
              />
            </div>

            <PantoInput
              type='email'
              placeHolder='Email address'
              autocomplete='off'
              autocorrect='off'
              autocapitalize='off'
              spellcheck='false'
              value={this.state.email}
              name={'email'}
              disabled={this.state.is_sign_up}
              onChange={this.handleChange}
              roles={this.validate.email}
              doValidate={this.state.doValidate}
            />

            <div className='input-row'>
              <PantoSelectOption
                style={{ flex: 0.15 }}
                items={CountryCodes}
                value={this.state.country_code}
                name={'country_code'}
                disabled={this.state.is_sign_up}
                onChange={this.handleChange}
              />

              <PantoInput
                type={'tel'}
                placeHolder={'Mobile phone number'}
                containerStyle={{ flex: 0.825 }}
                value={this.state.phone_number}
                name={'phone_number'}
                disabled={this.state.is_sign_up}
                onChange={this.handleChange}
                roles={this.validate.phone_number}
                doValidate={this.state.doValidate}
              />
            </div>

            <div className='input-row'>
              <span>Position</span>

              <div className='filter-input-focus-location'>
                <PantoSelectList
                  open={isFocused('position_list')}
                  name={'position_list'}
                  onOpen={() => {
                    setFocused('position_list');
                  }}
                  onClose={() => {
                    setBlurred('position_list');
                  }}
                  disabled={isDisabled('position_list')}
                  onChange={setPosition}
                  items={position_list}
                  value={position}
                  placeholder='Engineer'
                />
              </div>
            </div>
            <div className='input-row'>
              <span>User access</span>

              <div className='filter-input-focus-location'>
                <PantoSelectList
                  open={isFocused('train_list')}
                  onOpen={() => {
                    setFocused('train_list');
                  }}
                  onClose={() => {
                    setBlurred('train_list');
                  }}
                  disabled={isDisabled('train_list')}
                  onChange={setTrain}
                  placeholder='User'
                  items={train_list}
                  value={train_id}
                />
              </div>
            </div>
            <PantoButton onClick={this.handleSignUp}>Register</PantoButton>
          </div>
        </Modal>

        <Modal
          visible={this.state.success_modal_visible}
          dismiss={() => {
            this.setState({ success_modal_visible: false });
          }}
          name={'sign_up_successfully'}
          header={'Sign Up'}>
          <div className={'form-group'}>
            <PantoButton
              onClick={() => {
                this.setState({ success_modal_visible: false });
              }}>
              Okay
            </PantoButton>
          </div>
        </Modal>
      </PantoModals>
    );
  }
}

const stt2prp = (state) => {
  return {
    download_queue: state.download_queue,
    train_list: state.train_list,
    train_id: state.train_id,

    device_list: state.device_list,
    device_id: state.device_id,

    position_list: state.position_list,
    position: state.position,
    isDisabled: (item) => {
      return isDisabled(state, item);
    },
    isFocused: (item) => {
      return isFocused(state, item);
    }
  };
};

const dispatch2prp = (dispatch) => {
  return {
    setAddUser: (value) =>dispatch({ type: actionTypes.ADD_USER, user: value }),
    setTrain: (value) => dispatch({ type: actionTypes.CHANGE_TRAIN, value }),
    setPosition: (value) =>dispatch({ type: actionTypes.CHANGE_POSITION, value }),
    setFocused: (item) => dispatch({ type: actionTypes.SET_FOCUSED, item }),
    setBlurred: (item) => dispatch({ type: actionTypes.SET_BLURRED, item })
  };
};

export default connect(stt2prp, dispatch2prp)(SignUpModal);
