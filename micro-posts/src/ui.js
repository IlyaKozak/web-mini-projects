class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = document.querySelector('add');
  }

  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.postsContainer');
    const cardForm = document.querySelector('.card-form');
    container.insertBefore(div, cardForm);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  clearIdInput() {
    this.idInput.value = '';
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-danger btn-block';
    
      const button = document.createElement('button');
      button.className = 'mt-2 post-cancel btn btn-dark btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));
    
      const cardForm = document.querySelector('.card-form');
      cardForm.appendChild(button);

    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';      
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      this.clearIdInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();