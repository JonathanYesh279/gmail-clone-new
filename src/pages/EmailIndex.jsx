import { useState, useEffect } from "react"
import { emailService } from "../service/email.service"

import { EmailList } from "../cmps/EmailList"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { Outlet, useParams } from "react-router-dom"
import { EmailCompose } from "../cmps/EmailCompose"


export function EmailIndex({ filterBy, setFilterBy }) {
  const [emails, setEmails] = useState([])
  const [checkedEmails, setCheckedEmails] = useState([])
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { id } = useParams()

  useEffect(() => { 
    loadEmails()
  }, [filterBy])
  
  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy)
      setEmails(emails)
    } catch (err) {
      console.error('Error loading emails', err)
    }
  }

  async function removeEmail(emailId) {
        try {
          const updatedEmail = await emailService.getById(emailId)
          updatedEmail.removedAt = Date.now()
          await emailService.save(updatedEmail)

          setEmails(prevEmails => {
            if (filterBy.folder === 'trash') {
              return prevEmails.map((email) => email.id === emailId ? updatedEmail : email)
            } else {
               return prevEmails.filter((email) => email.id !== emailId)
            }
          })
          console.log('Email removed to trash successfully')
        } catch (err) {
          console.error('Error removing email', err)
        }
  }
  
  async function toggleStar(emailId) {
    try {
      const updatedEmail = await emailService.toggleStar(emailId)
      setEmails(emails.map(email => email.id === emailId ? updatedEmail :email))
    } catch (err) {
      console.error('Error toggling star', err)
    }
  }
  
  async function onEmailRead(emailId) {
    try {
      const updatedEmail = await emailService.markAsRead(emailId)
      setEmails(emails.map(email => email.id === emailId ? updatedEmail : email))
    } catch (err) {
      console.error('Error reading email', err)
    }
  }
  
  function handleCheckedEmail(emailId, isChecked) {
    setCheckedEmails(prevCheckedEmails => {
      if (isChecked) {
        return [...prevCheckedEmails, emailId]
      } else {
        return prevCheckedEmails.filter(id => id !== emailId) 
      }
    })
  }
  
  function handleFilterFolderChange(filterType, value) {
    setFilterBy(prevFilterBy => {
      const newFilterBy = { ...prevFilterBy, folder: null, isStarred: null }
        if (filterType === 'folder') {
          newFilterBy.folder = value
          setActiveFolder(value)
          

        } else if (filterType === 'isStarred') {
          newFilterBy.isStarred = value
          setActiveFolder('starred')

        } else if (filterType === 'isRead') {
          newFilterBy.isRead = value
        } 
      
        return newFilterBy
    })
  }
  
  function resetFilters() {
    setFilterBy({ txt: '', isRead: '', inbox: null, isStarred: null })
    setActiveFolder('all')
  }

  function handleModalOpen() {
    setIsModalOpen(true)
  }



  if (!emails) return <h1>Loading...</h1>
  return (
    <>
      <EmailFolderList
        filterBy={filterBy}
        onFilterFolderChange={handleFilterFolderChange}
        onResetFilters={resetFilters}
        activeFolder={activeFolder}
        onModalOpen={handleModalOpen}
      />
        <section className='email-index'>
          {!id ? (
            <EmailList
              emails={emails}
              onRemoveEmail={removeEmail}
              onToggleStar={toggleStar}
              onEmailRead={onEmailRead}
              checkedEmails={checkedEmails}
              onCheckedEmail={handleCheckedEmail}
              currentFolder={filterBy.folder}
            />
          ) : (
            <Outlet />  
          )} 
      </section>
      <EmailCompose isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}