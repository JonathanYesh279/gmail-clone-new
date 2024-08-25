export function EmailCompose() {

  return (
    <dialog className='email-compose'>
        <nav className='modal-navbar'>
          <span>New Message</span>
          <button>X</button>
        </nav>
          <form className='compose-form'>
            <input type="text" placeholder="Recipients" />
            <input type="text" placeholder="Subject" />
            <textarea />
          </form>
    </dialog>
  )
}