import React from 'react'
import { Link } from 'react-router-dom'

export const DBCard = ({
  xl,
  lg,
  sm,
  heading,
  subheading,
  icon,
  viewText,
  linkTo,
  variant,
  size
}) => (
  <div className={`col-xl-${xl || '3'} col-lg-${lg || '3'} col-md-${sm || 6}`}>
    <div className={`card bg-${variant} border-0`}>
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col-3">
            <em className={`fa ${icon} fa-${size || 5}x`}/>
          </div>
          <div className="col-9 text-right">
            <div className="text-lg">{heading}</div>
            <p className="m-0">{subheading}</p>
          </div>
        </div>
      </div>
      <Link
        className="card-footer bg-gray-dark bt0 clearfix btn-block d-flex"
        to={linkTo || '#'}
      >
        <span>{viewText || 'View Details'}</span>
        <span className="ml-auto">
          <em className="fa fa-chevron-circle-right"/>
        </span>
      </Link>
    </div>
  </div>
)
