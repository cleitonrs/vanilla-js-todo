const form = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const ul = document.querySelector('.todos-container')

form.addEventListener('submit', event => {
  event.preventDefault()

  const todo = event.target.add.value.trim()
  if (todo.length) {
    ul.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
      </li>
    `
  }
  event.target.reset()
})

ul.addEventListener('click', event => {
  const clickedElement = event.target

  if (Array.from(clickedElement.classList).includes('delete')) {
    clickedElement.parentElement.remove()
  }
})

inputSearchTodo.addEventListener('input', event => {
  const inputValue = event.target.value.trim().toLowerCase()
  Array.from(ul.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(inputValue))
    .forEach(todo => {
      todo.classList.remove('d-flex')
      todo.classList.add('hidden')
    })
  Array.from(ul.children)
    .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
    .forEach(todo => {
      todo.classList.remove('hidden')
      todo.classList.add('d-flex')
    })
})