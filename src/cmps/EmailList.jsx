import { Link } from "react-router-dom"
import { EmailPreview } from "./EmailPreview"
import { EmailListNavbar } from "./EmailListNavbar"

export function EmailList({ emails, onRemoveEmail, onToggleStar, onEmailRead, checkedEmails, onCheckedEmail, onHandleCheckedEmail, onRemoveCheckedEmails, currentFolder, onSort, sortBy }) { 

if (!emails) return <h1>Loading...</h1>
  
  return (
    <section className='email-list'>
      <EmailListNavbar
        sortBy={sortBy}
        onSort={onSort}
        currentFolder={currentFolder}
        checkedEmails={checkedEmails}
        onHandleCheckedEmail={onHandleCheckedEmail}
        onRemoveCheckedEmails={onRemoveCheckedEmails}
        totalEmails={emails.length}
      />
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            {email.isDraft ? (
              <Link
                to={`/mail/${currentFolder}?compose=new&draftId=${email.id}`}
                className='link-to'
              >
                <EmailPreview
                  email={email}
                  onRemoveEmail={onRemoveEmail}
                  onToggleStar={onToggleStar}
                  onEmailRead={onEmailRead}
                  onCheckedEmail={onCheckedEmail}
                  isChecked={checkedEmails.includes(email.id)}
                  currentFolder={currentFolder}
                />
              </Link>
            ) : (
              <Link
                to={`/mail/${currentFolder}/${email.id}`}
                className='link-to'
              >
                <EmailPreview
                  email={email}
                  onRemoveEmail={onRemoveEmail}
                  onToggleStar={onToggleStar}
                  onEmailRead={onEmailRead}
                  onCheckedEmail={onCheckedEmail}
                  isChecked={checkedEmails.includes(email.id)}
                  currentFolder={currentFolder}
                />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}