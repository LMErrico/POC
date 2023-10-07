const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#menu-name').value.trim();
  const price = document.querySelector('#menu-price').value.trim();
  const description = document.querySelector('#menu-desc').value.trim();

  if (name && price && description) {
    const response = await fetch(`/api/menus`, {
      method: 'POST',
      body: JSON.stringify({ name, price, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/menuAdmin');
    } else {
      alert('Failed to create menu');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/menus/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/menuAdmin');
    } else {
      alert('Failed to delete menu');
    }
  }
};

document
  .querySelector('.new-menu-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.menu-list')
  .addEventListener('click', delButtonHandler);
