const form = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const ul = document.querySelector('.todos-container')

const addTodo = todo => {
  if (todo.length) {
    ul.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${todo}">
        <span>${todo}</span>
        <i class="far fa-trash-alt" data-trash="${todo}"></i>
      </li>
    `
    event.target.reset()
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const todo = event.target.add.value.trim()
  addTodo(todo)
})

const removeTodo = clickedElement => {
  const trashDataValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

  if (trashDataValue) {
    todo.remove()
  }
}

ul.addEventListener('click', event => {
  const clickedElement = event.target
  removeTodo(clickedElement)
})

const filterTodos = (todos, inputValue, returnMatchedTodos) =>
  todos
    .filter(todo => {
      const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
      return returnMatchedTodos ? matchedTodos : !matchedTodos
    })

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach(todo => {
    todo.classList.remove(classToRemove)
    todo.classList.add(classToAdd)
  })
}

const hideTodos = (todos, inputValue) => {
  filterTodos(todos, inputValue, false)
    .forEach(todo => {
      todo.classList.remove('d-flex')
      todo.classList.add('hidden')
    })
}

const showTodos = (todos, inputValue) => {
  filterTodos(todos, inputValue, true)
    .forEach(todo => {
      todo.classList.remove('hidden')
      todo.classList.add('d-flex')
    })
}

inputSearchTodo.addEventListener('input', event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(ul.children)

  hideTodos(todos, inputValue)
  showTodos(todos, inputValue)
})