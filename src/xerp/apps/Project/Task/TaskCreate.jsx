import React from 'react'
import { Modal } from 'antd'
import TaskForm from './TaskForm';

class CreateTask extends React.Component {

  render() {
    return (
      <Modal {...this.props}>
        {this.props.visible && <TaskForm />}
      </Modal>
    )
  }
}

export default CreateTask