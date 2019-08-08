import React from 'react'
import { Modal } from 'antd'
import TaskForm from './TaskForm';

class TaskEdit extends React.Component {

  render() {
    return (
      <Modal {...this.props}>
        <TaskForm />
      </Modal>
    )
  }
}

export default TaskEdit