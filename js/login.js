$(".login-form").submit(e => {
  e.preventDefault();

  const password = $("#password").val();
  const email = $("#email").val();

  $.ajax({
    method: "GET",
    url: "http://localhost:3000/users",
    dataType: "json"
  }).done(function(data) {
    let user = data.find(
      item => item.email === email && item.password === password
    );
    if (user) {
      Swal.fire("Good job!", "Welcome back!", "success");
      localStorage.setItem("user", JSON.stringify(user));
      window.location.replace("dashboard.html");
    } else {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "User not registered please signup"
      });
    }
  });
});
