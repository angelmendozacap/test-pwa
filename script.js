if ('serviceWorker' in navigator) {
  addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service worker registered.', reg))
      .catch(err => console.warn('Error', err))
  })
}