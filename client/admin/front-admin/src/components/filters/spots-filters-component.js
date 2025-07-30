import { store } from '../../redux/store.js'
import { setFilterQuery } from '../../redux/crud-slice.js'

class SpotFilter extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/spots'
    this.tableEndpoint = ''
    document.addEventListener('showFilterModal', this.showFilterModal.bind(this))
  }

  async connectedCallback () {
    this.render()
  }

  showFilterModal (event) {
    console.log(event)
    if (event.detail.endpoint === this.endpoint) {
      this.shadow.querySelector('.overlay').classList.add('active')
    }
  }

  render () {
    this.shadow.innerHTML = /* html */`
    <style>
      * {
        box-sizing: border-box;
      }

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
        font-family: "Montserrat", sans-serif;
      }

      h1, h2, h3, h4, h5, h6, p {
        margin: 0;
      }

      .overlay {
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        padding: 20px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
      }

      .overlay.active {
        opacity: 1;
        visibility: visible;
      }

      .modal {
        background: rgb(75, 55, 105);
        border-radius: 8px;
        padding: 24px;
        max-width: 400px;
        width: 100%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        font-family: "Montserrat", sans-serif;
      }

      .title {
        font-size: 1.2rem;
        font-weight: 600;
        color: rgb(215, 200, 238);
        margin-bottom: 16px;
      }

      .message {
        color: rgb(215, 200, 238);
        line-height: 1.4;
        margin-bottom: 24px;
      }

      .actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }

      .actions button {
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
      }

      .cancel-button {
        background: rgb(223, 214, 214);
        color:  rgb(41, 15, 15);
        padding: 10px 20px;
        border-radius: 6px;
        font-weight: 500;
      }

      .cancel-button:hover {
        background: rgb(192, 185, 185) ;
      }

      .filter-form {
        margin-bottom: 24px;
      }

      .form-element {
        margin-bottom: 20px;
      }

      .form-title {
        margin-bottom: 8px;
      }

      .form-title span {
        font-weight: 500;
        color:  rgb(223, 214, 214);
        font-size: 0.9rem;
      }

      .form-element-input {
        position: relative;
      }

      .form-element-input input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid rgb(225, 229, 233);
        border-radius: 6px;
        font-family: "Montserrat", sans-serif;
        font-size: 0.9rem;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        background:rgb(250, 251, 252);
      }

      .form-element-input input:focus {
        outline: none;
        border-color:rgb(79, 70, 229);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        background: white;
      }

      .form-element-input input::placeholder {
        color:rgb(156, 163, 175);
      }

      .filter-buttons {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }

      .apply-button {
        background:rgb(79, 70, 229);
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        font-weight: 500;
        transition: background 0.2s ease;
      }

      .apply-button:hover {
        background:rgb(67, 56, 202);
      }

      .filter-buttons {
        flex-direction: column;
      }

      .filter-buttons button {
        width: 100%;
      }

    </style>
    
    <div class="overlay" id="filterModal">
      <div class="modal">
        <h3 class="title">Filtrar tabla</h3>
        <div class="filter-form">
          <form id="filterForm">
            <div class="form-element">
              <div class="form-title">
                <span>Nombre</span>
              </div>
              <div class="form-element-input">
                <input type="text" placeholder="" name="name">
              </div>
            </div>
            
          </form>
        </div>
        <div class="filter-buttons">
          <button class="cancel-button">Cancelar</button>
          <button class="apply-button" >Aplicar</button>
        </div>
      </div>
    </div>
    `

    this.renderButtons()
  }

  renderButtons () {
    const cancelButton = this.shadow.querySelector('.cancel-button')
    const applyButton = this.shadow.querySelector('.apply-button')

    cancelButton.addEventListener('click', (e) => {
      this.shadow.querySelector('.overlay').classList.remove('active')
      const form = this.shadow.querySelector('form')
      form.reset()

      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      const query = Object.entries(formDataJson).map(([key, value]) => `${key}=${value}`).join('&')

      const filterQuery = {
        endPoint: this.endpoint,
        query
      }

      store.dispatch(setFilterQuery(filterQuery))

      this.shadow.querySelector('.overlay').classList.remove('active')
    })

    applyButton.addEventListener('click', (e) => {
      const form = this.shadow.querySelector('form')
      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      const query = Object.entries(formDataJson).map(([key, value]) => `${key}=${value}`).join('&')

      const filterQuery = {
        endPoint: this.endpoint,
        query
      }

      store.dispatch(setFilterQuery(filterQuery))

      this.shadow.querySelector('.overlay').classList.remove('active')
    })
  }
}
customElements.define('spots-filters-component', SpotFilter)
