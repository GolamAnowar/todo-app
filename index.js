const taskInput = document.querySelector(".task-input input"),
taskBox = document.querySelector(".task-box"),
filters = document.querySelectorAll(".filters span"),
clear = document.querySelector("button");

let isEditin = false, editId;

let notes = JSON.parse(localStorage.getItem("notes") || "[]");

for(let i = 0; i < filters.length; i++){
    console.log(filters[i])
    filters[i].onclick = () => {
        document.querySelector(".filters .active").classList.remove("active");
        filters[i].classList.add("active");
        showNotes(filters[i].id);
    }
}

function showNotes(filter){
    console.log(filter)
    let liTag = ""
    notes.forEach((note, index) => {
        // console.log(note, index)
        let isCompletd = note.status == "completed" ? "checked" : "";
        if(filter == note.status || filter == "all"){
            liTag += `<li class="task">
            <label for="${index}">
                <input onclick="lineThough(this)" type="checkbox" id="${index}" ${isCompletd}>
                <p class="${isCompletd}">${note.name}</p>
            </label>
            <div class="setting">
                <i onclick="openMenu(this)" class='bx bx-dots-horizontal-rounded'></i>
                <ul class="task-menu">
                    <li onclick="edit(${index}, '${note.name}')">
                        <i class='bx bx-edit-alt' ></i>
                        <span>edit</span>
                    </li>
                    <li onclick="delet(${index})">
                        <i class='bx bx-trash-alt' ></i>
                        <span>delet</span>
                    </li>
                </ul>
            </div>
            </li>`;
        }
    });
    taskBox.innerHTML = liTag;
}
showNotes("all");

function edit(id, name){
    taskInput.value = name;
    editId = id;
    isEditin = true;
}

clear.addEventListener("click", () => {
    document.querySelector(".div").style.display = "block"
    document.querySelector("div .sure").addEventListener("click", () => {
        notes.splice(0, notes.length);
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
    })
    
});

function delet(e){
    console.log(e)
    notes.splice(e, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes("all");
}

function openMenu(e){
    let taskMenu = e.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", (el) => {
        if(el.target.tagName !== "I" || el.target !== e){
            taskMenu.classList.remove("show");
        }
    });
}

function lineThough(e){
    // console.log(e)
    let pTag = e.parentElement.lastElementChild;
    if(e.checked){
        pTag.classList.add("checked");
        notes[e.id].status = "completed";
    }else{
        pTag.classList.remove("checked");
        notes[e.id].status = "pending";
    }
    
    localStorage.setItem("notes", JSON.stringify(notes));
}

taskInput.addEventListener("keyup", (e) => {
    let userValue = taskInput.value.trim();
    if(e.key == "Enter" && userValue){
        let noteTask = {name: userValue, status: "pending"};
        if(!isEditin){
            notes.push(noteTask);
        }else{
            notes[editId] = noteTask;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        taskInput.value = "";
        showNotes("all");
    }
});