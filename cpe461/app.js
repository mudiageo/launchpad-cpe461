/* --------------------------------------------------------------------------
   Signup form validation / Dashboard modal / Idea detail interaction
   -------------------------------------------------------------------------- */

// --- Signup page logic ------------------------------------------------------
function initSignup() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const agreeCheckbox = document.getElementById('agree');
  const submitBtn = document.getElementById('submit-btn');
  const passwordHelper = document.getElementById('password-helper');

  function updateSubmitState() {
    const nameValid = fullNameInput.value.trim().length > 0;
    const emailValid = emailInput.checkValidity();
    const passwordValid = passwordInput.value.length >= 8;
    const agreed = agreeCheckbox.checked;

    submitBtn.disabled = !(nameValid && emailValid && passwordValid && agreed);

    if (passwordInput.value.length > 0 && !passwordValid) {
      passwordHelper.textContent = 'Must be at least 8 characters';
      passwordHelper.style.color = '#b91c1c';
    } else {
      passwordHelper.textContent = 'Must be at least 8 characters';
      passwordHelper.style.color = '#6b7280';
    }
  }

  [fullNameInput, emailInput, passwordInput].forEach((input) => {
    input.addEventListener('input', updateSubmitState);
  });

  agreeCheckbox.addEventListener('change', updateSubmitState);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (submitBtn.disabled) return;

    alert('Account created successfully!');
    form.reset();
    updateSubmitState();
    fullNameInput.focus();
  });

  updateSubmitState();
}

// --- Dashboard modal + list actions ----------------------------------------
function initDashboard() {
  const modal = document.getElementById('modal');
  if (!modal) return;

  const editBtns = document.querySelectorAll('.edit-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const saveBtn = document.getElementById('save-btn');

  editBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  });

  cancelBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  saveBtn?.addEventListener('click', () => {
    alert('Idea saved!');
    modal.classList.add('hidden');
  });

  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this idea? This action cannot be undone.')) {
        btn.closest('.idea-card')?.remove();
      }
    });
  });
}

// --- Idea detail interactions ------------------------------------------------
function initIdeaDetail() {
  const upvoteBtn = document.querySelector('.upvote-btn');
  const upvoteCount = document.getElementById('upvote-count');
  const commentForm = document.getElementById('comment-form');
  const commentList = document.querySelector('.comments');

  if (upvoteBtn && upvoteCount) {
    upvoteBtn.addEventListener('click', () => {
      const current = Number(upvoteCount.textContent) || 0;
      upvoteCount.textContent = String(current + 1);
      upvoteBtn.setAttribute('aria-pressed', 'true');
    });
  }

  if (commentForm && commentList) {
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const textarea = document.getElementById('comment-input');
      if (!textarea) return;

      const text = textarea.value.trim();
      if (!text) return;

      const comment = document.createElement('div');
      comment.className = 'comment';

      const header = document.createElement('div');
      header.className = 'comment-header';

      const author = document.createElement('span');
      author.className = 'comment-author';
      author.textContent = 'You';

      const time = document.createElement('span');
      time.className = 'comment-time';
      time.textContent = 'Just now';

      header.append(author, time);

      const body = document.createElement('p');
      body.className = 'comment-body';
      body.textContent = text;

      comment.append(header, body);
      commentList.appendChild(comment);

      textarea.value = '';
      textarea.focus();
    });
  }
}

// --- Idea submission form --------------------------------------------------
function initSubmitForm() {
  const form = document.getElementById('submit-form');
  if (!form) return;

  const titleInput = document.getElementById('idea-title');
  const categorySelect = document.getElementById('category');
  const shortDesc = document.getElementById('short-desc');
  const fullDesc = document.getElementById('full-desc');
  const shortCounter = document.getElementById('short-counter');
  const fullCounter = document.getElementById('full-counter');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  function updateCounters() {
    shortCounter.textContent = `${shortDesc.value.length} characters`;
    fullCounter.textContent = `${fullDesc.value.length} characters`;
  }

  function validateForm() {
    const titleValid = titleInput.value.trim().length > 0;
    const categoryValid = categorySelect.value !== '';
    const shortValid = shortDesc.value.trim().length > 0;
    const fullValid = fullDesc.value.trim().length > 0;

    submitBtn.disabled = !(titleValid && categoryValid && shortValid && fullValid);
  }

  [titleInput, categorySelect, shortDesc, fullDesc].forEach((el) => {
    el.addEventListener('input', () => {
      updateCounters();
      validateForm();
    });
  });

  categorySelect.addEventListener('change', validateForm);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (submitBtn.disabled) return;

    alert('Idea submitted successfully!');
    form.reset();
    updateCounters();
    validateForm();
  });

  cancelBtn.addEventListener('click', () => {
    form.reset();
    updateCounters();
    validateForm();
  });

  updateCounters();
  validateForm();
}

// Initialize based on current page
initSignup();
initDashboard();
initIdeaDetail();
initSubmitForm();
