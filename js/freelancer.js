let myUsers = [];
$(document).ready(async () => {
  let users = await $.ajax({
    method: "GET",
    url: "http://localhost:3000/users?_embed=profiles",
    dataType: "json"
  });
  const simplifiedUser = users.map(item => {
    if (item.profiles.length > 0) {
      const { id, firstName, email } = item;
      const { description, imageUrl, price, skill } = item.profiles[0];

      return {
        id,
        firstName,
        email,
        description,
        imageUrl,
        price,
        skill
      };
    }
  });
  myUsers = [...simplifiedUser];

  $.map(simplifiedUser, (user, i) => {
    if (user !== undefined) {
      $(".cars-container").append(`
    <article class="card">
    <div class="card-header">
      <div class="card-img">
        <img
          src=${user.imageUrl}
          class="car-img"
          alt="product"
          data-id="1"
        />
      </div>
      <div class="user-title">
        <h3>${user.firstName}</h3>
        <h5>${user.skill}</h5>
        <h5 class="price">$${user.price}/hr</h5>
      </div>
    </div>
    <div class="cart-footer">
      <button class="add-car view-user" id=${user.id}>
        view profile
      </button>
    </div>
  </article>
    `);
    }
  });
  await getClick();
});

let { name } = JSON.parse(localStorage.getItem("user"));
let setUser = name.split("")[0] || "?";
$(".firstName").text(setUser);
const getClick = () => {
  let newArr = $(".view-user").toArray();
  $.each(newArr, function(i, val) {
    let userID = i + parseInt($(".view-user").attr("id"));
    $(`#${userID}`).click(() => {
      let singleUser = myUsers.find(userDetails => {
        if (userDetails !== undefined) {
          return userDetails.id === userID;
        }
      });
      showUser(singleUser);
    });
  });
};

const showUser = user => {
  $(".single-car-content").html(`
  <article>
  <img src=${user.imageUrl} alt="car">
  <div class="single-car-item">
      <div class="car-info">NAME : </div>
      <div class="car-info-val">
          <h3>${user.firstName}</h3>
      </div>
  </div>
  <div class="single-car-item">
      <div class="car-info">PRICE : </div>
      <div class="car-info-val">
          <h3>${user.price}</h3>
      </div>
  </div>
  <div class="single-car-item">
      <div class="car-info">EMAIL : </div>
      <div class="car-info-val">
          <h3>${user.email}</h3>
      </div>
  </div>
  <div class="single-car-item">
      <div class="car-info">SKILLS : </div>
      <div class="car-info-val">
          <h3>${user.skill}</h3>
      </div>
  </div>
  <div class="single-car-item">      
          <h3>${user.description}</h3>
      </div>
  </div>
  </article>
  `);

  $(".single-car-overlay").toggleClass("transparentBcg1");
  $(".single-car").toggleClass("showSingleCar");
};

// close single user
$(".close-single-car").click(() => {
  $(".single-car-overlay").toggleClass("transparentBcg1");
  $(".single-car").toggleClass("showSingleCar");
});
