class Header extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>

      * {
        box-sizing: border-box;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color:#414040;
        height: 90%;
      }
   
    </style>

    <header>
      <slot></slot>
    </header>
    
    `
  }
}

customElements.define('header-component', Header)
