import React from 'react'
import { Modal } from 'antd'
import ProjectForm from './ProjectForm';

class ProjectCreate extends React.Component {
  render() {
    return (
      <Modal {...this.props}>
        {this.props.visible && <ProjectForm />}
      </Modal>
    )
  }
}

export default ProjectCreate