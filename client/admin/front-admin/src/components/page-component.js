class PageComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.basePath = this.getAttribute('base-path') || ''
  }

  connectedCallback () {
    this.render()
    window.onpopstate = () => this.handleRouteChange()
  }

  handleRouteChange () {
    this.render()
  }

  render () {
    const path = window.location.pathname
    this.getTemplate(path)
  }

  async getTemplate (path) {
    const routes = {
      '/admin/usuarios': 'users.html',
      '/admin/eventos': 'events.html',
      '/admin/categorias-de-eventos': 'event-categories.html',
      '/admin/bots': 'bots.html',
      '/admin/promotores': 'promoters.html',
      '/admin/clientes': 'customers.html',
      '/admin/spots': 'spots.html',
      '/admin/lenguajes': 'languages.html',
      '/admin/faqs': 'faqs.html',

    }

    const filename = routes[path] || '404.html'

    await this.loadPage(filename)
  }

  async loadPage (filename) {
    const response = await fetch(`${this.basePath}/pages/${filename}`)
    const html = await response.text()

    document.startViewTransition(() => {
      this.shadowRoot.innerHTML = html
      document.documentElement.scrollTop = 0
    })
  }
}

customElements.define('page-component', PageComponent)
