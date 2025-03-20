document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("newsletter-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const consentCheckbox = document.getElementById("consent");
    const submitButton = document.getElementById("submit-btn");
    const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2JmNmZmNDM2MWI0YmRjZjJjOTcwZTE3NTRhYWYwZTJiYjRlNWI2ZTk2NDZlY2JmMDNkNjU1NjM2MDNkYjcyNzkwMTQ2ZGNkMzRkOTY2NmIiLCJpYXQiOjE3NDI1MDg1NDkuODgxNzQ0LCJuYmYiOjE3NDI1MDg1NDkuODgxNzQ3LCJleHAiOjQ4OTgxODIxNDkuODc3NzA0LCJzdWIiOiIxMzg0MzA3Iiwic2NvcGVzIjpbXX0.O6f3vr0ZAdkigNbkqjAz7WL-38bAQnzoAwHx0U06Epdvz7JncIgQQfJxEX2_GRJ78OJE8mgoGGX5zF_dfqI8cxDbz1V6SNjNzECYp3WfTT01H3hDMBA5kfHFskcybq-F-WhKguG8cnkKpuNBXDhkq1c7y0dUQZmYKgtpa0nbAI5oUzo-4OoJjEz286ja-g9B4G-jZDUhrGzLyucRhs-roXzS9Ee7nRKnfp_3zwTfQwVZ71FS0Z-hAoZmXRM5t28eXLDNMlUPeaDQ8EL2siTixfNYAG6ntAWasm5LZCAKpu6Ek0YOLfa3hTGgA2D2teBwsYoXc_mk4BeSw5fQi_eRilndQZpdfJZmcDIXj2fCnwoWD3d0cFsFltrjUHOjjMVXBo_5wpkoui1nh6WConLQnEazCOHjJM6JN9GtLP5OdF2liGKYnOFJ1fAPaY4IpULaAssCyHycKTuDvOL3ueWZ7pxg1bXwXvCkVKgS4GBsIV1vZbGavb3M5eo-wllJl9c82ZNIbuvDWQB732q4hKaHgwZlYoxoEYMK1bJXkJHbKHs0Jr_emnsChK__MbePBvxB7akncyeKTI3Z5y4tT_8Cte2i0mFv7yvaymVWiCp7oFCW0f5r-1C_AMui_OCmiZrVtRQfyj-tLrfgUT49wnwKGhZphj8BRuYw_Hr9M9vbv58"; // Reemplázalo con tu API Key de MailerLite

// Habilitar el botón solo si se acepta el consentimiento
consentCheckbox.addEventListener("change", function () {
    submitButton.disabled = !consentCheckbox.checked;
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validación básica
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
      modalTitle.textContent = "Error";
      modalMessage.textContent = "Please fill in all fields.";
      modal.style.display = "block";
      return;
    }

    submitButton.textContent = "Subscribing...";
    submitButton.disabled = true;

    // Enviar datos a MailerLite
    try {
      const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          email: email,
          fields: { name: name },
          resubscribe: true
        })
      });

      const result = await response.json();
      console.log("Response:", result); // Depuración: Verifica la respuesta del servidor

      if (response.ok) {
        modalTitle.textContent = "Subscription Successful";
        modalMessage.textContent = "Thank you for subscribing to our newsletter!";
        form.reset();
        submitButton.disabled = true;
      } else {
        throw new Error(result.message || "An error occurred while subscribing.");
      }
    } catch (error) {
      console.error("Error:", error); // Depuración: Verifica el error
      modalTitle.textContent = "Error";
      modalMessage.textContent = error.message;
    } finally {
      modal.style.display = "block";
      submitButton.textContent = "Subscribe";
      submitButton.disabled = false;
    }
  });

  // Cerrar el modal
  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});