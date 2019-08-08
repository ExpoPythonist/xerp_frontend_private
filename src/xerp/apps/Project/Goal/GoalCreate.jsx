import React from 'react'
import { Modal } from 'antd'
import GoalForm from './GoalForm'

class GoalCreate extends React.Component {

  render() {
    return (
      <Modal {...this.props}>
        {this.props.visible && <GoalForm {...this.props} />}
      </Modal>
    )
  }
}

export default GoalCreate