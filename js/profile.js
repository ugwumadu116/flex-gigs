let userInfo = JSON.parse(localStorage.getItem("user"));
let setUser = userInfo.name.split("")[0] || "?";
$(".firstName").text(setUser);
let myUser = {};

$(document).ready(async () => {
  let users = await $.ajax({
    method: "GET",
    url: `http://localhost:3000/users/${userInfo.id}?_embed=profiles`,
    dataType: "json"
  });
  myUser = users;
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
  await getButton();
});

$(".create").click(() => {
  $(".sell-car-overlay").toggleClass("transparentBcg2");
  $(".sell-car").toggleClass("showSell-carX");
});

$("#create-profile").submit(e => {
  e.preventDefault();
  const skill = $("#skill").val();
  const imageUrl = $("#img").val();
  const price = $("#price").val();
  const description = $("#description").val();

  let formData = JSON.stringify({
    userId: userInfo.id,
    skill,
    imageUrl,
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

//close modal 2
$(".close-profile2").click(() => {
  $(".sell-car-overlay2").toggleClass("transparentBcg22");
  $(".sell-car2").toggleClass("showSell-carX2");
});

// update
const getButton = () => {
  $(".update").click(() => {
    $("#skill2").val(myUser.profiles[0].skill);
    $("#img2").val(myUser.profiles[0].imageUrl);
    $("#price2").val(myUser.profiles[0].price);
    $("#description2").val(myUser.profiles[0].description);
    $(".sell-car-overlay2").toggleClass("transparentBcg22");
    $(".sell-car2").toggleClass("showSell-carX2");
  });

  $("#create-profile2").submit(e => {
    e.preventDefault();
    const skill = $("#skill2").val();
    const imageUrl = $("#img2").val();
    const price = $("#price2").val();
    const description = $("#description2").val();

    let formData = JSON.stringify({
      userId: userInfo.id,
      skill,
      imageUrl,
      price,
      description
    });
    //console.log(formData);
    $.ajax({
      method: "PATCH",
      url: `http://localhost:3000/profiles/${myUser.id}`,
      dataType: "json",
      contentType: "application/json",
      data: formData
    }).done(function(data) {
      console.log(data);
      Swal.fire(
        "Good job!",
        "You have successfully updated your profile",
        "success"
      );
    });
  });
};
