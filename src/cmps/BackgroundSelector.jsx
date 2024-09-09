import { useState } from "react"

import backgroundIcon from '../assets/imgs/backgroundIcon.png'

export function BackgroundSelector({ onSelectBackground }) {
  const [isOpen, setIsOpen] = useState(false)

  const backgroundImages = [
    { name: 'lake', url: '/lake-background.jpg' },
    { name: 'forest', url: '/forest-background.jpg' },
    { name: 'ocean', url: '/ocean-background.jpg' },
    { name: 'storm-ocean', url: '/storm-ocean-background.jpg' },
    { name: 'port', url: '/port-background.jpg' },
  ]

  function selectBackgroundImage() {
    onSelectBackground()
    setIsOpen(false)
  }

  return (
    <section className="background-selector">
      <button className="btn-background" onClick={() => setIsOpen(!isOpen)}>
        <img src={backgroundIcon} />
      </button>
      {isOpen && (
        <div className="background-images-container">
          {backgroundImages.map(backgroundImage => (
            <button
              key={backgroundImage.name}
              onClick={() => selectBackgroundImage(backgroundImage.url)}
              className="background-image"
            >
              <img src={backgroundImage.url}/>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}