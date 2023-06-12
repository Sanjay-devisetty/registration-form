// Write your JS code here
import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    isSubmitted: false,
    showFirstNameError: false,
    showLastNameError: false,
    firstNameInput: '',
    lastNameInput: '',
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state

    return firstNameInput !== ''
  }

  onBlurFirstName = () => {
    const isValidateFirstName = this.validateFirstName()

    this.setState({showFirstNameError: !isValidateFirstName})
  }

  validateLastName = () => {
    const {lastNameInput} = this.state

    return lastNameInput !== ''
  }

  onBlurLastName = () => {
    const isValidateLastName = this.validateLastName()

    this.setState({showLastNameError: !isValidateLastName})
  }

  onChangeFirstName = event => {
    this.setState({firstNameInput: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastNameInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidateFirstName = this.validateFirstName()
    const isValidateLastName = this.validateLastName()

    if (isValidateFirstName && isValidateLastName) {
      this.setState({isSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidateFirstName,
        showLastNameError: !isValidateLastName,
        isSubmitted: false,
      })
    }
  }

  renderForm = () => {
    const {showFirstNameError, showLastNameError} = this.state
    const firstNameErrMsg = showFirstNameError ? 'Required' : ''
    const lastNameErrMsg = showLastNameError ? 'Required' : ''

    const firstNameErrMsgClassName = showFirstNameError
      ? 'input-element blurred-input-element'
      : 'input-element'

    const lastNameErrMsgClassName = showLastNameError
      ? 'input-element blurred-input-element'
      : 'input-element'

    return (
      <>
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <label htmlFor="firstName" className="label-element">
            FIRST NAME
          </label>
          <input
            className={firstNameErrMsgClassName}
            id="firstName"
            type="text"
            placeholder="First name"
            onBlur={this.onBlurFirstName}
            onChange={this.onChangeFirstName}
          />
          {firstNameErrMsg && <p className="blurred">Required</p>}
          <label htmlFor="firstName" className="label-element">
            LAST NAME
          </label>
          <input
            className={lastNameErrMsgClassName}
            id="lastName"
            type="text"
            placeholder="Last name"
            onBlur={this.onBlurLastName}
            onChange={this.onChangeLastName}
          />
          {lastNameErrMsg && <p className="blurred">Required</p>}
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </>
    )
  }

  submitAnotherResponse = () => {
    this.setState(prevState => ({
      isSubmitted: !prevState.isSubmitted,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }

  renderSuccessCard = () => (
    <div className="success-card-container">
      <img
        className="success-image"
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p className="submitted-description">Submitted Successfully</p>
      <button
        type="button"
        className="success-button"
        onClick={this.submitAnotherResponse}
      >
        Submit another response
      </button>
    </div>
  )

  render() {
    const {isSubmitted} = this.state

    return (
      <div className="app-bg-container">
        <h1 className="app-heading"> Registration</h1>
        <div className="bottom-container">
          {isSubmitted ? this.renderSuccessCard() : this.renderForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
