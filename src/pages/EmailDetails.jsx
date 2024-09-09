import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { emailService } from '../service/email.service'

import { GoogleMap } from '../cmps/GoogleMap'

import leftArrow from '../assets/imgs/backIcon.png'
import { FaUserCircle } from 'react-icons/fa'




export function EmailDetails() {
  const [email, setEmail] = useState(null)
  const { folder, id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadEmail()
  }, [id])

  async function loadEmail() {
    try {
      let email = await emailService.getById(id)
      if (!email.isRead) {
        email = await emailService.markAsRead(id)  
      }
      setEmail(email)
    } catch (err) { 
      console.log('Failed to load email:', err)
      navigate(`/mail/${folder}`)
    }
  }

  function handleBack() {
    navigate(`/mail/${folder}`)
  }


  if (!email) return <h1>Loading...</h1>

  return (
    <section className='email-details'>
      <nav>
        <button onClick={handleBack} className='back-button'>
          <img src={leftArrow} alt='Back to email list' />
        </button>
      </nav>
      <h1>{email.subject}</h1>
      <div className='email-details-container'>
        <header className='email-details-header'>
          <div className='header-section-a'>
            <FaUserCircle color='lightblue' size={38} />
            <div>
              <h4>{email.from.name}</h4>
              <h5>{`<${email.from.email}>`}</h5>
            </div>
            <h5>{email.to.email}</h5>
          </div>
          <div className='header-section-b'>
            <h5>{email.sentAtDetails}</h5>
          </div>
        </header>
        <main className='email-details-main'>
          <p>{email.body}</p>
        {email.location && (
          <div className='email-details-map'>
            <GoogleMap lat={email.location.lat} lng={email.location.lng} />
          </div>
        )}
        </main>
        <footer>
          <button className='action-btn'>Reply</button>
          <button className='action-btn'>Forward</button>
        </footer>
      </div>
    </section>
  );
}