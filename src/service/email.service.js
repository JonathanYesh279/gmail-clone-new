import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
  query,
  save,
  remove,
  getById,
  toggleStar,
  getDefualtEmail,
  markAsRead,
  createEmail,
}

const STORAGE_KEY = 'emails'

const _loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Yonathan Yesh',
}

_createEmails()

async function query(filterBy = {}) {
  let emails = await storageService.query(STORAGE_KEY)

  if (filterBy) {
    // Filter by text
    if (filterBy.txt) {
      const searchText = filterBy.txt.toLowerCase()
      emails = emails.filter(email => email.subject.toLowerCase().includes(searchText) || email.from.name.toLowerCase().includes(searchText) || email.body.toLowerCase().includes(searchText))
    }
    // Filter by read status
    if (filterBy.isRead !== '') {
      const isRead = filterBy.isRead === 'true'
      emails = emails.filter(email => email.isRead === isRead)
    }
    
    // Filter by starred status
    if (filterBy.isStarred === true) {
      emails = emails.filter(email => email.isStarred === true)
    }

    // Filter by folder : inbox/sent/trash/all etc.
    if (filterBy.folder) {
      switch (filterBy.folder) {
        case 'trash':
          emails = emails.filter((email) => email.removedAt)
          break;
        case 'all':
          emails = emails.filter((email) => !email.removedAt && !email.isDraft)
          break;
        case 'drafts':
          emails = emails.filter((email) => email.isDraft && !email.removedAt)
          break;
        default:
          emails = emails.filter(
            (email) => email.folder === filterBy.folder && !email.removedAt && !email.isDraft)
      }
    } 
  }
  return emails
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.get(STORAGE_KEY, emailToSave.id)
      .then(() => storageService.put(STORAGE_KEY, emailToSave))
      .catch(() => storageService.post(STORAGE_KEY, emailToSave))
  } else {
    return storageService.post(STORAGE_KEY, emailToSave)
  }
}

async function toggleStar(emailId) {
  const email = await getById(emailId)
  email.isStarred = !email.isStarred
  return save(email)
}

async function markAsRead(emailId) {
  const email = await getById(emailId)
  if (!email.isRead) {
    return storageService.put(STORAGE_KEY, { ...email, isRead: true })
  }
  return email
 }
 
 export function createEmail(to, subject, body, location=null) {
   return {
     id: utilService.makeId(),
     subject,
     body,
     isRead: true,
     isStarred: false,
     folder: 'sent',
     sentAtDetails: utilService.getCurrentDate(),
     sentAt: utilService.getCurrentDate(),
     removedAt: null,
     from: {
       name: 'Yonatan Yesh',
       email: 'user@apsus.com',
     },
     to: to,
     checked: false,
     location: location,
   };
 }
 
export function getDefualtEmail() {
  return {
    id: utilService.makeId(),
    subject: '',
    body: '',
    isRead: false,
    isStarred: false,
    inbox: true,
    sentAtDetails: utilService.getRandomDateDetails(),
    sentAt: utilService.getRandomDate(),
    removedAt: null, //for later use,
    from: {
      name: utilService.makeName(),
      emailAddress: utilService.makeEmail(),
    },
    to: {
      email: '',
      fullname: '',
    },
    location: null,
  }
}

function _createEmails() {
  console.log('Creating emails...')
  let emails = utilService.loadFromStorage(STORAGE_KEY)

  if (!emails || !emails.length) {
    emails = [];

    for (let i = 0; i < 150; i++) {
      const isIncoming = Math.random() < 0.7
      const toEmail = isIncoming ? _loggedinUser.email : utilService.makeEmail()
      const fromEmail = isIncoming ? utilService.makeEmail() : _loggedinUser.email

      emails.push({
        id: utilService.makeId(),
        subject: utilService.makeLorem(5),
        body: utilService.makeLorem(100),
        isRead: isIncoming ? utilService.getRandomBool() : true,
        isStarred: utilService.getRandomBool(),
        folder: utilService.getRandomFolder(),
        sentAtDetails: utilService.getRandomDateDetails(),
        sentAt: utilService.getRandomDate(),
        removedAt: null, //for later use,
        from: {
          name: isIncoming ? utilService.makeName() : _loggedinUser.fullname,
          email: fromEmail,
        },
        to: toEmail,
        checked: false,
        location: null,
      })
    }
    utilService.saveToStorage(STORAGE_KEY, emails)
  }
  return emails
  
}


window.rs = emailService
