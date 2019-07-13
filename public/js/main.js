const addBookForm = document.querySelector('#addBookForm');
const addBookBtn = document.querySelector('#addBookBtn');
const addBookBtnSpinner = addBookBtn.querySelector('.spinner-border');
const addBookAlert = document.querySelector('#addBookAlert');
const nameField = document.querySelector('#name');
const coverField = document.querySelector('#cover');
const descriptionField = document.querySelector('#description');

addBookForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = nameField.value;
  const cover = coverField.value;
  const description = descriptionField.value;
  
  const bookData = {
    name,
    cover,
    description,
  }

  nameField.disabled = true;
  coverField.disabled = true;
  descriptionField.disabled = true;
  addBookBtn.disabled = true;
  addBookBtnSpinner.classList.remove('d-none');

  try {
    const response = await fetch('/api/add-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookData),
    });
    
    const data = await response.json();

    addBookAlert.classList.remove('d-none');
    addBookAlert.innerHTML = data.message;

    setTimeout(() => {
      location.href = '/';
    }, 1000);
  } catch (err) {
    console.log(err)
  }
});
