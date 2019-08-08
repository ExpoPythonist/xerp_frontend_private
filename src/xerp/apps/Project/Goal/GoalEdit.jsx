import React from 'react'
import { Modal } from 'antd'
import GoalForm from './GoalForm'

class GoalEdit extends React.Component {

  render() {
    return (
      <Modal {...this.props}>
        {this.props.visible && <GoalForm />}
      </Modal>
    )
  }
}

export default GoalEdit