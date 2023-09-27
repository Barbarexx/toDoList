const createButton = document.querySelector(`#create-task-button`);
const editButtons = document.querySelectorAll(`.edit-button`);
const body = document.querySelector('body');
const wrap = document.querySelector('.wrap')


editButtons.forEach((editButton)=>{
    editButton.addEventListener('click',editTask);
})

createButton.addEventListener('click',createTask);

function createTask() {
    console.log('create');
}
function editTask(elem) {
    const editPopup = document.createElement('div');
    editPopup.className = 'edit-popup';
    editPopup.innerHTML = `
    <h1 class="edit-popup_title">
        Задача на сегодня
        <span class="edit-popup_title-colored">[Редактирование]</span>
    </h1>
    <div class="edit-popup__subtitle subtitle-edit-popup">
        <p class="subtitle-edit-popup__title">
            Название
        </p>
        <input placeholder="Task for today" class="subtitle-edit-popup__input" type="text">
    </div>
    <div class="edit-popup__buttons buttons-edit-popup">
        <button class="buttons-edit-popup__delete">Delete</button>
        <button class="buttons-edit-popup__save">Save</button>
    </div>

    `
    wrap.after(editPopup);
    wrap.classList.add('dark');
    console.log(elem);
}
