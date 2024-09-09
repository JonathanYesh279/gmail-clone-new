import { Link } from 'react-router-dom'

import menuIcon from '../assets/imgs/menuIcon.png'
import gmailIconSmall from '../assets/imgs/gmailIconSmall.png'
import { IoIosHelpCircle } from 'react-icons/io';

import { EmailFilter } from "./EmailFilter"
import { BackgroundSelector } from './BackgroundSelector';

export function AppHeader({ filterBy, onFilterBy, onToggleSideBar }) {
  return (
    <header className='app-header'>
      <div className='menu' onClick={onToggleSideBar}>
        <img src={menuIcon} />
      </div>
      <div className='logo'>
        <img src={gmailIconSmall} />
        <h1>Gmail</h1>
      </div>
      <EmailFilter filterBy={filterBy} onFilterBy={onFilterBy} />
      <BackgroundSelector />
      <div className='user'>
        <Link to={'/mail/inbox?compose=new&to=help@gmail.com&subject=Help'}><IoIosHelpCircle size={24}/></Link>
        <Link>Register</Link>
        <Link>Login</Link>
      </div>
    </header>
  );
}