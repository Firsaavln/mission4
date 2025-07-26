
// let dataTodoList = localStorage.getItem('todolist') !== null ? JSON.parse(localStorage.getItem('todolist')) : []

// const addTodoList = (data) => {
//   dataTodoList = [
//     data,
//     ...dataTodoList,
//   ]
//   localStorage.setItem('todolist', JSON.stringify(dataTodoList))
// }

// const deleteData = (index) => {
//   dataTodoList = dataTodoList.filter((e, i) => {
//     return i !== index
//   })
// }

// const deleteAllData = () => {
//   dataTodoList = []
//   localStorage.removeItem('todolist')
// }

// const editData = (index, data) => {
//   dataTodoList[index] = {
//     ...dataTodoList[index],
//     ...data
//   }
// }

// const launchPage = () => {
//   const container = document.getElementById('container')
//   container.innerHTML = ''

//   if(dataTodoList.length === 0) {
//     const p = document.createElement('p')
//     p.textContent = 'Tidak ada todo list'

//     container.appendChild(p)
//   } else {
//     const ul = document.createElement('ul')

//     dataTodoList.forEach((item) => {
//       const li = document.createElement('li')
//       li.textContent = `${item.desc} - ${item.status}`

//       ul.appendChild(li)
//     })

//     container.appendChild(ul)
//   }
// }

// const renderDeleteAllTodo = () => {
//   const buttonDeleteAllTodo = document.getElementById('buttonDeleteAllTodo')

//   buttonDeleteAllTodo.addEventListener('click', () => {
//     deleteAllData()
//     launchPage()
//   })
// }

// launchPage()
// renderDeleteAllTodo()




// const form = document.getElementById('form')
// const alertError = document.getElementById('alertError')

// form.addEventListener('submit', (e) => {
//   e.preventDefault()

//   if(e.target.descTodo.value !== '') {
//     addTodoList({
//       desc: e.target.descTodo.value,
//       status: e.target.statusTodo.value
//     })
    
//     document.getElementById('textError')?.remove()

//     form.reset()
//     launchPage()
//   } else {
//     const textError = document.createElement('p')
//     textError.id = 'textError'
//     textError.style.color = 'red'
//     textError.textContent = 'Desc Tidak Boleh Kosong!'
//     alertError.replaceChildren(textError)
//   }
// })


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const descInput = document.getElementById('desc');
    const dateInput = document.getElementById('date');
    const priorityInput = document.getElementById('floatingSelect');
    const tableBody = document.querySelector('table tbody');
    const doneTableBody = document.querySelector('#doneTable tbody');

    let counter = 1;
    let doneCounter = 1;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const desc = descInput.value.trim();
        const date = dateInput.value;
        const priority = priorityInput.value;

        if (!desc || !date || !priority) {
            alert("Please fill out all fields");
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${counter}</th>
            <td>${desc}</td>
            <td>${date}</td>
            <td>(${priority})</td>
            <td>
                <input type="checkbox" class="done-checkbox"> Done
            </td>
            <td> <button class="btn btn-danger btn-delete ms-2">Delete</button> </td>
        `;

        tableBody.appendChild(row);
        counter++;

        form.reset();
        priorityInput.value = 'Low';
    });

    tableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-delete')) {
            e.target.closest('tr').remove();
        }

        if (e.target.classList.contains('done-checkbox')) {
            const currentRow = e.target.closest('tr');
            const desc = currentRow.children[1].textContent;
            const date = currentRow.children[2].textContent;
            const priority = currentRow.children[3].textContent;

            // Tambahkan ke tabel Done
            const doneRow = document.createElement('tr');
            doneRow.innerHTML = `
                <th scope="row">${doneCounter}</th>
                <td>${desc}</td>
                <td>${date}</td>
                <td>${priority}</td>
                <td><button class="btn btn-danger btn-delete">Delete</button></td>
            `;
            doneTableBody.appendChild(doneRow);
            doneCounter++;

            // Hapus dari tabel utama
            currentRow.remove();
        }
    });

    doneTableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-delete')) {
            e.target.closest('tr').remove();
        }
    });
});
