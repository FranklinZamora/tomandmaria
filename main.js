window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Inicializar EmailJS
document.addEventListener('DOMContentLoaded', function() {
  emailjs.init("MKDm68Kk9JuSeRDtu");

  // Manejador de eventos para el formulario
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          emailjs.sendForm('service_in5rwpi', 'template_7ibvtdu', this)
              .then(function() {
                  console.log('SUCCESS!');
                  const modal = document.getElementById('emailSentModal');
                  const span = document.getElementsByClassName('close')[0];
                  modal.style.display = 'block';
                  span.onclick = function() {
                      modal.style.display = 'none';
                      location.reload(); // Refrescar la página al cerrar el modal
                  }
                  window.onclick = function(event) {
                      if (event.target == modal) {
                          modal.style.display = 'none';
                          location.reload(); // Refrescar la página al cerrar el modal
                      }
                  }
              }, function(error) {
                  console.log('FAILED...', error);
              });
      });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const consentCheckbox = document.getElementById('consent');
  const submitBtn = document.getElementById('submit-btn');
  const modal = document.getElementById('subscriptionModal');
  const span = modal.getElementsByClassName('close')[0];

  function validateForm() {
    if (nameInput.value && emailInput.value && consentCheckbox.checked) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  nameInput.addEventListener('input', validateForm);
  emailInput.addEventListener('input', validateForm);
  consentCheckbox.addEventListener('change', validateForm);

  document.getElementById('newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    modal.style.display = 'block';
  });

  span.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
});