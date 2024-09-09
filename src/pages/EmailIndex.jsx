import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams, useSearchParams, Outlet } from "react-router-dom"

import { emailService } from "../service/email.service"
import { showErrorMsg, showSuccessMsg } from '../service/eventBus.service' 

import { EmailCompose } from "../pages/EmailCompose"

import { AppHeader } from "../cmps/AppHeader"
import { EmailList } from "../cmps/EmailList"
import { EmailFolderList } from "../cmps/EmailFolderList"


export function EmailIndex() {
  const [emails, setEmails] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const { folder, id } = useParams()
  const navigate = useNavigate()

  const [filterBy, setFilterBy] = useState({
    txt: searchParams.get('txt') || '',
    isRead: searchParams.get('isRead') || '', folder: folder || 'inbox',
    isStarred: searchParams.get('isStarred') === 'true' ? true : null
  })
  const [sortBy, setSortBy] = useState({
    field: searchParams.get('sortBy') || 'sentAt',
    order: searchParams.get('order') || 'desc',
  })
  const [checkedEmails, setCheckedEmails] = useState([])
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(true)

  useEffect(() => {
    loadEmails()
  }, [filterBy, folder, sortBy])

  useEffect(() => {
    if (filterBy.folder) {
      updateSearchParams(filterBy)
      navigate(`/mail/${filterBy.folder}`)
    }
  }, [filterBy.folder])


  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy)
      const sortedEmails = sortEmails(emails, sortBy)
      setEmails(sortedEmails)
    } catch (err) {
      console.error('Error loading emails', err)
    }
  }
  
  async function handleSendEmail(emailData) {
    try {
      const { to, subject, body, location } = emailData
      const newEmail = emailService.createEmail(to, subject, body, location)
      const savedEmail = await emailService.save(newEmail)
      console.log(savedEmail)
      setEmails(prevEmails => [savedEmail, ...prevEmails])
      navigate('/')
      showSuccessMsg('Email sent successfully')
    } catch (err) {
      console.error('Failed to send email', err)
      showErrorMsg('Failed to send email')
    }
  }

  async function removeEmail(emailId) {
    try {
      const email = await emailService.getById(emailId)

      if (filterBy.folder === 'trash') {
        confirm('This action will permanently delete the email. Are you sure you want to proceed?')
        await emailService.remove(emailId)
        showSuccessMsg('Email has been deleted successfully')
      } else {
        email.removedAt = Date.now()
        email.isStarred = false
        await emailService.save(email)
        showSuccessMsg('Email has been removed successfully')
      }
      setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
    } catch (err) {
      console.error('Error removing email', err)
      showErrorMsg('Error removing email')
    }
  }

  async function toggleStar(emailId) {
    try {
      const updatedEmail = await emailService.toggleStar(emailId)
      setEmails(emails.map(email => email.id === emailId ? updatedEmail : email))
    } catch (err) {
      console.error('Error toggling star', err)
    }
  }
  
  async function onEmailRead(emailId) {
    try {
      const updatedEmail = await emailService.markAsRead(emailId)
      setEmails(emails => emails.map(email => email.id === emailId ? updatedEmail : email))
    } catch (err) {
      console.error('Error reading email', err)
    }
  }

  function updateSearchParams(newParams) {
    setSearchParams(prevParams => {
      const updatedParams = new URLSearchParams(prevParams)
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          updatedParams.set(key, value)
        } else {
          updatedParams.delete(key)
        }
      })
      return updatedParams
    })
  }

  function onFilterBy(newFilterBy) {
    setFilterBy(prevFilterBy => {
      const updatedFilterBy = { ...prevFilterBy, ...newFilterBy }
      updateSearchParams(updatedFilterBy)
      return updatedFilterBy
    })
  }

  function handleSort(field) {
    setSortBy((prevSortBy) => {
      const updatedSortBy = {
        field,
        order: prevSortBy.field === field && prevSortBy.order === 'asc' ? 'desc' : 'asc',
      }
      updateSearchParams(updatedSortBy)
      return updatedSortBy
    })  
  }

  function handleFilterFolderChange(newFilterFolder) {
     setFilterBy(prev => {
       const updated = { ...prev, ...newFilterFolder }

       if (updated.folder === 'starred') {
         updated.isStarred = true;
       } else {
         updated.isStarred = null;
       }
       return updated
     })

     navigate(`/mail/${newFilterFolder.folder}`)
  }

  function resetFilters() {
    const resetFilters = { txt: '', isRead: '', folder: 'inbox', isStarred: null }
    setFilterBy(resetFilters)
    updateSearchParams(resetFilters)
    navigate('/')
  }

  function handleCheckedEmail(emailId, isChecked) {
    setCheckedEmails(prevCheckedeEmails => {
      if (isChecked) {
        return [...prevCheckedeEmails, emailId]
      } else {
        return prevCheckedeEmails.filter(id => id !== emailId)
      }
    })
  }

  function handleRemoveCheckedEmails() {
    if (filterBy.folder === 'trash') {
      confirm('This action will permanently delete the emails. Are you sure you want to proceed?')
      checkedEmails.forEach(emailId => removeEmail(emailId))
      setCheckedEmails([])
    } else {
      checkedEmails.forEach(async emailId => {
        const email = await emailService.getById(emailId)
        email.removedAt = Date.now()
        email.isStarred = false
        await emailService.save(email)
        setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
      })
      setCheckedEmails([])
      showSuccessMsg('Emails have been removed successfully')
    }
  }
  
  function handleSelectedCheckbox(option) {
    let updatedCheckedEmails = []
    switch (option) { 
      case 'all':
        updatedCheckedEmails = emails.map(email => email.id)
        break;
      case 'none':
        updatedCheckedEmails = []
        break;
      case 'read':
        updatedCheckedEmails = emails.filter(email => email.isRead).map(email => email.id)
        break;
      case 'unread':
        updatedCheckedEmails = emails.filter(email => !email.isRead).map(email => email.id)
        break;
      case 'starred':
        updatedCheckedEmails = emails.filter(email => email.isStarred).map(email => email.id)
        break;
      case 'unstarred':
        updatedCheckedEmails = emails.filter(email => !email.isStarred).map(email => email.id)
        break;
      default:
        break;
    }
    setCheckedEmails(updatedCheckedEmails)
    updateSearchParams({ checked: updatedCheckedEmails.join(',') })
  }

  function sortEmails(emails, { field, order }) {
    return [...emails].sort((emailA, emailB) => {
      switch (field) {
        case 'sentAt':
          const timeA = new Date(emailA.sentAt).getTime()
          const timeB = new Date(emailB.sentAt).getTime()
          return order === 'asc' ? timeB - timeA : timeA - timeB
        
        case 'subject':
          return order === 'asc'
            ? emailA.subject.localeCompare(emailB.subject)
            : emailB.subject.localeCompare(emailA.subject)
        
        case 'isRead':
          return order === 'asc'
            ? emailA.isRead - emailB.isRead
            : emailB.isRead - emailA.isRead
        
        default:
          return 0
      }
    })
  }

  function toggleSideBar() {
    setIsSideBarExpanded(prev => !prev)
  }



  if (!emails) return <h1>Loading...</h1>
  return (
    <div className={`email-index-container ${isSideBarExpanded ? '' : 'sidebar-collapsed'}`}>
      <AppHeader filterBy={filterBy} onFilterBy={onFilterBy} onToggleSideBar={toggleSideBar} />
      <div className={`email-content ${isSideBarExpanded ? '' : 'collapsed'}`}>
        <EmailFolderList
          filterBy={filterBy}
          onFilterFolderChange={handleFilterFolderChange}
          onResetFilters={resetFilters}
          activeFolder={filterBy.folder}
          currentFolder={folder}
          isExpanded={isSideBarExpanded}
        />
        <section className={`email-index ${isSideBarExpanded ? '' : 'sidebar-collapsed'}`}>
          {!id && (
            <EmailList
              sortBy={sortBy}
              onSort={handleSort}
              emails={emails}
              onRemoveEmail={removeEmail}
              onRemoveCheckedEmails={handleRemoveCheckedEmails}
              checkedEmails={checkedEmails}
              onCheckedEmail={handleCheckedEmail}
              onHandleCheckedEmail={handleSelectedCheckbox}
              onToggleStar={toggleStar}
              onEmailRead={onEmailRead}
              currentFolder={folder}
            />
          )}
          <Outlet/>
          {searchParams.get('compose') && (
            <EmailCompose
              onEmailSend={handleSendEmail}
              onCloseCompose={() => navigate('/mail/drafts')}
            />
          )}
        </section>
      </div>
    </div>
  )
}