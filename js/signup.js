$("#sign-up").submit(e => {
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const password = $("#password").val();
  const email = $("#email").val();

  let formData = JSON.stringify({ firstName, lastName, password, email });

  if (!firstName.match(/^[A-Z]+$/i)) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "First name should be alphabets only"
    });
  } else if (!lastName.match(/^[A-Z]+$/i)) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "Last name should be alphabets only"
    });
  } else {
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/users",
      dataType: "json",
      contentType: "application/json",
      data: formData
    }).done(function(data) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.replace("dashboard.html");
    });
  }

  e.preventDefault();
});
