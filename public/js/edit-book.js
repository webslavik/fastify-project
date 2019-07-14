const editBookForm = document.querySelector('#editBookForm');
const editBookBtn = document.querySelector('#editBookBtn');
const editBookBtnSpinner = editBookBtn.querySelector('.spinner-border');
const editBookAlert = document.querySelector('#editBookAlert');
const nameField = document.querySelector('#name');
const coverField = document.querySelector('#cover');
const descriptionField = document.querySelector('#description');

editBookForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const bookId = this.dataset.bookId;
  const name = nameField.value;
  const cover = coverField.value;
  const description = descriptionField.value;
  
  const editData = {
    bookId,
    name,
    cover,
    description,
  };

  nameField.disabled = true;
  coverField.disabled = true;
  descriptionField.disabled = true;
  editBookBtn.disabled = true;
  editBookBtnSpinner.classList.remove('d-none');

  try {
    const response = await fetch('/api/edit-book', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData),
    });
    
    const data = await response.json();

    editBookAlert.classList.remove('d-none');
    editBookAlert.innerHTML = data.message;

    setTimeout(() => {
      location.href = '/';
    }, 2000);
  } catch (err) {
    console.log(err)
  }
});