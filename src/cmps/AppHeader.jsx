import { Link } from 'react-router-dom'

import gmailIconSmall from '../assets/imgs/gmailIconSmall.png'

import { EmailFilter } from "./EmailFilter"

export function AppHeader({ filterBy, onFilterBy }) {
  return (
    <header className='app-header'>
      <div className='logo'>
        <img src={gmailIconSmall} />
        <h1>Gmail</h1>
      </div>
        <EmailFilter filterBy={filterBy} onFilterBy={onFilterBy} />
      <div className='user'>
        <Link>Register</Link>
        <Link>Login</Link>
      </div>
    </header>
  );
}