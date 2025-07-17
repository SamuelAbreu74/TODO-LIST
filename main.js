// Criando Variáveis de Controle
const form = document.getElementById("form");
const title = document.getElementById("task-title");
const date = document.getElementById("task-date");
const description = document.getElementById("task-input");
const error_msg = document.getElementById("error-msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

// Validando Fomulário
form.addEventListener("submit", (e) => {
    e.preventDefault();
    FormValidation()
})

const FormValidation = () => {
    if (title.value === "") {
        return (error_msg.innerHTML = "Task can't be blank!", console.log("Failure"))
    }
    console.log("Success")
    error_msg.innerHTML = "";
    AcceptData();
    const modalInstance = bootstrap.Modal.getInstance(form);
    modalInstance.hide();
}

// Guardando Informações
let data = [{}];
const AcceptData = () => {
    data.push({
        title: title.value,
        date: date.value,
        description: description.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data)
    CreateTask();
}

// Cria a Task
const CreateTask = () => {
    tasks.innerHTML = ""
    data.map((x, y) => {
        return (tasks.innerHTML +=
            `
    <div id=%{y}>
        <span class="fw-bold">${x.title}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>
        <span class="options">
            <i onclick="EditTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onclick="DeleteTask(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>
    `
    )})
    resetform();

}

// Apaga a Task
const DeleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data))
    console.log(data);
}

// Edita a Task
const EditTask = (e) => {
    const selectedtask = e.parentElement.parentElement;
    title.value = selectedtask.children[0].innerHTML;
    date.value = selectedtask.children[1].innerHTML;
    description.value = selectedtask.children[2].innerHTML;
    DeleteTask(e);
}

let resetform = () => {
    title.value = "";
    date.value = "";
    description.value = "";
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    CreateTask();
})()