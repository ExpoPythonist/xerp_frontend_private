import React from 'react'

const PageWrapper = ({ children, unwrap }) => {
  return (
    <div className="content-wrapper">
      {unwrap ? (
        <div className="unwrap">{children}</div>
      ) : (
        children
      )}
    </div>
  )
}
export default PageWrapper;