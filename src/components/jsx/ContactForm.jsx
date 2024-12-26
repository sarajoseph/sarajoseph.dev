import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslations } from '@i18n/utils'
import '@css/contact.css'
import { LoadingSpinner } from './LoadingSpinner'

export const ContactForm = ({ currentLang }) => {
  const t = useTranslations(currentLang)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isModalVisible, setModalVisible] = useState(false)
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors({ name: '', email: '', message: '' })
    setIsLoading(true)

    const newErrors = {}
    if (!formData.name) newErrors.name = t('contact.error_name')
    if (!formData.email) newErrors.email = t('contact.error_email')
    if (!formData.message) newErrors.message = t('contact.error_message')
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const response = await emailjs.send(
        'service_c1ukcko',
        'template_y4el7vs',
        {
          user_name: formData.name,
          user_email: formData.email,
          user_message: formData.message
        },
        'fr1GtEFEPSO56LFFT'
      )
      if (response.status === 200) {
        setModalVisible(true)
        setFormData({ name: '', email: '', message: '' })
        setIsLoading(false)
      } else {
        alert('Error sending message.')
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error submitting form:', error)
      alert('Failed to send the message. Please try again later.')
    }
  }

  return (
    <div className='contact-container'>
      <form onSubmit={handleSubmit} className='contact-form'>
        <div className='form-group'>
          <label htmlFor='name'>{t('contact.form.name')}</label>
          <input type='text' name='name' value={formData.name} onChange={handleChange} required />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>{t('contact.form.email')}</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} required />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='message'>{t('contact.form.message')}</label>
          <textarea name='message' value={formData.message} onChange={handleChange} required />
          {errors.message && <p>{errors.message}</p>}
        </div>

        <button type='submit' className='btn'>
          {isLoading ? <LoadingSpinner/> : t('contact.button.send')}
        </button>
      </form>

      {isModalVisible && (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close" onClick={() => setModalVisible(false)}>&times;</button>
          <div className="modal-content">
            <h2>{t('contact.success_modal.title')}</h2>
            <p>{t('contact.success_modal.content')}</p>
            <button className='btn' onClick={() => setModalVisible(false)}>{t('contact.modal.close')}</button>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}