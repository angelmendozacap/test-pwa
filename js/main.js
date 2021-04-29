window.Components = {}

window.Components.listbox = function (t) {
  return {
    init() {
      this.optionCount = this.$refs.listbox.children.length,
        this.$watch('activeIndex', (t => {
          this.open && (null !== this.activeIndex ? this.activeDescendant = this.$refs.listbox.children[this.activeIndex + 1].id : this.activeDescendant = '')
        }))
    },
    activeDescendant: null,
    optionCount: null,
    open: !1,
    activeIndex: null,
    selectedIndex: 0,
    get active() {
      return this.items[this.activeIndex]
    },
    get [t.modelName || 'selected']() {
      return this.items[this.selectedIndex]
    },
    choose(t) {
      this.selectedIndex = t,
        this.open = !1
    },
    onButtonClick() {
      this.open || (this.activeIndex = this.selectedIndex, this.open = !0, this.$nextTick((() => {
        this.$refs.listbox.focus(),
          this.$refs.listbox.children[this.activeIndex].scrollIntoView({
            block: 'nearest'
          })
      })))
    },
    onOptionSelect() {
      null !== this.activeIndex && (this.selectedIndex = this.activeIndex),
        this.open = !1,
        this.$refs.button.focus()
    },
    onEscape() {
      this.open = !1,
        this.$refs.button.focus()
    },
    onArrowUp() {
      this.activeIndex = this.activeIndex - 1 < 0 ? this.optionCount - 1 : this.activeIndex - 1,
        this.$refs.listbox.children[this.activeIndex].scrollIntoView({
          block: 'nearest'
        })
    },
    onArrowDown() {
      this.activeIndex = this.activeIndex + 1 > this.optionCount - 1 ? 0 : this.activeIndex + 1,
        this.$refs.listbox.children[this.activeIndex].scrollIntoView({
          block: 'nearest'
        })
    },
    ...t,
  }
}

window.Components.menu = function (t = { open: !1 }) {
  return {
    init() {
      this.items = Array.from(this.$el.querySelectorAll('[role="menuitem"]'))
      this.$watch('open', (() => {
        this.open && (this.activeIndex = - 1)
      }))
    },
    activeDescendant: null,
    activeIndex: null,
    items: null,
    open: t.open,
    focusButton() {
      this.$refs.button.focus()
    },
    onButtonClick() {
      this.open = !this.open
      this.open && this.$nextTick((() => {
        this.$refs['menu-items'].focus()
      }))
    },
    onButtonEnter() {
      this.open = !this.open
      this.open && (this.activeIndex = 0, this.activeDescendant = this.items[this.activeIndex].id, this.$nextTick((() => {
        this.$refs['menu-items'].focus()
      })))
    },
    onArrowUp() {
      if (!this.open) return this.open = !0
      this.activeIndex = this.items.length - 1
      void (this.activeDescendant = this.items[this.activeIndex].id)
      0 !== this.activeIndex && (this.activeIndex = - 1 === this.activeIndex ? this.items.length - 1 : this.activeIndex - 1, this.activeDescendant = this.items[this.activeIndex].id)
    },
    onArrowDown() {
      if (!this.open) return this.open = !0
      this.activeIndex = 0
      void (this.activeDescendant = this.items[this.activeIndex].id)
      this.activeIndex !== this.items.length - 1 && (this.activeIndex = this.activeIndex + 1, this.activeDescendant = this.items[this.activeIndex].id)
    },
    onClickAway(t) {
      if (this.open) {
        const e = [
          '[contentEditable=true]',
          '[tabindex]',
          'a[href]',
          'area[href]',
          'button:not([disabled])',
          'iframe',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])'
        ].map((t => `${t}:not([tabindex='-1'])`)).join(',')
        this.open = !1
        t.target.closest(e) || this.focusButton()
      }
    }
  }
}

if ('serviceWorker' in navigator) {
  addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js')
      .then(reg => console.log('Service worker registered.', reg))
      .catch(err => console.warn('Error', err))
  })
}