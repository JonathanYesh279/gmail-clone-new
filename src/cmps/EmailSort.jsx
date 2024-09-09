export function EmailSort({ onSort }) {
  return (
    <div className='email-sort'>
      <button className='btn-sort' onClick={() => onSort('sentAt')}>
        Sort by Date
      </button>
      <button className='btn-sort' onClick={() => onSort('subject')}>
        Sort by Subject
      </button>
      <button className='btn-sort' onClick={() => onSort('isRead')}>
        Is unread
      </button>
    </div>
  );
}