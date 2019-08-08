import React from 'react'

const FooterComponent = () => {
  const year = new Date().getFullYear()
  return (
    <React.Fragment>
      <footer className="footer-container">
        <span>&copy; {year} - xERP</span>
      </footer>
      );
    </React.Fragment>
  )
}

export const Footer = FooterComponent
