import React from 'react'
import { Modal } from 'antd'
import ProjectForm from './ProjectForm';

class ProjectEdit extends React.Component {
  render() {
    return (
      <Modal {...this.props}>
        {this.props.visible && <ProjectForm />}
      </Modal>
    )
  }
}


export default ProjectEdit