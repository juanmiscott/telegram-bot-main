class LoginForm extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/auth/user/signin'
  }

  connectedCallback () {
    this.render()
    this.bindEvents()
  }

  validateEmail (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  validatePassword (password) {
    return password.length >= 6
  }

  bindEvents () {
    const form = this.shadow.querySelector('#authForm')

    if (this._boundSubmit) return
    this._boundSubmit = true

    form.addEventListener('submit', async (event) => {
      event.preventDefault()

      const nameInput = this.shadow.querySelector('input[name="name"]')
      const emailInput = this.shadow.querySelector('input[name="email"]')
      const passwordInput = this.shadow.querySelector('input[name="password"]')
      const button = this.shadow.querySelector('button[type="submit"]')

      this.clearErrors()

      const payload = {
        name: (nameInput.value || '').trim(),
        email: (emailInput.value || '').trim(),
        password: (passwordInput.value || '').trim()
      }

      const errors = {}

      if (!payload.name) {
        errors.name = 'El nombre es requerido'
      }

      if (!payload.email) {
        errors.email = 'El email es requerido'
      } else if (!this.validateEmail(payload.email)) {
        errors.email = 'Ingrese un email válido'
      }

      if (!payload.password) {
        errors.password = 'La contraseña es requerida'
      } else if (!this.validatePassword(payload.password)) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres'
      }

      if (Object.keys(errors).length > 0) {
        this.showValidationErrors(errors)
        return
      }

      const oldText = button.textContent
      button.disabled = true
      button.textContent = 'Procesando...'

      try {
        const response = await fetch(this.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          if (response.status === 422 && data.message) {
            this.showValidationErrors(data.message)
          } else {
            alert('Error al procesar la solicitud. Por favor intenta de nuevo.')
          }
          return
        }

        alert('¡Registro exitoso! Bienvenido.')
        form.reset()
      } catch (err) {
        console.error('Fetch falló:', err)
        alert('Error de conexión. Por favor intenta de nuevo.')
      } finally {
        button.disabled = false
        button.textContent = oldText
      }
    })

    // Toggle password visibility
    const togglePassword = this.shadow.querySelector('.toggle-password')
    const passwordInput = this.shadow.querySelector('input[name="password"]')

    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
      passwordInput.setAttribute('type', type)

      const icon = togglePassword.querySelector('svg')
      if (type === 'text') {
        icon.innerHTML = '<path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />'
      } else {
        icon.innerHTML = '<path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />'
      }
    })
  }

  showValidationErrors (errors) {
    Object.entries(errors).forEach(([field, message]) => {
      const input = this.shadow.querySelector(`input[name="${field}"]`)
      if (input) {
        input.classList.add('error')
        const errorDiv = document.createElement('div')
        errorDiv.className = 'error-message'
        errorDiv.textContent = message
        input.parentElement.appendChild(errorDiv)
      }
    })
  }

  clearErrors () {
    this.shadow.querySelectorAll('.error-message').forEach(el => el.remove())
    this.shadow.querySelectorAll('input').forEach(input => input.classList.remove('error'))
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      h1, h2, h3, h4, h5, h6, p, a, span, label, input, button {
        font-family: "Nunito Sans", system-ui, -apple-system, sans-serif;
        font-optical-sizing: auto;
      }

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
      }

      .auth-form {
        background: linear-gradient(135deg, hsl(200, 100%, 95%) 0%, hsl(210, 100%, 85%) 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
      }

      .form-container {
        background: white;
        border-radius: 2rem;
        box-shadow: 0 20px 60px rgba(0, 100, 200, 0.15);
        padding: 3rem 2.5rem;
        width: 100%;
        max-width: 450px;
        animation: fadeIn 0.6s ease-out;
      }

      .form-header {
        text-align: center;
        margin-bottom: 2.5rem;
      }

      .form-title {
        font-size: 2.2rem;
        font-weight: 800;
        color: hsl(210, 100%, 35%);
        margin-bottom: 0.5rem;
      }

      .form-subtitle {
        font-size: 1rem;
        color: hsl(0, 0%, 50%);
        font-weight: 500;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .form-element {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .form-element label {
        font-size: 0.95rem;
        font-weight: 600;
        color: hsl(210, 50%, 30%);
      }

      .form-element-input {
        position: relative;
      }

      .form-element-input input {
        width: 100%;
        padding: 1rem 1.25rem;
        border: 2px solid hsl(210, 30%, 85%);
        border-radius: 1rem;
        font-size: 1rem;
        outline: none;
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

      .form-element-input input.error {
        border-color: hsl(0, 70%, 50%);
        background-color: hsl(0, 100%, 98%);
      }

      .form-element-input input.error:focus {
        box-shadow: 0 0 0 4px hsla(0, 70%, 50%, 0.1);
      }

      .password-wrapper {
        position: relative;
      }

      .toggle-password {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .toggle-password svg {
        width: 20px;
        height: 20px;
        fill: hsl(210, 30%, 60%);
        transition: fill 0.3s ease;
      }

      .toggle-password:hover svg {
        fill: hsl(210, 100%, 50%);
      }

      .error-message {
        color: hsl(0, 70%, 50%);
        font-size: 0.85rem;
        margin-top: 0.25rem;
        font-weight: 500;
      }

      .form-button button {
        width: 100%;
        padding: 1.2rem;
        background: linear-gradient(135deg, hsl(210, 100%, 55%) 0%, hsl(210, 100%, 45%) 100%);
        color: white;
        font-size: 1.2rem;
        font-weight: 700;
        border-radius: 1rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px hsla(210, 100%, 50%, 0.3);
      }

      .form-button button:hover:not(:disabled) {
        background: linear-gradient(135deg, hsl(210, 100%, 50%) 0%, hsl(210, 100%, 40%) 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px hsla(210, 100%, 50%, 0.4);
      }

      .form-button button:active:not(:disabled) {
        transform: translateY(0);
      }

      .form-button button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @media (min-width: 768px) {
        .form-container {
          padding: 4rem 3rem;
          max-width: 500px;
        }

        .form-title {
          font-size: 2.5rem;
        }

        .form-subtitle {
          font-size: 1.1rem;
        }

        .form-element label {
          font-size: 1rem;
        }

        .form-element-input input {
          font-size: 1.1rem;
          padding: 1.2rem 1.5rem;
        }

        .form-button button {
          font-size: 1.3rem;
          padding: 1.3rem;
        }
      }
    </style>

    <section class="auth-form">
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">Crear Cuenta</h2>
          <p class="form-subtitle">Completa los campos para registrarte</p>
        </div>

        <form id="authForm">
          <div class="form-element">
            <label for="name">Nombre completo</label>
            <div class="form-element-input">
              <input type="text" id="name" name="name" placeholder="Tu nombre completo">
            </div>
          </div>

          <div class="form-element">
            <label for="email">Correo electrónico</label>
            <div class="form-element-input">
              <input type="email" id="email" name="email" placeholder="tu@email.com">
            </div>
          </div>

          <div class="form-element">
            <label for="password">Contraseña</label>
            <div class="form-element-input password-wrapper">
              <input type="password" id="password" name="password" placeholder="Mínimo 6 caracteres">
              <button type="button" class="toggle-password">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="form-button">
            <button type="submit">Registrarse</button>
          </div>
        </form>
      </div>
    </section>
    `
  }
}

customElements.define('login-form-component', LoginForm)