import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="abs-center wd-xl">
      <div className="text-center mb-4 mt-5">
        <div className="text-lg mb-3">404</div>
        <p className="lead m-0">We couldn't find this page.</p>
        <p>The page you are looking for does not exists.</p>
      </div>
      <div className="input-group mb-4">
        <input
          className="form-control"
          type="text"
          placeholder="Try with a search"
        />
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button">
            <em className="fa fa-search" />
          </button>
        </span>
      </div>
      <ul className="list-inline text-center text-sm mb-4">
        <li className="list-inline-item">
          <Link className="text-muted" to="/app">
            Go to App
          </Link>
        </li>
        <li className="text-muted list-inline-item">|</li>
        <li className="list-inline-item">
          <Link className="text-muted" to="/login">
            Login
          </Link>
        </li>
        <li className="text-muted list-inline-item">|</li>
        <li className="list-inline-item">
          <Link className="text-muted" to="/register">
            Register
          </Link>
        </li>
      </ul>
      <div className="p-3 text-center">
        <span className="mr-2">&copy;</span>
        <span>2019</span>
        <span className="mr-2">-</span>
        <span>xERP</span>
      </div>
    </div>
  )
}