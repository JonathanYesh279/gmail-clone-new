import trash from '../assets/imgs/trash.svg'
import emptyStar from '../assets/imgs/emptyStar.png'
import goldenStar from '../assets/imgs/goldenStar.png'
import openEnvelope from '../assets/imgs/openEnvelope.png';

export function EmailPreview({ email, onRemoveEmail, onToggleStar, onEmailRead, onCheckedEmail, isChecked, currentFolder }) {

  const wordLimit = 12
  const baseBackgroundColor = email.isRead ? '#C4CDD8' : '#D8E2ED'
  const checkedBackgroundColor = '#C2DBFF'
  const backgroundColor = isChecked ? checkedBackgroundColor : baseBackgroundColor
  const fontWeight = email.isRead ? 'normal' : '600'

  function limitWords(str, wordLimit) {
    const words = str.split(/\s+/)
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
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
    onEmailRead(email.id);
  }
  
  function handleCheckboxChange(ev) {
    ev.stopPropagation()
    onCheckedEmail(email.id, ev.target.checked)
  }

function displaySenderRecipientName() {
  if (currentFolder === 'sent') {
    return `To: ${email.to.name}`;
  } else {
    return email.from.name;
  }
}
  

  const paragraphStyle = { fontWeight }

  return (
    <section
      className='email-preview'
      style={{ backgroundColor }}
      onClick={handleEmailIsRead}
    >
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
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
        <span className='body-span'>-{limitWords(email.body, wordLimit)}</span>
      </div>
        <p className='email-sentAt' style={paragraphStyle}>
          {email.sentAt}
        </p>

      <div className='buttons-container-hover'>
        <button onClick={handleRemoveClick} className='btn-icon'>
          <img src={trash} alt='trash' />
        </button>
        <button onClick={handleEmailIsRead} className='btn-icon'>
          <img src={openEnvelope} alt='envelope' />
        </button>
      </div>
    </section>
  );
}