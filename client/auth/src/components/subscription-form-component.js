class SubscriptionForm extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = {}
    // Endpoint de activación usando la URL de la API de Vite
  }

  async connectedCallback () {
    this.loadData()
    this.render()
    this.bindEvents()
  }

  loadData () {
    this.data = {
      welcomeTitle: '¡Bienvenido!',
      activationTitle: 'Activa tu cuenta',
      activationSubtitle:
        'Para activar tu cuenta, por favor crea tu contraseña. Te enviaremos un correo electrónico con la confirmación.',
      formElementButton: 'Activar Cuenta'
    }
  }

  bindEvents () {
    const form = this.shadow.querySelector('#subscriptionForm')
    if (!form) return

    // Evitar añadir el listener más de una vez
    if (this._boundSubmit) return
    this._boundSubmit = true

    form.addEventListener('submit', async (event) => {
      event.preventDefault()

      const passwordInput = this.shadow.querySelector('input[name="password"]')
      const repeatPasswordInput = this.shadow.querySelector('input[name="repeat-password"]')
      const messageSpan = this.shadow.querySelector('.message span')
      const button = this.shadow.querySelector('button[type="submit"]')

      const password = (passwordInput.value || '').trim()
      const repeatPassword = (repeatPasswordInput.value || '').trim()

      // Mínimo 8 caracteres, al menos 1 mayúscula y 1 número
      const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

      // Limpia mensaje previo
      messageSpan.textContent = ''

      if (!password || !repeatPassword) {
        messageSpan.textContent = 'Los campos no pueden estar vacíos'
        return
      }

      if (password !== repeatPassword) {
        messageSpan.textContent = 'Las contraseñas no coinciden'
        return
      }

      if (!regex.test(password)) {
        messageSpan.textContent = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 número'
        return
      }

      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')

      if (!token) {
        messageSpan.textContent = 'Token de activación no encontrado en la URL'
        return
      }

      // Desactivar botón mientras se envía
      const oldText = button.textContent
      button.disabled = true
      button.textContent = 'Activando...'

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/activate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, password })
        })

        if (response.ok) {
          messageSpan.textContent = 'Cuenta activada correctamente'
          form.reset()
        } else {
          const data = await response.json().catch(() => ({}))
          messageSpan.textContent = data.message || 'No se pudo activar la cuenta'
        }
      } catch (error) {
        console.error('Error activando cuenta:', error)
        messageSpan.textContent = 'Error de conexión. Por favor, inténtalo de nuevo.'
      } finally {
        button.disabled = false
        button.textContent = oldText
      }
    })
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
      * { box-sizing: border-box; }

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
      }

      h1, h2, h3, h4, h5, h6, p {
        margin: 0;
      }

      h1, h2, h3, h4, h5, h6, p, a, span, li, label, input, button {
        font-family: "Nunito Sans", system-ui, -apple-system, sans-serif;
        font-optical-sizing: auto;
      }

      .subscription-form {
        background: linear-gradient(135deg, hsl(200, 100%, 95%) 0%, hsl(210, 100%, 85%) 100%);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
      }

      .welcome-section {
        text-align: center;
        margin-bottom: 3rem;
        animation: fadeInDown 0.8s ease-out;
      }

      .welcome-title {
        font-size: 3.5rem;
        font-weight: 800;
        color: hsl(210, 100%, 40%);
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      }

      .welcome-subtitle {
        font-size: 1.5rem;
        color: hsl(210, 60%, 50%);
        font-weight: 600;
      }

      .form-container {
        background: white;
        border-radius: 2rem;
        box-shadow: 0 20px 60px rgba(0, 100, 200, 0.15);
        padding: 3rem 2.5rem;
        width: 100%;
        max-width: 500px;
        animation: fadeInUp 0.8s ease-out;
      }

      .activation-header {
        text-align: center;
        margin-bottom: 2.5rem;
      }

      .activation-title {
        font-size: 2rem;
        font-weight: 800;
        color: hsl(210, 100%, 35%);
        margin-bottom: 1rem;
      }

      .activation-subtitle {
        font-size: 1rem;
        color: hsl(0, 0%, 50%);
        font-weight: 500;
        line-height: 1.6;
      }

      .form form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .form-element-input {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .form-element-input input {
        border: 2px solid hsl(210, 30%, 85%);
        border-radius: 1rem;
        font-size: 1rem;
        outline: none;
        padding: 1rem 1.25rem;
        width: 100%;
        transition: all 0.3s ease;
        background-color: hsl(210, 40%, 98%);
      }

      .form-element-input input:focus {
        border-color: hsl(210, 100%, 60%);
        background-color: white;
        box-shadow: 0 0 0 4px hsla(210, 100%, 60%, 0.1);
      }

      .form-element-input input:hover {
        border-color: hsl(210, 80%, 70%);
      }

      .form-element-button button {
        background: linear-gradient(135deg, hsl(210, 100%, 55%) 0%, hsl(210, 100%, 45%) 100%);
        border-radius: 1rem;
        color: white;
        font-size: 1.2rem;
        font-weight: 700;
        padding: 1.2rem;
        width: 100%;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px hsla(210, 100%, 50%, 0.3);
      }

      .form-element-button button:hover:not(:disabled) {
        background: linear-gradient(135deg, hsl(210, 100%, 50%) 0%, hsl(210, 100%, 40%) 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px hsla(210, 100%, 50%, 0.4);
      }

      .form-element-button button:active:not(:disabled) {
        transform: translateY(0);
      }

      .form-element-button button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }

      .message {
        margin-top: 0.5rem;
        min-height: 1.2rem;
        font-size: 0.95rem;
        font-weight: 600;
        color: hsl(0, 70%, 45%);
        text-align: center;
      }

      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (min-width: 768px) {
        .subscription-form {
          padding: 3rem 2rem;
        }

        .welcome-title {
          font-size: 4.5rem;
        }

        .welcome-subtitle {
          font-size: 1.8rem;
        }

        .form-container {
          padding: 4rem 3rem;
          max-width: 550px;
        }

        .activation-title {
          font-size: 2.5rem;
        }

        .activation-subtitle {
          font-size: 1.1rem;
        }

        .form-element-input input {
          font-size: 1.1rem;
          padding: 1.2rem 1.5rem;
        }

        .form-element-button button {
          font-size: 1.3rem;
          padding: 1.3rem;
        }
      }
    </style>

    <section class="subscription-form">
      <div class="welcome-section">
        <h1 class="welcome-title">${this.data.welcomeTitle}</h1>
      </div>

      <div class="form-container">
        <div class="activation-header">
          <h2 class="activation-title">${this.data.activationTitle}</h2>
          <p class="activation-subtitle">${this.data.activationSubtitle}</p>
        </div>

        <div class="form">
          <form id="subscriptionForm">
            <div class="form-element">
              <div class="form-element-input">
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  required
                >
                <input
                  type="password"
                  placeholder="Repetir contraseña"
                  name="repeat-password"
                  required
                >
              </div>
            </div>

            <div class="form-element-button">
              <button type="submit">${this.data.formElementButton}</button>
            </div>

            <div class="message">
              <span></span>
            </div>
          </form>
        </div>
      </div>
    </section>
    `
  }
}

customElements.define('subscription-form-component', SubscriptionForm)


