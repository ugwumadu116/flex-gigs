$(document).ready(async () => {
  let users = await $.ajax({
    method: "GET",
    url: "http://localhost:3000/users?_embed=profiles&_embed=skills",
    dataType: "json"
  });
  // let profile = await $.ajax({
  //   method: "GET",
  //   url: "http://localhost:3000/profile",
  //   dataType: "json"
  // });
  //console.log(users);
  //console.log(users);
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
  //console.log(products);

  $.map(simplifiedUser, (user, i) => {
    //let userDetails = users.find(user => user.id === item.usersId);
    //console.log(item.usersId);
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
      <button class="add-car" data-id="1">
        view profile
      </button>
    </div>
  </article>
    `);
    }
  });
});
// $.map(data, (user, i) => {
//   $(".cars-container").append(`
//   <article class="card">
//   <div class="card-header">
//     <div class="card-img">
//       <img
//         src="./images/default.jpg"
//         }
//         class="car-img"
//         alt="product"
//         data-id="1"
//       />
//     </div>
//     <div class="user-title">
//       <h3>name</h3>
//       <h5>profile title</h5>
//       <h5 class="price">price/hr</h5>
//     </div>
//   </div>
//   <hr />
//   <div class="details">
//     <span class="model">${user.skills}</span>
//     <span class="model">${user.skills}</span>
//     <span class="model">${user.skills}</span>
//   </div>
//   <div class="cart-footer">
//     <button class="add-car" data-id="${user.id}">
//       view profile
//     </button>
//   </div>
// </article>
//   `);
// });
