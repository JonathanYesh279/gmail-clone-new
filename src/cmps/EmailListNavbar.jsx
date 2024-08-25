import refreshIcon from '../assets/imgs/refreshIcon.png';

export function EmailListNavbar() {
  return (
    <nav className='email-list-navbar'>
      <div className='checkbox-container'>
      <input type='checkbox' id='select-all' />
      <select>
        <option value=''>Select...</option>
        <option value='all'>All</option>
        <option value='none'>None</option>
        <option value='read'>Read</option>
        <option value='unread'>Unread</option>
        <option value='starred'>Starred</option>
        <option value='unstarred'>Unstarred</option>
        </select>
      </div>
      <button>
        <img src={refreshIcon} alt="refresh" />
      </button>
    </nav>
  );
}