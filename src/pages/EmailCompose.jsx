import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { emailService } from '../service/email.service'
import { showErrorMsg, showSuccessMsg } from '../service/eventBus.service'

import xIcon from '../assets/imgs/xIcon.png'
import fullsizeIcon from '../assets/imgs/fullsizeIcon.png'
import minimizeIcon from '../assets/imgs/minimizeIcon.png'

const validationSchema = Yup.object({
  to: Yup.string().email('Invalid email address').required('Required'),
  subject: Yup.string().required('Required'),
  body: Yup.string().required('Required'),
})

export function EmailCompose({ onCloseCompose, onEmailSend }) {
  const [size, setSize] = React.useState('medium')
  const [searchParams, setSearchParams] = useSearchParams()
  const draftId = searchParams.get('draftId')
  const saveDraftTimeOutRef = useRef(null)
  const currentDraftRef = useRef(null)
  const [location, setLocation] = useState(null)

  const formik = useFormik({
    initialValues: {
      to: '',
      subject: '',
      body: '',
      includeLocation: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let emailData = { ...values }
      if (values.includeLocation && location) {
        emailData.location = location
      }
      console.log('Sending email with data:', emailData)
      await onEmailSend(emailData)
      formik.resetForm()
      currentDraftRef.current = null
      setLocation(null)
    },
  })

  useEffect(() => {
    if (draftId) {
      loadDraft(draftId)
    }
  }, [draftId])

  useEffect(() => {
    if (formik.values.to || formik.values.subject || formik.values.body) {
      if (saveDraftTimeOutRef.current) {
        clearTimeout(saveDraftTimeOutRef.current)
      }
      saveDraftTimeOutRef.current = setTimeout(() => {
        saveDraft(formik.values)
      }, 5000)
    }

    return () => {
      if (saveDraftTimeOutRef.current) {
        clearTimeout(saveDraftTimeOutRef.current)
      }
    }
  }, [formik.values])

  useEffect(() => {
    if (formik.values && formik.values.includeLocation && !location) {
      getCurrentLocation()
    }
  }, [formik.values?.includeLocation]) 

  useEffect(() => {
    const to = searchParams.get('to')
    const subject = searchParams.get('subject')
    const body = searchParams.get('body')

    if (to || subject || body) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        to: to || prevValues.to,
        subject: subject || prevValues.subject,
        body: body || prevValues.body,
      }))
    }
  }, [searchParams])
  
  async function loadDraft(draftId) {
    try {
      const draft = await emailService.getById(draftId)
      formik.setValues({
        ...draft,
        includeLocation: !!draft.location,
      })
      currentDraftRef.current = draft
      if (draft.location) {
        setLocation(draft.location)
      }
    } catch (err) {
      showErrorMsg('Could not load draft')
    }
  }

  async function saveDraft(data) {
    try {
      let draft
      if (currentDraftRef.current) {
        draft = { ...currentDraftRef.current, ...data }
      } else {
        draft = emailService.createEmail(data.to, data.subject, data.body)
        draft.folder = 'drafts'
        draft.isDraft = true
      }
      if (data.includeLocation) {
        draft.location = location
      }
      const savedDraft = await emailService.save(draft)
      currentDraftRef.current = savedDraft
      showSuccessMsg('Draft saved')
    } catch (err) {
      showErrorMsg('Could not save draft')
    }
  }

  function handleSizeChange(newSize) {
    setSize(newSize)
  }

  function toggleSize() {
    setSize((prevSize) => (prevSize === 'medium' ? 'fullsize' : 'medium'))
  }

  function handleClose() {
    if (saveDraftTimeOutRef.current) {
      clearTimeout(saveDraftTimeOutRef.current)
    }
    saveDraft(formik.values)
    formik.resetForm()
    currentDraftRef.current = null
    setLocation(null)

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('compose')
    newSearchParams.delete('to')
    newSearchParams.delete('subject')
    newSearchParams.delete('body')
    setSearchParams(newSearchParams)
    onCloseCompose()
  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
        () => {
          showErrorMsg('Could not get location')
          formik.setFieldValue('includeLocation', false)
        }
      )
    } else {
      showErrorMsg('Geolocation is not supported by this browser.')
      formik.setFieldValue('includeLocation', false)  
    }
  }

  return (
    <dialog className={`email-compose ${size}`}>
      <nav className='modal-navbar'>
        <span>New Message</span>
        <div>
          <button onClick={() => handleSizeChange('minimize')}>
            <img src={minimizeIcon} alt='Minimize' />
          </button>
          <button onClick={toggleSize}>
            <img src={fullsizeIcon} alt='Toggle fullsize' />
          </button>
          <button onClick={handleClose}>
            <img src={xIcon} alt='Close' />
          </button>
        </div>
      </nav>

      {size !== 'minimize' && formik.values && (
        <form onSubmit={formik.handleSubmit} className='compose-form'>
          <input
            type='text'
            id='to'
            name='to'
            placeholder='Recipients'
            value={formik.values.to}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.to && formik.errors.to ? (
            <div className='error-message'>{formik.errors.to}</div>
          ) : null}

          <input
            type='text'
            id='subject'
            name='subject'
            placeholder='Subject'
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.subject && formik.errors.subject ? (
            <div className='error-message'>{formik.errors.subject}</div>
          ) : null}

          <textarea
            id='body'
            name='body'
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.body && formik.errors.body ? (
            <div className='error-message'>{formik.errors.body}</div>
          ) : null}
          <div>
            <input 
              type='checkbox'
              id='includeLocation'
              name='includeLocation'
              checked={formik.values.includeLocation}
              onChange={formik.handleChange}
            />
            <label htmlFor='includeLocation'>Add location</label>
          </div>

          <button type='submit' className='btn-send'>Send</button>
        </form>
      )}
    </dialog>
  )
}

EmailCompose.propTypes = {
  onCloseCompose: PropTypes.func.isRequired,
  onEmailSend: PropTypes.func.isRequired,
}