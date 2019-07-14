const deleteBookBtn = document.querySelectorAll('.delete-book-btn');
const deleteOverlay = document.querySelector('#deleteOverlay');
const html = document.documentElement;

let i = 0;
const btnLength = deleteBookBtn.length;

for (i; i < btnLength; i++) {
  deleteBookBtn[i].addEventListener('click', async function(event) {
    const bookId = this.dataset.id;

    deleteOverlay.classList.remove('d-none');
    html.style.overflow = 'hidden';

    try {
      const response = await fetch('/api/delete-book', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      // TODO: in Production maybe need to remove timeout
      setTimeout(() => {
        deleteOverlay.classList.add('d-none');
        html.style.overflow = 'visible';

        document.querySelector(`[data-book="${bookId}"]`).remove();
        scroll(0, 0);
      }, 1000);
    } catch (err) {
      console.log(err)
    }
  });
}
