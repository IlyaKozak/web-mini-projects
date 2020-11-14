import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit post state
document.querySelector('#posts').addEventListener('click', editPost);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
  // https://jsonplaceholder.typicode.com/posts
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

function submitPost() {
  const title = document.querySelector('#title').value.trim();
  const body = document.querySelector('#body').value.trim();
  const id = document.querySelector('#id').value.trim();

  if (title === '' || body === '') {
    ui.showAlert('Please enter post title & body', 'alert alert-warning');
    ui.clearFields();
  } else {
    const data = {
      title,
      body
    };

    if (id === '') {
      http.post('http://localhost:3000/posts', data)
        .then(() => {
          ui.showAlert(`Post '${title}' added`, 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // Update Post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(() => {
          ui.showAlert(`Post '${title}' updated`, 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }

}

function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          ui.showAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

function editPost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const data = {
      id,
      title,
      body
    }

    ui.fillForm(data);
  }
}

function cancelEdit(e) {
  e.preventDefault();
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
}