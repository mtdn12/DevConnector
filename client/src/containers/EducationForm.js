import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { withReducer, withSaga } from '../utils'
import { EducationForm } from '../components'
import { profileReducer } from '../modules/reducers'
import { profileSaga } from '../modules/sagas'
import { requestAddEdu, clearEduForm } from '../modules/actions'

class EducationFormContainer extends Component {
  static propTypes = {
    handleClearEduForm: func.isRequired,
    handlePushBack: func.isRequired,
  }
  handleGoBack = () => {
    this.props.handleClearEduForm()
    this.props.handlePushBack()
  }
  render() {
    return <EducationForm handleGoBack={this.handleGoBack} {...this.props} />
  }
}

const mapStateToProps = state => ({
  item: state.getIn(['profile', 'eduForm', 'item']),
  isLoading: state.getIn(['profile', 'eduForm', 'isLoading']),
})

const mapDispatchToProps = dispatch => ({
  handleAddEdu: values => dispatch(requestAddEdu(values)),
  handleClearEduForm: () => dispatch(clearEduForm()),
  handlePushBack: () => dispatch(push('/')),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withProfileReducer = withReducer({
  key: 'profile',
  reducer: profileReducer,
})
const withProfileSaga = withSaga({
  key: 'profile',
  saga: profileSaga,
})

export default compose(withProfileReducer, withProfileSaga, withConnect)(
  EducationFormContainer
)
