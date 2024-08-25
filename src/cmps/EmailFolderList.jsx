import inboxIcon from '../assets/imgs/inboxIcon.svg'
import sentIcon from '../assets/imgs/sentIcon.svg'
import starIcon from '../assets/imgs/starIcon.svg'
import envelopeIcon from '../assets/imgs/envelopeIcon.svg'
import trashIcon from '../assets/imgs/trashIcon.svg'
import pencilIcon from '../assets/imgs/pencilIcon.svg'
import draftIcon from '../assets/imgs/draftIcon.png'

export function EmailFolderList({ filterBy, onFilterFolderChange, onResetFilters, activeFolder, onModalOpen}) {
  return (
    <nav className='nav-filters'>
      <button className='btn-compose' onClick={onModalOpen}>
        <img src={pencilIcon} alt='pencil' />
        Compose
      </button>
      <div>
        <button
          className={`btn ${activeFolder === 'inbox' ? 'active' : ''}`}
          onClick={() => onFilterFolderChange('folder', 'inbox')}
        >
          <img src={inboxIcon} alt='inbox' />
          Inbox
        </button>
        <button
          className={`btn ${activeFolder === 'sent' ? 'active' : ''}`}
          onClick={() => onFilterFolderChange('folder', 'sent')}
        >
          <img src={sentIcon} alt='sent' />
          Sent
        </button>
        <button
          className={`btn ${activeFolder === 'starred' ? 'active' : ''}`}
          onClick={() => onFilterFolderChange('isStarred', true)}
        >
          <img src={starIcon} alt='star' />
          Starred
        </button>
        <button
          className={`btn ${activeFolder === 'all' ? 'active' : ''}`}
          onClick={onResetFilters}
        >
          <img src={envelopeIcon} alt='envelope' />
          All Mails
        </button>
        <button
          className={`btn ${activeFolder === 'trash' ? 'active' : ''}`}
          onClick={() => onFilterFolderChange('folder', 'trash')}>
          <img src={trashIcon} alt='trash' />
          Trash
        </button>
        <button className={`btn ${activeFolder === 'draft' ? 'active' : ''}`}>
          <img src={draftIcon} alt='draft' />
          Draft
        </button>
        <div className='dropdown-menu'>
          <label>Read/Unread</label>
          <select
            value={filterBy.isRead}
            onChange={(ev) => onFilterFolderChange('isRead', ev.target.value)}
          >
            <option value=''>All</option>
            <option value='true'>Read</option>
            <option value='false'>Unread</option>
          </select>
        </div>
      </div>
    </nav>
  );
}