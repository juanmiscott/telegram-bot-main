import { store } from '../redux/store.js'
import { refreshTable, showFormElement } from '../redux/crud-slice.js'

class DeleteModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = ''
    this.tableEndpoint = ''
    document.addEventListener('showDeleteModal', this.showDeleteModal.bind(this))
  }

  async connectedCallback () {
    this.render()
  }

  showDeleteModal (event) {
    const { endpoint, elementId } = event.detail
    this.tableEndpoint = endpoint
    this.endpoint = `${endpoint}/${elementId}`
    const overlay = this.shadow.querySelector('.overlay')
    overlay.classList.add('active')
  }

  render () {
    const itemName = this.getAttribute('item-name') || 'este elemento'

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
        background:  rgb(75, 55, 105);
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
        color:  rgb(215, 200, 238);
        margin-bottom: 16px;
      }

      .message {
        color:  rgb(215, 200, 238);
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
        color: rgb(41, 15, 15);
      }

      .cancel-button:hover {
        background: rgb(192, 185, 185) ;
      }

      .confirm-button {
        background: rgb(201, 106, 106);
        color: white;
      }

      .confirm-button:hover {
        background:  rgb(153, 153, 153);
      }
    </style>

    <div class="overlay">
      <div class="modal">
        <h3 class="title">¿Eliminar elemento?</h3>
        <p class="message">¿Estás seguro de que quieres eliminar "${itemName}"?</p>
        <div class="actions">
          <button class="cancel-button">Cancelar</button>
          <button class="confirm-button">Eliminar</button>
        </div>
      </div>
    </div>
    `

    this.renderButtons()
  }

  renderButtons () {
    const cancelButton = this.shadow.querySelector('.cancel-button')
    const confirmButton = this.shadow.querySelector('.confirm-button')

    cancelButton.addEventListener('click', (e) => {
      const overlay = this.shadow.querySelector('.overlay')
      overlay.classList.remove('active')
    })

    confirmButton.addEventListener('click', async (e) => {
      try {
        const response = await fetch(this.endpoint, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Error al eliminar el elemento')
        }

        document.dispatchEvent(new CustomEvent('notice', {
          detail: {
            message: 'Elemento eliminado correctamente',
            type: 'success'
          }
        }))

        store.dispatch(refreshTable(this.tableEndpoint))
        store.dispatch(showFormElement({
          endpoint: this.tableEndpoint,
          data: null
        }))

        this.shadow.querySelector('.overlay').classList.remove('active')
      } catch (error) {
        document.dispatchEvent(new CustomEvent('notice', {
          detail: {
            message: 'No se han podido eliminar los datos',
            type: 'error'
          }
        }))

        this.shadow.querySelector('.overlay').classList.remove('active')
      }
    })
  }
}

customElements.define('delete-modal-component', DeleteModal)
