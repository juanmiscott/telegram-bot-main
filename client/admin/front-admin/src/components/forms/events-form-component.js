import isEqual from 'lodash-es/isEqual'
import { store } from '../../redux/store.js'
import { refreshTable } from '../../redux/crud-slice.js'

class EventForm extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/events'
    this.unsubscribe = null
    this.formElementData = null
  }

  connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (currentState.crud.formElement.data && currentState.crud.formElement.endPoint === this.endpoint && !isEqual(this.formElementData, currentState.crud.formElement.data)) {
        this.formElementData = currentState.crud.formElement.data
        this.showElement(this.formElementData)
      }

      if (!currentState.crud.formElement.data && currentState.crud.formElement.endPoint === this.endpoint) {
        this.resetForm()
      }
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
      }

      button{
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
      }

      h1, h2, h3, h4, h5, h6, p{
        margin: 0;
      }

      h1, h2, h3, h4, h5, h6, p, a, span, li, label, input, button{
        font-optical-sizing: auto;

      }

      img{
        object-fit: cover;
        width: 100%;
      }

      ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      .form__body{
        display:flex;
        flex-direction: column;
        gap: 10px;
      }

      .form__header {
        background-color: rgb(255, 255, 255);
      }

      .form__header-box{
        display: flex;
        justify-content: space-between; 
        align-items: center;
      }

      .tab {
        background: rgb(86, 110, 220);
        padding: 5px 10px;
        color: white; 
        height: 30px;
        cursor: pointer;
        margin-right: 0px;
        
      }

      .tab button{
        color: hsl(100, 100%, 100%);
      }

      .tab.active{
        background: rgb(4, 35, 175);
      }
      

      .form__header-box-filter.active {
        background: rgb(26, 45, 127);
      }

      .form__header-box-filter button {
        color: white; 
        font-size: 16px;
        cursor: pointer;
      }

      .tabs{
        display: flex;
      }

      .tab-content {
        display: none;
      }

      .tab-content.active {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
        gap:1rem;
      }

      .form__header-icons {
        display: flex;
        gap: 10px; 
        margin-right: 5px;
      }

      .table__header__icon svg,
      .edit-icon svg,
      .delete-icon svg,
      .clean-icon,
      .save-icon {
        width: 30px;
        height: 30px;
      }

      .form-element {
        flex: 1;
        display:flex;
        flex-direction: column;
        gap: 10px 0px;
      }

      .form-element {
        margin: 10px 0;
      }

      .form-element-input input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        box-sizing: border-box;
        border: none;
        background: hsl(229, 66%, 80%);
        color: white;
        height:2rem;
      }

      .form-element-input .error{
        border: 1px solid rgb(223, 8, 8);
      }

      .form-element-input input.error {
        border-color:rgb(220, 38, 38);
      }

      .error-message {
        color:rgb(220, 38, 38);
        font-size: 1rem;
        margin-top: 0.5rem;
      }
      
    </style>

    <section class="form">
      <div class="form__header">
        <div class="form__header-box">
          <div class="tabs">
            <div class="tab active" data-tab="general">
              <button>General</button>
            </div>
          </div>
          <div class="form__header-icons">
            <button class="clean-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>eraser</title>
                <path
                  d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
              </svg>
            </button>
            <button class="save-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>content-save</title>
                <path
                  d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="form__body">
        <div class="validation-errors">
          <ul></ul>
        </div>
        <form>
          <div class="tab-content active" data-tab="general">
            <input type="hidden" name="id">

            <div class="form-element">
              <div class="form-title">
                <span>Nombre</span>
              </div>
              <div class="form-element-input">
                <input type="text" placeholder="" name="name">
              </div>
            </div>

            <div class="form-element">
              <div class="form-title">
                <span>Descripcion</span>
              </div>
              <div class="form-element-input">
                <input type="email" placeholder="" name="email">
              </div>
            </div>

            <div class="form-element">
              <div class="form-title">
                <span>Plataforma</span>
              </div>
              <div class="form-element-input">
                <input type="text" placeholder="" name="name">
              </div>
            </div>

            <div class="form-element">
            <div class="form-title">
              <span>Token</span>
            </div>
            <div class="form-element-input">
              <input type="text" placeholder="" name="name">
            </div>
          </div>

          </div>
        </form>
      </div>
    </section>
    
    `
    this.renderButtons()
  }

  renderButtons () {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault()
      }
    })

    this.shadow.querySelector('.form').addEventListener('click', async event => {
      event.preventDefault()

      if (event.target.closest('.save-icon')) {
        const form = this.shadow.querySelector('form')
        const formData = new FormData(form)
        const formDataJson = {}

        for (const [key, value] of formData.entries()) {
          formDataJson[key] = value !== '' ? value : null
        }
        const id = this.shadow.querySelector('[name="id"]').value
        const endpoint = id ? `${this.endpoint}/${id}` : this.endpoint
        const method = id ? 'PUT' : 'POST'
        delete formDataJson.id
        const errors = {}
        if (!formDataJson.name) {
          errors.name = 'El nombre es requerido'
        }
        if (!formDataJson.email) {
          errors.email = 'El email es requerido'
        } else if (!this.validateEmail(formDataJson.email)) {
          errors.email = 'Ingrese un email valido'
        }

        if (Object.keys(errors).length > 0) {
          this.showValidationErrors(errors)
          return
        }

        try {
          const response = await fetch(endpoint, {
            method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJson)
          })

          if (!response.ok) {
            throw response
          }

          store.dispatch(refreshTable(this.endpoint))

          this.resetForm()

          document.dispatchEvent(new CustomEvent('notice', {
            detail: {
              message: 'Datos guardados correctamente',
              type: 'success'
            }
          }))
        } catch (error) {
          if (error.status === 422) {
            const data = await error.json()
            this.showValidationErrors(data.message)
          }

          if (error.status === 500) {
            document.dispatchEvent(new CustomEvent('notice', {
              detail: {
                message: 'No se han podido guardar los datos',
                type: 'error'
              }
            }))
          }
        }
      }

      if (event.target.closest('.clean-icon')) {
        this.resetForm()
      }

      if (event.target.closest('.tab')) {
        const clickedTab = event.target.closest('.tab')

        this.shadow.querySelector('.tab.active').classList.remove('active')
        clickedTab.classList.add('active')

        this.shadow.querySelector('.tab-content.active').classList.remove('active')
        this.shadow.querySelector(`.tab-content[data-tab='${clickedTab.dataset.tab}']`).classList.add('active')
      }
    })
  }

  showElement (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (this.shadow.querySelector(`[name="${key}"]`)) {
        this.shadow.querySelector(`[name="${key}"]`).value = value
      }
    })
  }

  showValidationErrors (messages) {
    this.shadow.querySelectorAll('.error-message').forEach(el => el.remove())
    this.shadow.querySelectorAll('.form-element-input input').forEach(input => {
      input.classList.remove('error')
    })

    Object.entries(messages).forEach(([field, message]) => {
      const input = this.shadow.querySelector(`[name="${field}"]`)
      if (input) {
        input.classList.add('error')
        const errorMessage = document.createElement('div')
        errorMessage.className = 'error-message'
        errorMessage.textContent = message
        input.parentElement.appendChild(errorMessage)
      }
    })
  }

  validateEmail (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  resetForm () {
    const form = this.shadow.querySelector('form')
    form.reset()
    this.shadow.querySelector('[name="id"]').value = ''
    this.formElementData = null
  }
}

customElements.define('events-form-component', EventForm)
