import { NavLink, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import inboxIcon from '../assets/imgs/inboxIcon.svg'
import sentIcon from '../assets/imgs/sentIcon.svg'
import starIcon from '../assets/imgs/starIcon.svg'
import envelopeIcon from '../assets/imgs/envelopeIcon.svg'
import trashIcon from '../assets/imgs/trashIcon.svg'
import pencilIcon from '../assets/imgs/pencilIcon.svg'
import draftIcon from '../assets/imgs/draftIcon.png'

export function EmailFolderList({
  onFilterFolderChange,
  onResetFilters,
  currentFolder,
  isExpanded,
}) {
  const navigate = useNavigate();

  function handleCompose(to = '', subject = '', body = '') {
  navigate(`/mail/${currentFolder}?compose=new&to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
}

  return (
    <nav className={`nav-filters ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button
        className={`btn-compose ${!isExpanded && 'icon-only'}`}
        onClick={handleCompose}
      >
        <img src={pencilIcon} alt='pencil' />
        {isExpanded && <span>Compose</span>}
      </button>

      <div>
        <NavLink
          to='/mail/inbox'
          className={({ isActive }) =>
            `btn ${isActive ? 'active' : ''} ${isExpanded ? '' : 'icon-only'}`
          }
          onClick={() => onFilterFolderChange({ folder: 'inbox' })}
        >
          <img src={inboxIcon} alt='inbox' />
          {isExpanded && <span>Inbox</span>}
        </NavLink>
        <NavLink
          to='/mail/sent'
          className={({ isActive }) =>
            `btn ${isActive ? 'active' : ''} ${isExpanded ? '' : 'icon-only'}`
          }
          onClick={() => onFilterFolderChange({ folder: 'sent' })}
        >
          <img src={sentIcon} alt='sent' />
          {isExpanded && <span>Sent</span>}
        </NavLink>
        <NavLink
          to='/mail/starred'
          className={({ isActive }) =>
            `btn ${isActive ? 'active' : ''} ${isExpanded ? '' : 'icon-only'}`
          }
          onClick={() => onFilterFolderChange({ folder: 'starred' })}
        >
          <img src={starIcon} alt='star' />
          {isExpanded && <span>Starred</span>}
        </NavLink>
        <NavLink
          to='/mail/all'
          className={({ isActive }) =>
            `btn ${isActive ? 'active' : ''} ${isExpanded ? '' : 'icon-only'}`
          }
          onClick={onResetFilters}
        >
          <img src={envelopeIcon} alt='envelope' />
          {isExpanded && <span>All Mails</span>}
        </NavLink>
        <NavLink
          to='/mail/trash'
          className={({ isActive }) =>
            `btn ${isActive ? 'active' : ''} ${isExpanded ? '' : 'icon-only'}`
          }
          onClick={() => onFilterFolderChange({ folder: 'trash' })}
        >
          <img src={trashIcon} alt='trash' />
          {isExpanded && <span>Trash</span>}
        </NavLink>
        <NavLink
          to='/mail/drafts'
          className={({ isActive }) =>
            `btn ${isActive ? 'active' : ''} ${isExpanded ? '' : 'icon-only'}`
          }
          onClick={() => onFilterFolderChange({ folder: 'drafts' })}
        >
          <img src={draftIcon} alt='draft' />
          {isExpanded && <span>Drafts</span>}
        </NavLink>
      </div>
    </nav>
  );
}

EmailFolderList.propTypes = {
  onFilterFolderChange: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  currentFolder: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
}