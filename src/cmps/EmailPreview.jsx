import trash from '../assets/imgs/trash.svg'
import emptyStar from '../assets/imgs/emptyStar.png'
import goldenStar from '../assets/imgs/goldenStar.png'
import openEnvelope from '../assets/imgs/openEnvelope.png'


export function EmailPreview({ email, onRemoveEmail, onToggleStar, onEmailRead, onCheckedEmail, isChecked, currentFolder }) {

  const limit = 20

  const isSentFolder = currentFolder === 'sent'
  const baseBackgroundColor = isSentFolder || email.isRead ? '#C4CDD8' : '#D8E2ED'
  const checkedBackgroundColor = '#C2DBFF'
  const backgroundColor = isChecked ? checkedBackgroundColor : baseBackgroundColor

  const fontWeight = isSentFolder || email.isRead ? 'normal' : '600'

  function limitWords(str, limit) {
    const words = str.split(/\s+/)
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...'
    }
    return str
  }
    
  function handleStarClick(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        onToggleStar(email.id)
  }

  function handleRemoveClick(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        onRemoveEmail(email.id)
  }
  
  function handleEmailIsRead(ev) {
    ev.stopPropagation()
    onEmailRead(email.id)
  }

  function handleToggleRead(ev) {
    ev.stopPropagation()
    onEmailRead(email.id)
  }
  
  function displaySenderRecipientName() {
  if (currentFolder === 'sent') {
    return `To: ${email.to}`
  } else {
    return email.from && email.from.name ? email.from.name : 'Unknown Sender'
  }
  }
  

  const paragraphStyle = { fontWeight }

  return (
    <section
      className='email-preview-desktop'
      style={{ backgroundColor }}
      onClick={handleEmailIsRead}
    >
      <input
        type='checkbox'
        checked={isChecked}
        onChange={(ev) => onCheckedEmail(email.id, ev.target.checked)}
        onClick={(ev) => ev.stopPropagation()}
      />
      <img
        className='star-icon'
        onClick={handleStarClick}
        src={email.isStarred ? goldenStar : emptyStar}
      />
      <p className='sender-name' style={{ fontWeight }}>
        {displaySenderRecipientName()}
      </p>
      <div className='subject-body-container'>
        <span className='subject-span' style={{ fontWeight }}>
          {email.subject}
        </span>
        <span className='body-span'>-{limitWords(email.body, limit)}</span>
      </div>
      <p className='email-sentAt' style={paragraphStyle}>
        {email.sentAt}
      </p>
      <div className='buttons-container-hover'>
        <button onClick={handleRemoveClick} className='btn-icon'>
          <img src={trash} alt='trash' />
        </button>
        <button onClick={handleToggleRead} className='btn-icon'>
          <img src={openEnvelope} alt='envelope' />
        </button>
      </div>
    </section>
  );
}