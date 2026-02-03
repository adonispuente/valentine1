import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [answered, setAnswered] = useState(false)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [noButtonClicked, setNoButtonClicked] = useState(false)
  const noButtonRef = useRef(null)
  const yesButtonRef = useRef(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isInitialized, setIsInitialized] = useState(false)

  // Replace with your email address 
  const YOUR_EMAIL = 'adonis.puente@gmail.com'

  useEffect(() => {
    // Initialize button position - place it below the Yes button
    if (!answered && yesButtonRef.current && noButtonRef.current && !isInitialized) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        const yesRect = yesButtonRef.current.getBoundingClientRect()
        const noRect = noButtonRef.current.getBoundingClientRect()

        // Position the No button centered below the Yes button
        const centerX = yesRect.left + (yesRect.width / 2) - (noRect.width / 2)
        const belowY = yesRect.bottom + 20 // 20px gap below Yes button

        setNoButtonPosition({ x: centerX, y: belowY })
        setIsInitialized(true)
      }, 0)
    }
  }, [answered, isInitialized])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!answered && noButtonRef.current && isInitialized) {
        const button = noButtonRef.current
        const rect = button.getBoundingClientRect()
        const buttonCenterX = rect.left + rect.width / 2
        const buttonCenterY = rect.top + rect.height / 2

        const mouseX = e.clientX
        const mouseY = e.clientY

        const distance = Math.sqrt(
          Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
        )

        // If mouse is within 80px of button, move it away (smaller threshold for smaller button)
        if (distance < 80) {
          const angle = Math.atan2(mouseY - buttonCenterY, mouseX - buttonCenterX)
          const moveDistance = 150
          const newX = buttonCenterX - Math.cos(angle) * moveDistance
          const newY = buttonCenterY - Math.sin(angle) * moveDistance

          // Keep button within viewport bounds
          const maxX = window.innerWidth - rect.width - 20
          const maxY = window.innerHeight - rect.height - 20

          setNoButtonPosition({
            x: Math.max(20, Math.min(newX, maxX)),
            y: Math.max(20, Math.min(newY, maxY))
          })
        }
      }
    }

    if (!answered) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [answered, isInitialized])

  const handleYesClick = () => {
    setAnswered(true)
  }

  const handleNoClick = () => {
    setNoButtonClicked(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Using FormSubmit - completely free, no signup required
      const response = await fetch(`https://formsubmit.co/ajax/${YOUR_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: 'Valentine Response',
          message: message,
          _subject: 'Valentine\'s Day Response 💕',
          _template: 'box'
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
      } else {
        throw new Error(data.message || 'Failed to send')
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to send message. Please try again or contact me directly!')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="valentine-container">
        <div className="success-message">
          <h1>💕 Thank You! 💕</h1>
          <p>Your message has been sent! I can't wait to celebrate with you!</p>
        </div>
      </div>
    )
  }

  if (answered) {
    return (
      <div className="valentine-container">
        <div className="message-form">
          <h1>🌚 You + me forevah 🌝</h1>
          <p>Leave me a message and my people will get it to me when I'm not so busy:</p>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              required
              rows={6}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message 💌'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="valentine-container">
      <div className="question-container">
        <h1 className="question">Ingrid Martinez (soon to be Puente), will you be my valentine? 💕</h1>
        <div className="buttons-container">
          <button
            ref={yesButtonRef}
            className="yes-button"
            onClick={handleYesClick}
          >
            Yes! 💖
          </button>
          <button
            ref={noButtonRef}
            className="no-button"
            onClick={handleNoClick}
            style={{
              position: isInitialized ? 'fixed' : 'relative',
              left: isInitialized ? `${noButtonPosition.x}px` : 'auto',
              top: isInitialized ? `${noButtonPosition.y}px` : 'auto',
              transition: 'all 0.2s ease-out'
            }}
          >
            {noButtonClicked ? 'clearly this is a mistake' : 'No 😢'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
