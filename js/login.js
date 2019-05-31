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
      let storeUser = { id: user.id, name: user.firstName };
      localStorage.setItem("user", JSON.stringify(storeUser));
      Swal.fire("Good job!", "Welcome back!", "success");
      setTimeout(function() {
        window.location.href = "freelancers.html";
      }, 3000);
      //window.location.href = "freelancers.html";
    } else {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "User not registered please signup"
      });
    }
  });
});
