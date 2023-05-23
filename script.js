const addTtitle = document.querySelector("#addTitle");
const addText = document.querySelector("#addText");
const addBtn = document.querySelector("#button");
const notes = document.querySelector("#container-notes");
const addColor = document.querySelector("#color-change");
const addImage = document.querySelector("#image");
const addSearch = document.querySelector(".search");

function searchNote() {
  const search = document.querySelector("#searchNotes").value;
  const notes = document.querySelectorAll(".notes");
  for (let i = 0; i < notes.length; i++) {
    if (
      notes[i]
        .querySelector("input")
        .value.toLowerCase()
        .includes(search.toLowerCase())
    ) {
      notes[i].style.display = "block";
    } else {
      notes[i].style.display = "none";
    }
  }
}

addSearch.addEventListener("input", () => searchNote());

function showNotes() {
  getNotes().forEach((notite) => {
    const noteElement = createNote(
      notite.title,
      notite.text,
      notite.color,
      notite.image
    );
    notes.appendChild(noteElement);
  });
}

function addNote() {
  const notite = getNotes();

  const noteObj = {
    title: addTtitle.value,
    text: addText.value,
    color: addColor.value,
    image: addImage.value,
  };
  console.log(noteObj);
  const noteElement = createNote(
    noteObj.title,
    noteObj.text,
    noteObj.color,
    noteObj.image
  );
  notes.appendChild(noteElement);
  notite.push(noteObj);
  saveNotes(notite);
  notite.value = "";
}

function createNote(title, text, color) {
  const element = document.createElement("div");
  element.classList.add("notes");
  const titlu = document.createElement("input");
  titlu.value = title;
  titlu.placeholder = "Title";
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.placeholder = "Take a note... ";
  const icons = document.createElement("div");
  const bell = document.createElement("i");
  bell.classList.add("fas");
  bell.classList.add("fa-bell");
  const trash = document.createElement("i");
  trash.classList.add("fas");
  trash.classList.add("fa-trash");
  const pencil = document.createElement("input");
  pencil.type = "color";
  pencil.value = color;
  pencil.classList.add("color-palette");
  const addImage = document.createElement("input");
  addImage.type = "file";
  addImage.classList.add("image");
  const edit = document.createElement("i");
  edit.classList.add("fas");
  edit.classList.add("fa-edit");
  element.style.backgroundColor = pencil.value;
  element.style.backgroundImage = "url(" + addImage.value + ")";

  element.appendChild(titlu);
  element.appendChild(textarea);
  element.appendChild(bell);
  element.appendChild(trash);
  element.appendChild(pencil);
  element.appendChild(addImage);
  element.appendChild(edit);
  notes.appendChild(element);

  element
    .querySelector(".fa-trash")
    .addEventListener("click", () => deleteNote());

  function deleteNote() {
    element.remove();
    const deleteNotite = getNotes();
    const noteElement = createNote();
    notes.removeChild(noteElement);
    deleteNotite.splice(deleteNotite.indexOf(noteElement), 1);
    saveNotes(deleteNotite);
  }

  element
    .querySelector(".fa-edit")
    .addEventListener("click", () => noteUpdate());

  function noteUpdate() {
    const updateNotite = getNotes();

    const elementObj = {
      title: title,
      text: text,
      color: color,
    };
    const index = updateNotite.findIndex((obj) => {
      return (
        obj.title === elementObj.title &&
        obj.text === elementObj.text &&
        obj.color === elementObj.color
      );
    });
    updateNotite[index] = {
      title: titlu.value,
      text: textarea.value,
      color: pencil.value,
    };
    saveNotes(updateNotite);
    isUpdate = true;
    element.querySelector("input").value = titlu.value;
    element.querySelector("textarea").value = textarea.value;
    element.querySelector(".color-palette").value = pencil.value;
    console.log(updateNotite);
    console.log(elementObj);
  }
  element
    .querySelector(".color-palette")
    .addEventListener("change", () => addColor());

  function addColor() {
    element.style.backgroundColor = pencil.value;
  }

  element.querySelector(".image").addEventListener("change", () => {
    element.style.backgroundImage = "url(" + image.value + ")";
  });

  return element;
}

function getNotes() {
  const getNotes = JSON.parse(localStorage.getItem("notite") || "[]");
  return getNotes;
}

function saveNotes(notite) {
  localStorage.setItem("notite", JSON.stringify(notite));
}

addBtn.addEventListener("click", () => addNote());

showNotes();
