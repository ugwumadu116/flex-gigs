$("#sign-up").submit(e => {
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();
  const email = $("#email").val();

  let formData = JSON.stringify({ firstName, lastName, password, email });

  if (!firstName.match(/^[A-Z]+$/i) || !lastName.match(/^[A-Z]+$/i)) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "First name and Last name should be alphabets only"
    });
  } else if (password !== confirmPassword) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "Password and confirm password must be the same"
    });
  } else {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/users",
      dataType: "json"
    }).done(function(data) {
      let user = data.find(item => item.email === email);
      if (user) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `User with this email: ${email} is already registered`
        });
      } else {
        $.ajax({
          method: "POST",
          url: "http://localhost:3000/users",
          dataType: "json",
          contentType: "application/json",
          data: formData
        }).done(function(data) {
          let storeUser = { id: data.id, name: data.firstName };
          localStorage.setItem("user", JSON.stringify(storeUser));
          window.location.href = "freelancers.html";
        });
      }
    });
  }

  e.preventDefault();
});
