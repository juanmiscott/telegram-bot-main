class Main extends HTMLElement {
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

  
      main {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 20px;
        padding: 1rem 20px;
        width: 100%;
      }
   
    </style>

    <main>
      <slot></slot>
    </main>
    
    `
  }
}

customElements.define('main-component', Main)
