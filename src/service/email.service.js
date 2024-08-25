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
};

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

    // Filter by inbox/sent status
    if (filterBy.folder === 'inbox') {
      emails = emails.filter(email => email.to.email === _loggedinUser.email)
    } else if (filterBy.folder === 'sent') {
      emails = emails.filter(email => email.from.email === _loggedinUser.email)
    } else if (filterBy.folder === 'trash') {
      emails = emails.filter(email => email.removedAt !== null)
    } 

    // Filter by starred status
    if (filterBy.isStarred !== null) {
      emails = emails.filter(email => email.isStarred === filterBy.isStarred)
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
    return storageService.put(STORAGE_KEY, emailToSave)
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
    }
  }
}

function _createEmails() {
  console.log('Creating emails...')
  let emails = utilService.loadFromStorage(STORAGE_KEY)

  if (!emails || !emails.length) {
    emails = [];

    for (let i = 0; i < 100; i++) {
      const isIncoming = Math.random() < 0.7

      emails.push({
        id: utilService.makeId(),
        subject: utilService.makeLorem(30),
        body: utilService.makeLorem(300),
        isRead: isIncoming ? utilService.getRandomBool() : true,
        isStarred: utilService.getRandomBool(),
        inbox: utilService.getRandomBool(),
        sentAtDetails: utilService.getRandomDateDetails(),
        sentAt: utilService.getRandomDate(),
        removedAt: null, //for later use,
        from: isIncoming
          ? { name: utilService.makeName(), email: utilService.makeEmail() }
          : { name: _loggedinUser.fullname, email: _loggedinUser.email},
        to: isIncoming
          ? { name: _loggedinUser.fullname, email: _loggedinUser.email }
          : { name: utilService.makeEmail(), email: utilService.makeName()},
        checked: false,
      })
    }
    utilService.saveToStorage(STORAGE_KEY, emails)
  }
  return emails
}

window.rs = emailService
