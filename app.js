const taskList = document.querySelector('.main__tasks');
taskList.innerHTML = localStorage.getItem("task")
const wrap = document.querySelector('.wrap')
handleEventListeners()
function handleEventListeners() {
    const createButton = document.querySelector(`#create-task-button`);
    const editButtons = document.querySelectorAll(`.edit-button`);
    editButtons.forEach((editButton)=>{
        editButton.addEventListener('click',editTask);
    })
    createButton.addEventListener('click',createTask);
}
function createTask() {
    const createPopup = createConstructorPopup();
    const buttonCreate = document.querySelector('.buttons-create-popup__create');
    buttonCreate.addEventListener('click',saveTask(createPopup))
}
function createEditPopup(value) {
    const editPopup = document.createElement('div');
    editPopup.className = 'edit-popup';
    editPopup.innerHTML = `
    <h1 class="edit-popup__title">
        Задача на сегодня
        <span class="edit-popup__title-colored">[Редактирование]</span>
    </h1>
    <div class="edit-popup__subtitle subtitle-edit-popup">
        <p class="subtitle-edit-popup__title">
            Название
        </p>
        <input data-type="edit" class="subtitle-edit-popup__input" type="text" value="${value}">
    </div>
    <div class="edit-popup__buttons buttons-edit-popup">
        <button class="buttons-edit-popup__delete">Delete</button>
        <button class="buttons-edit-popup__save">Save</button>
    </div>

    `
    wrap.after(editPopup);
    wrap.classList.add('dark');
    return editPopup
}
function createConstructorPopup() {
    const editPopup = document.createElement('div');
    editPopup.className = 'create-popup';
    editPopup.innerHTML = `
    <h1 class="create-popup__title">
        Задача на сегодня
        <span class="create-popup__title-colored">[Создание]</span>
    </h1>
    <div class="create-popup__subtitle subtitle-create-popup">
        <p class="subtitle-create-popup__title">
            Название
        </p>
        <input placeholder="Task for today" class="subtitle-create-popup__input" type="text">
    </div>
    <div class="create-popup__buttons buttons-create-popup">
        <button class="buttons-create-popup__create">Create</button>
    </div>

    `
    wrap.after(editPopup);
    wrap.classList.add('dark');
    return editPopup
}
function editTask(event) {
    const inputParent = event.target.parentNode;
    const placeholderValue = event.target.previousElementSibling.placeholder;
    const inputValue = event.target.previousElementSibling.value;

    const editPopup = createEditPopup(inputValue ? inputValue : placeholderValue);
    const buttonDelete = document.querySelector('.buttons-edit-popup__delete');
    const buttonSave = document.querySelector('.buttons-edit-popup__save');
  
    buttonSave.addEventListener('click',saveTask(editPopup, event));
    buttonDelete.addEventListener('click',deleteTask(editPopup,inputParent));
}
function deleteTask(editPopup,inputParent) {
    return ()=>{
        wrap.classList.toggle('dark');
        editPopup.remove();
        inputParent.remove();
        localStorage.setItem("task", taskList.innerHTML)
    }
}
function saveTask(popup,parent) {
    return (event)=>{
        const taskValue = event.srcElement.parentNode.previousElementSibling.lastElementChild.value;
        console.dir(event.srcElement.parentNode.previousElementSibling.lastElementChild);
        wrap.classList.toggle('dark');
        popup.remove();
        if (parent) {
            parent.target.previousElementSibling.value = `${taskValue}`
            parent.target.previousElementSibling.setAttribute('value', `${taskValue}`)
            localStorage.setItem("task", taskList.innerHTML)
        }
        else{
            createTaskItem(taskValue)
        }
    }
}
function createTaskItem(inputValue) {
    const taskList = document.querySelector('.main__tasks');
    const task = document.createElement('div');
    task.className = 'main-tasks__task task';
    task.innerHTML = `
    <input placeholder="Task for today" class="task__input" type="text" name="task_value" value="${inputValue}">
    <button class="task__button edit-button"></button>
    `
    taskList.append(task);
    localStorage.setItem("task", taskList.innerHTML)
    handleEventListeners()
}
