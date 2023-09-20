const dataOriginal = [
  {
    name: "Refacoring",
    author: "Martin Fowler",
    topic: "Programming",
  },
  {
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
  },
  {
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "DevOps",
  },
  {
    name: "Vaporware",
    author: "Richard Dansky",
    topic: "Programming",
  },
];

if (
  localStorage.getItem("dataAss1") === null ||
  localStorage.getItem("dataAss1") == "[]"
)
  localStorage.setItem("dataAss1", JSON.stringify(dataOriginal));

let data = JSON.parse(localStorage.getItem("dataAss1"));
const table = document.getElementById("table");
const renderTable = () => {
  let html = `
     <thead>
          <tr>
               <th class="text-center">Index</th>
               <th class="text-center">Name</th>
               <th class="text-center">Author</th>
               <th class="text-center">Topic</th>
               <th class="text-center">Action</th>
          </tr>
     </thead>
     <tbody>
  `;
  data.forEach((item, index) => {
    html += `
          <tr>
               <td class="text-center">${index + 1}</td>
               <td>${item.name}</td>
               <td>${item.author}</td>
               <td>${item.topic}</td>
               <td class="text-center">
                    <button onclick="deleteItem(
                         ${index},
                         '${item.name}'
                    )">Delete</button>
               </td>
          </tr>
     `;
  });
  html += `</tbody>`;
  table.innerHTML = html;
};
renderTable();

let addBookModal = document.getElementById("addBookModal");
let isOpenModal = false;

// Khi người dùng click nút Mở Modal
function openModalAddNewBook() {
  setTimeout(() => {
    addBookModal.style.display = "block";
    isOpenModal = true;
    console.log("1");
  }, 100);
}

// Khi người dùng click nút Đóng Modal hoặc nút ngoài modal
function closeModalAddNewBook() {
  checkValidate("name");
  checkValidate("author");
  checkValidate("topic");
  addBookModal.style.display = "none";
}

// Đóng modal khi người dùng click ra ngoài modal
// window.onclick = function (event) {
//      console.log("event.target", event.target);
//   if (isOpenModal && event.target != addBookModal) {
//     addBookModal.style.display = "none";
//   }
// };

/** Show errpr */

let nameError = document.getElementById("name-error");
let authorError = document.getElementById("author-error");
let topicError = document.getElementById("topic-error");

function checkValidate(type) {
  if (type == "name") {
    if (document.getElementById("name").value == "") {
      nameError.style.display = "block";
      document.getElementById("name").style.border = "1px solid red";
    } else {
      nameError.style.display = "none";
      document.getElementById("name").style.border = "1px solid #ccc";
    }
  } else if (type == "author") {
    if (document.getElementById("author").value == "") {
      authorError.style.display = "block";
      document.getElementById("author").style.border = "1px solid red";
    } else {
      authorError.style.display = "none";
      document.getElementById("author").style.border = "1px solid #ccc";
    }
  }
}


/** Add new book */
function addNewBook() {
  let name = document.getElementById("name").value;
  let author = document.getElementById("author").value;
  let topic = document.getElementById("topic").value;

  if (name == "" || author == "" || topic == "") {
    if (name == "") showError("name");
    if (author == "") showError("author");
    if (topic == "") showError("topic");
    return;
  }

  let newBook = {
    name: name,
    author: author,
    topic: topic,
  };
  data.push(newBook);
  localStorage.setItem("dataAss1", JSON.stringify(data));
  renderTable();
  closeModalAddNewBook();
}

let confirmModal = document.getElementById("confirmModal");
let messageDiv = document.getElementById("message");
let isOpenConfirmModal = false;
let idBookDelete = undefined;
function deleteItem(index, name) {
  idBookDelete = index;
  let message = `<span>Do you want to delete <b>${name}</b> book ?</span>`;
  confirmModal.style.display = "block";
  messageDiv.innerHTML = message;
}

function closeConfirmModal() {
  idBookDelete = undefined;
  confirmModal.style.display = "none";
}

function deleteBook() {
  data.splice(idBookDelete, 1);
  localStorage.setItem("dataAss1", JSON.stringify(data));
  renderTable();
  closeConfirmModal();
}

function searchByName(partialName) {
  let results = dataOriginal.filter((book) =>
    book.name.toLowerCase().includes(partialName.toLowerCase())
  );
  console.log("results", results);
  data = results;
  renderTable();
}

document.querySelector("#search-box").addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    let partialName = document.getElementById("search-box").value;
    searchByName(partialName);
  }
});
