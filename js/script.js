// selectors
const input = document.querySelector('.todo__input');
const btnAdd = document.querySelector('.btn-primary');
const btnEdit = document.querySelector('.btn-edit');
const btnDelete = document.querySelectorAll('.btn-delete');
const listContainer = document.querySelector('.todo__list');
const data = [];

btnAdd.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
function addTask() {
  if (!input.value || !input.value.trim()) return;
  data.push(input.value);
  renderTask(listContainer, input.value);
  input.value = '';
  localStorage.setItem('task', JSON.stringify(data));
}
function renderTask(container, text) {
  // function to render the task taking the text inside and the container
  const markup = `<div class="todo__list--item">
            <p class="todo__list--item-task">${text}</p>
            <textarea
              class="todo__list--item-edit hidden"
              name="textarea"
              id=""
            ></textarea>
            <div>
              <button class="btn btn-edit"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
  container.insertAdjacentHTML('beforeend', markup);
}

listContainer.addEventListener('click', (e) => {
  // edit the element text
  const listItem = e.target.closest('.todo__list--item');
  if (!listItem) return;
  const task = listItem.querySelector('.todo__list--item-task');
  const field = listItem.querySelector('.todo__list--item-edit');
  // check if target is edit btn or the font awesome icon
  if (
    e.target.classList.contains('btn-edit') ||
    e.target.parentElement.classList.contains('btn-edit')
  ) {
    // if the textarea is hidden the element become a textarea and get the value of the paragraph
    if (field.classList.contains('hidden'))
      field.value = task.innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    // if the paragraph is hidden the element become a paragraph and get the value of the textarea
    else if (task.classList.contains('hidden'))
      task.innerText = field.value.trim();
    //change hidden from one element to the other
    task.classList.toggle('hidden');
    field.classList.toggle('hidden');
  }
  // remove element from the list
  // check if target is delete btn or the font awesome icon
  if (
    e.target.classList.contains('btn-delete') ||
    e.target.parentElement.classList.contains('btn-delete')
  ) {
    //remove from data
    const index = data.indexOf(task.textContent);
    data.splice(index, 1);
    // restore the data
    localStorage.setItem('task', JSON.stringify(data));
    listItem.remove();
  }
});

// load the stored data
window.addEventListener('load', () => {
  JSON.parse(localStorage.getItem('task')).forEach((st) => {
    data.push(st);
  });
  data.forEach((data) => {
    renderTask(listContainer, data);
  });
});
