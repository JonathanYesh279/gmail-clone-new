import { EmailSort } from './EmailSort';

import { MdRefresh } from "react-icons/md"
import { IoTrashOutline } from 'react-icons/io5';


export function EmailListNavbar({ sortBy, onSort, currentFolder,checkedEmails,  onHandleCheckedEmail, totalEmails, onRemoveCheckedEmails }) {
  return (
    <nav className='email-list-navbar'>
      <div className='checkbox-container'>
        <input
          type='checkbox'
          id='select-all'
          checked={checkedEmails.length === totalEmails}
          onChange={(ev) =>
          onHandleCheckedEmail(ev.target.checked ? 'all' : 'none')
          }
        />
        <select onChange={(ev) => onHandleCheckedEmail(ev.target.value)}>
          <option value=''>Select...</option>
          <option value='all'>All</option>
          <option value='none'>None</option>
          <option value='read'>Read</option>
          <option value='unread'>Unread</option>
          <option value='starred'>Starred</option>
          <option value='unstarred'>Unstarred</option>
        </select>
      </div>
      {currentFolder !== 'inbox' && (
        <EmailSort sortBy={sortBy} onSort={onSort} />
      )}

      <button className='refresh-icon'>
        <MdRefresh size={16} />
      </button>
      <button
        className='trash-icon'
        onClick={onRemoveCheckedEmails}
        disabled={!checkedEmails.length}
      >
        <IoTrashOutline size={16} />
      </button>
    </nav>
  );
}