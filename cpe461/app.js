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

    // Simulate account creation
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  });

  updateSubmitState();
}

// --- Dashboard modal + list actions ----------------------------------------
// --- Edit Button Handlers -----------------------------------------------
function initEditButtons() {
  const editBtns = document.querySelectorAll('.edit-btn');
  editBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Navigate to edit idea page
      window.location.href = 'edit_idea.html';
    });
  });
}
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const deleteModal = document.getElementById('deleteModal');
      if (deleteModal) {
        // Custom modal for pages with deleteModal
        const ideaTitle = btn.closest('.idea-card').querySelector('.idea-title').textContent;
        document.getElementById('delete-idea-title').textContent = ideaTitle;
        const modal = new bootstrap.Modal(deleteModal);
        modal.show();
        // Handle confirm delete
        const confirmBtn = document.getElementById('confirm-delete');
        let cardToDelete = btn.closest('.idea-card');
        const handleConfirm = () => {
          cardToDelete?.remove();
          modal.hide();
          confirmBtn.removeEventListener('click', handleConfirm);
        };
        confirmBtn.addEventListener('click', handleConfirm);
      } else {
        // Fallback to confirm for other pages
        if (confirm('Are you sure you want to delete this idea? This action cannot be undone.')) {
          btn.closest('.idea-card')?.remove();
        }
      }
    });
  });
}

function initDashboard() {
  const modal = document.getElementById('modal');
  if (!modal) return;

  const cancelBtn = document.getElementById('cancel-btn');
  const saveBtn = document.getElementById('save-btn');

  cancelBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  saveBtn?.addEventListener('click', () => {
    alert('Idea saved!');
    modal.classList.add('hidden');
  });

  // Delete buttons are now handled separately
}

// --- Edit Idea Page Delete Button ---------------------------------------------
function initEditIdeaDelete() {
  const deleteBtn = document.getElementById('delete-idea-btn');
  if (!deleteBtn) return;

  deleteBtn.addEventListener('click', () => {
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      // Get the idea title from the form
      const ideaTitle = document.getElementById('idea-title').value;
      document.getElementById('delete-idea-title').textContent = ideaTitle;
      const modal = new bootstrap.Modal(deleteModal);
      modal.show();

      // Handle confirm delete
      const confirmBtn = document.getElementById('confirm-delete');
      const handleConfirm = () => {
        // Simulate deletion request
        setTimeout(() => {
          // On success, redirect to my ideas page
          window.location.href = 'myideas.html';
        }, 1000);
        confirmBtn.removeEventListener('click', handleConfirm);
      };
      confirmBtn.addEventListener('click', handleConfirm);
    }
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

    // Simulate idea submission
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  });

  cancelBtn.addEventListener('click', () => {
    form.reset();
    updateCounters();
    validateForm();
  });

  updateCounters();
  validateForm();
}

// --- Idea edit form --------------------------------------------------
function initEditForm() {
  const form = document.getElementById('edit-form');
  if (!form) return;

  const titleInput = document.getElementById('idea-title');
  const categorySelect = document.getElementById('category');
  const shortDesc = document.getElementById('short-description');
  const fullDesc = document.getElementById('full-description');
  const shortCounter = document.getElementById('short-char-count');
  const fullCounter = document.getElementById('full-char-count');
  const submitBtn = document.querySelector('.btn-submit');

  // Store original values for clearing on focus
  const originalValues = {
    title: titleInput.value,
    shortDesc: shortDesc.value,
    fullDesc: fullDesc.value
  };

  // Track if user has interacted with fields
  let hasInteracted = false;

  // Disable submit button by default
  submitBtn.disabled = true;

  function updateCounters() {
    shortCounter.textContent = shortDesc.value.length;
    fullCounter.textContent = fullDesc.value.length;
  }

  function validateForm() {
    const titleValid = titleInput.value.trim().length > 0;
    const categoryValid = categorySelect.value !== '';
    const shortValid = shortDesc.value.trim().length > 0;
    const fullValid = fullDesc.value.trim().length > 0;

    submitBtn.disabled = !(hasInteracted && titleValid && categoryValid && shortValid && fullValid);
  }

  // Clear pre-filled text on focus
  titleInput.addEventListener('focus', () => {
    if (titleInput.value === originalValues.title) {
      titleInput.value = '';
    }
  });

  titleInput.addEventListener('blur', () => {
    if (titleInput.value === '') {
      titleInput.value = originalValues.title;
    }
  });

  shortDesc.addEventListener('focus', () => {
    if (shortDesc.value === originalValues.shortDesc) {
      shortDesc.value = '';
      updateCounters();
      validateForm();
    }
  });

  shortDesc.addEventListener('blur', () => {
    if (shortDesc.value === '') {
      shortDesc.value = originalValues.shortDesc;
      updateCounters();
      validateForm();
    }
  });

  fullDesc.addEventListener('focus', () => {
    if (fullDesc.value === originalValues.fullDesc) {
      fullDesc.value = '';
      updateCounters();
      validateForm();
    }
  });

  fullDesc.addEventListener('blur', () => {
    if (fullDesc.value === '') {
      fullDesc.value = originalValues.fullDesc;
      updateCounters();
      validateForm();
    }
  });

  [titleInput, categorySelect, shortDesc, fullDesc].forEach((el) => {
    el.addEventListener('input', () => {
      hasInteracted = true;
      updateCounters();
      validateForm();
    });
  });

  categorySelect.addEventListener('change', () => {
    hasInteracted = true;
    validateForm();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (submitBtn.disabled) return;

    alert('Idea updated successfully!');
    // In real app, save to database
    window.location.href = 'myideas_home.html';
  });

  updateCounters();
  validateForm();
}

// --- Account settings form --------------------------------------------------
function initAccountSettings() {
  const form = document.getElementById('account-settings-form');
  if (!form) return;

  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const bioTextarea = document.getElementById('bio');
  const submitBtn = document.querySelector('.primary-btn');

  function validateForm() {
    const nameValid = fullNameInput.value.trim().length > 0;
    const emailValid = emailInput.checkValidity();
    const bioValid = bioTextarea.value.trim().length > 0;

    submitBtn.disabled = !(nameValid && emailValid && bioValid);
  }

  [fullNameInput, emailInput, bioTextarea].forEach((input) => {
    input.addEventListener('input', validateForm);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (submitBtn.disabled) return;

    // Simulate saving settings
    alert('Account settings saved successfully!');
    // In real app, save to database
    window.location.href = "dashboard.html";
  });

  validateForm();
}

// Initialize based on current page
initSignup();
initDashboard();
initDeleteButtons();
initEditButtons();
initIdeaDetail();
initSubmitForm();
initEditForm();
initEditIdeaDelete();
initAccountSettings();
