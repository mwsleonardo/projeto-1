
const masks = {
   
    money (value) {
      const cleanValue = +value.replace(/\D+/g, '')
      const options = { style: 'currency', currency: 'BRL' }
      return new Intl.NumberFormat('pt-br', options).format(cleanValue / 100)
    },
  
  }
  

  document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js
  
    $input.addEventListener('input', e => {
      e.target.value = masks[field](e.target.value)
    }, false)
  })



