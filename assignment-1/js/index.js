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

const data = JSON.parse(localStorage.getItem("dataAss1"));
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
  addBookModal.style.display = "none";
}

// Đóng modal khi người dùng click ra ngoài modal
// window.onclick = function (event) {
//      console.log("event.target", event.target);
//   if (isOpenModal && event.target != addBookModal) {
//     addBookModal.style.display = "none";
//   }
// };

/** Add new book */
function addNewBook() {
  let name = document.getElementById("name").value;
  let author = document.getElementById("author").value;
  let topic = document.getElementById("topic").value;

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
