import React from 'react'
import { Modal } from 'antd'
import { TaskForm } from '../Task'

class CreateTask extends React.Component {

  render(){
    return (
      <Modal {...this.props}>
        <TaskForm />
      </Modal>
    )
  }
}

export default CreateTask