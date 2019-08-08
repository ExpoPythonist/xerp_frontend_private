import React from 'react'
const setErrToast = (err) => {
  return (
    <React.Fragment>
      <p className="text-bold">Error - {err.status}</p>
      {Object.keys(err.data).map((key) => (
        <p>{key}: {err.data[key]}</p>
      ))}
    </React.Fragment>
  )
}

export default setErrToast