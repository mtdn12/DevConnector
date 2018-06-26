import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { withReducer, withSaga } from '../utils'
import { ExperienceForm } from '../components'
import { profileReducer } from '../modules/reducers'
import { profileSaga } from '../modules/sagas'
import { requestAddExp, clearExprForm } from '../modules/actions'

class ExperienceFormContainer extends Component {
  static propTypes = {
    handleClearExpForm: func.isRequired,
    handlePushBack: func.isRequired,
  }
  handleGoBack = () => {
    this.props.handleClearExpForm()
    this.props.handlePushBack()
  }
  render() {
    return <ExperienceForm handleGoBack={this.handleGoBack} {...this.props} />
  }
}

const mapStateToProps = state => ({
  item: state.getIn(['profile', 'expForm', 'item']),
  isLoading: state.getIn(['profile', 'expForm', 'isLoading']),
})

const mapDispatchToProps = dispatch => ({
  handleAddExp: values => dispatch(requestAddExp(values)),
  handleClearExpForm: () => dispatch(clearExprForm()),
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
  ExperienceFormContainer
)
