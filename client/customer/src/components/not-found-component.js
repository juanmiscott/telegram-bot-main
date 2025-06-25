class NotFound extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.render()
    this.addEventListeners()
  }

  addEventListeners () {
    const button = this.shadow.querySelector('.back-home-button')
    button.addEventListener('click', (e) => {
      e.preventDefault()
      setTimeout(() => window.location.href = '/', 200)
    })
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <style>
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :host {
          display: block;
          width: 100%;
          height: 100vh;
          font-family:  "Montserrat", sans-serif;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          text-align: center;
          padding: 2rem;
        }

        .error-code {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .digit {
          font-size: clamp(4rem, 15vw, 10rem);
          font-weight: 900;
          color: white;
          text-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          line-height: 1;
        }

        .error-message {
          color: white;
          font-size: clamp(1.2rem, 4vw, 1.8rem);
          font-weight: 600;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .illustration {
          margin: 1.5rem 0;
          opacity: 0.8;
        }

        .illustration svg {
          width: clamp(150px, 30vw, 250px);
          height: auto;
        }

        .back-home-button {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          border: none;
          border-radius: 25px;
          color: white;
          cursor: pointer;
          font-family:  "Montserrat", sans-serif;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.8rem 2rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.3);
        }

        .back-home-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
        }

        @media (max-width: 768px) {
          .container { padding: 1rem; }
          .error-code { gap: 0.5rem; }
          .back-home-button { padding: 0.7rem 1.5rem; }
        }
      </style>

      <div class="container">
        <div class="error-code">
          <span class="digit">4</span>
          <span class="digit">0</span>
          <span class="digit">4</span>
        </div>
        
        <h1 class="error-message">Página no encontrada</h1>
        
        <div class="illustration">
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(100, 75)">
              <path d="M -30 -50 L 30 -50 L 20 -8 L -20 -8 Z" fill="#e0e0e0" stroke="#bbb" stroke-width="1.5"/>
              <path d="M -20 8 L 20 8 L 30 50 L -30 50 Z" fill="#e0e0e0" stroke="#bbb" stroke-width="1.5"/>
              <path d="M -25 -45 L 25 -45 L 18 -12 L -18 -12 Z" fill="#ffd700"/>
              <path d="M -18 12 L 18 12 L 25 45 L -25 45 Z" fill="#ffd700" opacity="0.4"/>
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#ffd700" stroke-width="2">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
              </line>
              <rect x="-35" y="-55" width="70" height="6" rx="3" fill="#8b4513"/>
              <rect x="-35" y="49" width="70" height="6" rx="3" fill="#8b4513"/>
            </g>
            
            <circle cx="50" cy="60" r="3" fill="white" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="150" cy="90" r="2" fill="white" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        
        <button class="back-home-button">
           Volver a página principal
        </button>
      </div>
    `
  }
}

customElements.define('not-found-component', NotFound)
