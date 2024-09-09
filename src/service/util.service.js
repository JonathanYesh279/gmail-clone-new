export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
  getRandomBool,
  getRandomFolder,
  getCurrentDate,
  getRandomDate,
  getRandomDateDetails,
  makeEmail,
  makeLorem,
  makeName,
  debounce
}

function saveToStorage(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
  var value = localStorage[key] || defaultValue
  return JSON.parse(value)
}

function makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export function getRandomBool() {
  return Math.random() > 0.5
}

export function getRandomFolder() {
  const folders = ['inbox', 'sent', 'starred', 'all']
  const idx = getRandomInt(0, folders.length)
  return folders[idx]
}

// create function te get current date like: 'Aug 26'
export function getCurrentDate() {
  const date = new Date()
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return `${months[date.getMonth()]} ${date.getDate()}`
}

export function getRandomDate() {
   const date = new Date(
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
  )
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return `${months[date.getMonth()]} ${date.getDate()}`
}

export function getRandomDateDetails() {
  const now = new Date()
  // Generate a random date within the last 7 days
  const randomDate = new Date(
    now - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
  )

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = months[randomDate.getMonth()]
  const day = randomDate.getDate()
  const year = randomDate.getFullYear()

  let hours = randomDate.getHours()
  const minutes = randomDate.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  const timeDiff = now - randomDate
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))

  let relativeTime
  if (hoursDiff < 1) {
    const minutesDiff = Math.floor(timeDiff / (1000 * 60))
    relativeTime = `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''} ago`
  } else if (hoursDiff < 24) {
    relativeTime = `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''} ago`
  } else {
    const daysDiff = Math.floor(hoursDiff / 24)
    relativeTime = `${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago`
  }

  return `${month} ${day}, ${year}, ${hours}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm} (${relativeTime})`
}

export function makeEmail() {
  var str = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 10; i++) {
    str += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return str + '@gmail.com'
}

export function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export function debounce(func, delay) { 
  let timeoutId
  
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}


function makeLorem(size = 100) {
  var words = [
    'sky',
    'above',
    'port',
    'was',
    'television',
    'tuned',
    'to',
    'channel',
    'all',
    'baby',
    'thing',
    'happened',
    'less',
    'I',
    'had',
    'story',
    'bit',
    'people',
    'and',
    'generally',
    'happens',
    'cases',
    'time',
    'it',
    'was',
    'story',
    'It',
    'was',
    'pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt.slice(0, -1)
}


export function makeName() {
  const fullNames = [
    'John Doe',
    'Jane Doe',
    'Yaron Sabag',
    'Yossi Cohen, Yael Levi',
    'Yael Sabag',
    'Yael Cohenn',
  ]
  const idx = getRandomInt(0, fullNames.length)
  return fullNames[idx]
}
