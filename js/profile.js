let userInfo = JSON.parse(localStorage.getItem("user"));
let setUser = userInfo.name.split("")[0] || "?";
$(".firstName").text(setUser);

$(document).ready(async () => {
  let users = await $.ajax({
    method: "GET",
    url: `http://localhost:3000/users/${userInfo.id}?_embed=profiles`,
    dataType: "json"
  });
  if (users.profiles.length <= 0) {
    $(".profile-container").html(`<div class="empty-profile">
      <h1>Please create your profile</h1>
    </div>`);
  } else {
    $(".create").css({ display: "none" });
    $(".profile-container").html(`
    <article id="user-profile-info">
    <div class="user-info">
      <div class="user user-img">
        <span class="firstName">${setUser}</span>
      </div>
      <div class="name">
        <h1>${users.firstName} ${users.lastName}</h1>
      </div>
      <div class="price"><h4>$${users.profiles[0].price}/hr</h4></div>
      <div class="card-img">
        <img
          src=${users.profiles[0].imageUrl}
          class="car-img"
          alt="product"
          data-id="1"
        />
      </div>
    </div>
    <div class="skills">
      <h3>${users.profiles[0].skill}</h3>
    </div>
    <div class="description">
      ${users.profiles[0].description}
    </div>
  </article>
  <div class="footer">
    <button class="delete">delete</button>
    <button class="update">update</button>
  </div>
    `);
  }
});

$(".create").click(() => {
  $(".sell-car-overlay").toggleClass("transparentBcg2");
  $(".sell-car").toggleClass("showSell-carX");
});

$("#create-profile").submit(e => {
  e.preventDefault();
  const skill = $("#skill").val();
  const img = $("#img").val();
  const price = $("#price").val();
  const description = $("#description").val();

  let formData = JSON.stringify({
    userId: userInfo.id,
    skill,
    img,
    price,
    description
  });
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/profiles",
    dataType: "json",
    contentType: "application/json",
    data: formData
  }).done(function(data) {
    Swal.fire(
      "Good job!",
      "You have successfully created your profile",
      "success"
    );
  });
});

// close modal
$(".close-profile").click(() => {
  $(".sell-car-overlay").toggleClass("transparentBcg2");
  $(".sell-car").toggleClass("showSell-carX");
});
