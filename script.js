
  const clock = document.getElementById('clock');
  setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('id-ID') + ' - ' + now.toLocaleDateString('id-ID');
  }, 1000);

  function updateDeleteAllButton() {
    const hasTasks = document.getElementById('todoTableBody').children.length > 0;
    const btn = document.getElementById('deleteAllBtn');
    if (hasTasks) {
      btn.classList.remove('hidden');
    } else {
      btn.classList.add('hidden');
    }
  }

  function deleteAllTasks() {
    document.getElementById('todoTableBody').innerHTML = '';
    document.getElementById('doneTableBody').innerHTML = '';
    toggleSections();
    updatePriorityCount();
    updateDeleteAllButton();
  }

  function openModal() {
    document.getElementById('formModal').classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('formModal').classList.add('hidden');
  }

  function toggleSections() {
    const hasActive = document.getElementById('todoTableBody').children.length > 0;
    const hasDone = document.getElementById('doneTableBody').children.length > 0;
    document.getElementById('activeSection').classList.toggle('hidden', !hasActive);
    document.getElementById('doneSection').classList.toggle('hidden', !hasDone);
  }

  function updatePriorityCount() {
    let high = 0, medium = 0, low = 0;
    const rows = document.querySelectorAll('#todoTableBody tr');
    rows.forEach(row => {
      const priorityText = row.querySelector('td:nth-child(4)')?.textContent?.trim();
      if (priorityText === 'High') high++;
      else if (priorityText === 'Medium') medium++;
      else if (priorityText === 'Low') low++;
    });
    document.getElementById('countHigh').textContent = high;
    document.getElementById('countMedium').textContent = medium;
    document.getElementById('countLow').textContent = low;
  }

  function submitTask() {
    const task = document.getElementById('taskInput').value;
    const date = document.getElementById('dateInput').value;
    const priority = document.getElementById('priorityInput').value;

    if (!task || !date) return alert('Isi semua data!');

    const tr = document.createElement('tr');
    const checkboxTd = document.createElement('td');
    const taskTd = document.createElement('td');
    const dateTd = document.createElement('td');
    const priorityTd = document.createElement('td');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'w-4 h-4 mx-auto';
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        tr.remove();
        const doneTr = document.createElement('tr');
        doneTr.innerHTML = `
          <td class="line-through text-gray-500">${task}</td>
          <td>${date}</td>
          <td>${priority}</td>
        `;
        document.getElementById('doneTableBody').appendChild(doneTr);
        toggleSections();
        updatePriorityCount();
        updateDeleteAllButton(); // <-- penting: update tombol setelah checkbox
      }
    });

    checkboxTd.appendChild(checkbox);
    taskTd.textContent = task;
    dateTd.textContent = date;
    priorityTd.textContent = priority.trim();

    tr.appendChild(checkboxTd);
    tr.appendChild(taskTd);
    tr.appendChild(dateTd);
    tr.appendChild(priorityTd);

    document.getElementById('todoTableBody').appendChild(tr);
    closeModal();

    document.getElementById('taskInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('priorityInput').value = 'Medium';

    toggleSections();
    updatePriorityCount();
    updateDeleteAllButton(); // <-- penting: setelah submit
  }

  document.addEventListener('DOMContentLoaded', () => {
    toggleSections();
    updatePriorityCount();
    updateDeleteAllButton();
  });