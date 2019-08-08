import React from 'react'
import { PageWrapper } from '../../../components/layout'
import 'date-fns'

class SingleTask extends React.Component{
  render() {
    return(
      <PageWrapper heading="Homepage design" subheading="Create task related issues & add comments">
        <div className="row">
          <div className="col-lg-12">
            <h3>Details</h3>
          </div>
        </div>
      </PageWrapper>
    )
  }
}

export default SingleTask