export const postList = document.querySelector(".posts");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();

      const li = `
      <li class="list-group-item list-group-item-action">
        <h5>${post.title}</h5>
        <p>${post.content}</p>
        <img src="${post.url}" width="100%"></img>
        <p>${post.datetime.toDate()}</p>
        <div style="position: absolute; top: 10px; right: 10px; display: flex; align-items: center; color: black;">
          <span style="margin-right: 5px;">
            <i class="fas fa-heart"></i> ${getRandomNumber(0, 100)}
          </span>
          <span style="margin-right: 5px;">
            <i class="fas fa-comment"></i> ${getRandomNumber(0, 50)}
          </span>
          <span>
            <i class="fas fa-retweet"></i> ${getRandomNumber(0, 20)}
          </span>
        </div>
        <div class="options-buttons">
          <button class="btn btn-info btn-edit" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#post-modal">
          ✏ Editar
          </button>
          <button class="btn btn-danger btn-delete" data-id="${doc.id}">
          🗑 Eliminar
          </button>
        </div>
      </li>
    `;
      html += li;
    });
    postList.innerHTML = html;
  } else {
    console.log("No post in DB");
  }
};

  