const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    img {
      width: 100%;
    }
  </style>
`;

const io = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.setAttribute('full', '');
    }
  }
});

class WegoImg extends HTMLElement {
  static get is() { return 'wego-img'; }
  static get observedAttributes() {
    return ['full'];
  }

  constructor() {
    super();
    const self = this;
    self.attachShadow({ mode: 'open' });
    self.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    io.observe(this);
  }

  disconnectedCallback() {
    io.unobserve(this);
  }

  get full() {
    return this.hasAttribute('full');
  }

  get src() {
    return this.getAttribute('src');
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    const self = this;
    if (self.loaded)
      return;

    const img = document.createElement('img');
    img.src = self.src;
    img.onload = _ => {
      self.loaded = true;
      self.shadowRoot.appendChild(img);
    }
  }
}

window.customElements.define(WegoImg.is, WegoImg);