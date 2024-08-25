import { Link } from "react-router-dom"
import { EmailPreview } from "./EmailPreview"
import { EmailListNavbar } from "./EmailListNavbar"

export function EmailList({ emails, onRemoveEmail, onToggleStar, onEmailRead, checkedEmails, onCheckedEmail, currentFolder }) { 

if (!emails) return <h1>Loading...</h1>
  
  return (
    <section className="email-list"> 
        <EmailListNavbar />
        <ul>
        {emails.map(email => (
          <li key={email.id}> 
            <Link to={`/email/${email.id}`} className="link-to">
              <EmailPreview email={email} onRemoveEmail={onRemoveEmail} onToggleStar={onToggleStar} onEmailRead={onEmailRead} onCheckedEmail={onCheckedEmail} isChecked={checkedEmails.includes(email.id)} currentFolder={currentFolder} />
            </Link>
          </li>
          ))}
        </ul>
      </section>
  )
}