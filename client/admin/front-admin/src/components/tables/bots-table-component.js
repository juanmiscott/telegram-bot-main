import { store } from '../../redux/store.js'
import { showFormElement } from '../../redux/crud-slice.js'

class BotTable extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/bots'
    this.unsubscribe = null
    this.filterQuery = null
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (currentState.crud.filterQuery.query && currentState.crud.filterQuery.endPoint === this.endpoint) {
        this.filterQuery = currentState.crud.filterQuery.query
        const endpoint = `${this.endpoint}?${currentState.crud.filterQuery.query}`
        this.loadData(endpoint).then(() => this.render())
      }

      if (!currentState.crud.filterQuery.query && currentState.crud.tableEndpoint === this.endpoint) {
        this.loadData().then(() => this.render())
      }
    })

    await this.loadData()
    await this.render()
  }

  async loadData (endpoint = this.endpoint) {
    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }

      this.data = await response.json()
    } catch (error) {
      console.error('Error loading data:', error)
      this.data = []
    }
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>

* {
        box-sizing: border-box;
      }

        h1, h2, h3, h4, h5, h6, p{
        margin: 0;
      }

      ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      li{
        font-family: "Montserrat", sans-serif;
      }

      button{
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
      }

      .table {
        display:flex;
        flex-direction: column;
        flex: 1;
        gap: 10px;
        border-radius: 10px;
      }

      .table__header {
        display: flex;
        justify-content: flex-start; 
        background-color: white;
        height: 30px;
      }

      .filter-button{
        margin-left: 5px;
      }

      .filter-button ,
      .edit-button ,
      .delete-button ,
      .clean-button,
      .save-button,
      .table-page-button {
        width: 30px;
        height: 30px;
        fill: black;
      }


      .table__body{
        display: flex;
        flex-direction: column;
        gap: 10px;      
        width: 90%;
        margin: 0 auto;
        margin: 10px auto;
        max-height: 70vh; /* o el alto que necesites */
        overflow-y: auto;
        padding-right: 10px; /* espacio para scroll */
      }

      .table__body__element-box {
        background: black;
        color: white;
      }

      .element-box__data {
        padding: 15px;
        background-color: black;
      }

      .element-box__data li {
        margin-top: 5px; 
      }

      .element-box__upper-row {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        background-color: white;
      }

      .table__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        background-color: rgb(255, 255, 255);
      }

      .table__footer-box {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      .table-page-info {
        text-align: left;
        color: rgb(0, 0, 0);
        font-family: "Montserrat", sans-serif;
      }

      .table-page-controls {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .table-page-button {
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
      }

      .table-page-button.disabled{
        cursor: not-allowed;
      }

      .table-page-button:hover {
        background-color: rgb(170, 169, 172);
        border-radius: 2px;
      }

      .table-page-button.disabled:hover {
        background-color: transparent;
      }

      .table-page-button svg {
        width: 30px;
        height: 30px;
        fill: rgb(0, 0, 0);
      }

      .table-page-button.disabled svg{
        fill: rgb(150, 150, 150);
      }
      
    </style>

<section class="table">
<div class="table__header">
  <div class="table__header__box">
    <button class="filter-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>filtro</title>
        <path
          d="M12 12V19.88C12.04 20.18 11.94 20.5 11.71 20.71C11.32 21.1 10.69 21.1 10.3 20.71L8.29 18.7C8.06 18.47 7.96 18.16 8 17.87V12H7.97L2.21 4.62C1.87 4.19 1.95 3.56 2.38 3.22C2.57 3.08 2.78 3 3 3H17C17.22 3 17.43 3.08 17.62 3.22C18.05 3.56 18.13 4.19 17.79 4.62L12.03 12H12M17.75 21L15 18L16.16 16.84L17.75 18.43L21.34 14.84L22.5 16.25L17.75 21" />
      </svg>
    </button>
  </div>
</div>

<div class="table__body">
</div>

<div class="table__footer">
  <div class="table__footer-box">
    <div class="table-page-info">${this.data.meta.total} registros en total, mostrando ${this.data.meta.size} por página</div>
    <div class="table-page-controls">
      <button class="table-page-button first-page ${this.data.meta.currentPage === 1 ? 'disabled' : ''}" data-page="1" title="doble izquierda">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>chevron-double-left</title>
          <path d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" />
        </svg>
      </button>

      <button class="table-page-button prev-page ${this.data.meta.currentPage === 1 ? 'disabled' : ''}" data-page="${this.data.meta.currentPage > 1 ? this.data.meta.currentPage - 1 : 1}" title="izquierda">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>chevron-left</title>
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
      </button>

      <button class="table-page-button next-page ${this.data.meta.currentPage === this.data.meta.pages ? 'disabled' : ''}"  data-page="${this.data.meta.currentPage < this.data.meta.pages ? this.data.meta.currentPage + 1 : this.data.meta.currentPage}" title="derecha">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>chevron-right</title>
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>

      <button class="table-page-button last-page ${this.data.meta.currentPage === this.data.meta.pages ? 'disabled' : ''}" data-page="${this.data.meta.pages}" title ="doble derecha">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>chevron-double-right</title>
          <path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
        </svg>
      </button>
    </div>
  </div>
</div>
</section>
    
    `

    this.data.rows.forEach(element => {
      const tableBody = this.shadow.querySelector('.table__body')
      const elementBox = document.createElement('div')
      elementBox.classList.add('.table__body__element-box')
      tableBody.appendChild(elementBox)

      const upperRow = document.createElement('div')
      upperRow.classList.add('element-box__upper-row')
      elementBox.appendChild(upperRow)

      const editButton = document.createElement('button')
      editButton.classList.add('edit-button')
      editButton.dataset.id = element.id
      upperRow.appendChild(editButton)
      editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>pencil</title>
                <path
                  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
              </svg>`
      const deleteButton = document.createElement('button')
      deleteButton.classList.add('delete-button')
      deleteButton.dataset.id = element.id

      upperRow.appendChild(deleteButton)
      deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>delete</title>
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>`

      const data = document.createElement('div')
      data.classList.add('element-box__data')
      elementBox.appendChild(data)

      const ul = document.createElement('ul')
      data.appendChild(ul)

      const name = document.createElement('li')
      ul.appendChild(name)
      name.textContent = `Nombre: ${element.name}`

      const email = document.createElement('li')
      ul.appendChild(email)
      email.textContent = `Email: ${element.email}`

      const createdAt = document.createElement('li')
      ul.appendChild(createdAt)
      createdAt.textContent = `Creado: ${element.createdAt}`

      const uptatedAt = document.createElement('li')
      ul.appendChild(uptatedAt)
      uptatedAt.textContent = `Actualizado: ${element.updatedAt}`
    })

    this.renderButtons()
  }

  renderButtons () {
    this.shadow.querySelector('.table').addEventListener('click', async event => {
      if (event.target.closest('.edit-button')) {
        const element = event.target.closest('.edit-button')
        const id = element.dataset.id
        const endpoint = `${this.endpoint}/${id}`

        try {
          const response = await fetch(endpoint)

          if (response.status === 500 || response.status === 404) {
            throw response
          }

          const data = await response.json()

          const formElement = {
            endPoint: this.endpoint,
            data
          }

          store.dispatch(showFormElement(formElement))
        } catch (error) {
          document.dispatchEvent(new CustomEvent('notice', {
            detail: {
              message: 'No se han podido recuperar el dato',
              type: 'error'
            }
          }))
        }
      }

      if (event.target.closest('.delete-button')) {
        const element = event.target.closest('.delete-button')
        const id = element.dataset.id

        // llama a una funcion con CustomEvent que se llama showDeleteModal que esta en otra funcion
        document.dispatchEvent(new CustomEvent('showDeleteModal', {
          detail: {
            endpoint: this.endpoint,
            elementId: id
          }
        }))
      }

      if (event.target.closest('.filter-button')) {
        document.dispatchEvent(new CustomEvent('showFilterModal', {
          detail: {
            endpoint: this.endpoint
          }
        }))
      }

      if (event.target.closest('.pagination-button') && !event.target.closest('.pagination-button').classList.contains('disabled')) {
        const page = event.target.closest('.pagination-button').dataset.page
        let endpoint = `${this.endpoint}?page=${page}`

        if (this.filterQuery) {
          endpoint = `${endpoint}&${this.filterQuery}`
        }
        this.loadData(endpoint).then(() => this.render())
      }
    })
  }
}

customElements.define('bots-table-component', BotTable)
