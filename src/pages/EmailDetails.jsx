import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { emailService } from '../service/email.service'

import leftArrow from '../assets/imgs/backIcon.png'


export function EmailDetails() {
  const [email, setEmail] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    loadEmail()
  }, [id])

  async function loadEmail() {
    const email = await emailService.getById(id)
    setEmail(email)
  }


  if (!email) return <h1>Loading...</h1>

  return (
    <section className='email-details'>
      <nav>
        <Link to='/email'>
          <img src={leftArrow} alt='Back to email list' />
        </Link>
      </nav>
      <h1>{email.subject}</h1>
      <header className='email-details-header'>
        <div className='header-section-a'>
          <div>
            <h4>{email.from.name}</h4>
            <h5>{`<${email.from.emailAddress}>`}</h5>
          </div>
          <h5>{email.to.email}</h5>
        </div>
        <div className='header-section-b'>
          <h5>{email.sentAtDetails}</h5>
        </div>
      </header>
      <main className='email-details-main'>
        <h4>{email.from.name}</h4>
        <p>{email.body}</p>
      </main>
    </section>
  )
}