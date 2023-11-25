let thead = document.getElementById("table-head");
let tbody = document.getElementById("table-body");

let loader = document.getElementById("loader");
let data = document.getElementById("container");

let fetchedData;

const showLoader = () => {
  loader.style.display = "block";
  data.style.display = "none";
  document.getElementById("body").style.height = "100vh";
};

const hideLoader = () => {
  loader.style.display = "none";
  data.style.display = "block";
  document.getElementById("body").style.height = "auto";
};

showLoader();
setTimeout(() => {
  hideLoader();
}, 5000);

// Getting data of users
const userData = () => {
  tbody.innerHTML = "";
  thead.innerHTML = `<tr>
            <th>s.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Check Post</th>
          </tr>`;
  fetch("https://jsonplaceholder.typicode.com/users/")
    .then((response) => response.json())
    .then((users) => {
      for (let i = 0; i < users.length; i++) {
        tbody.innerHTML += `
              <tr>
                  <th>${users[i].id}</th>
                  <td>${users[i].name}</td>
                  <td>${users[i].email}</td>
                  <td>${users[i].address.city}</td>
                  <td class="button"><button onclick="checkPost(${users[i].id})" class="btn">See Posts</button></td>
              </tr>
          `;
      }
    })
    .catch((err) => console.error(err));
};

userData();
// for check posts
const checkPost = (usersId) => {
  showLoader();
  setTimeout(() => {
    hideLoader();
  }, 5000);

  tbody.innerHTML = "";
  thead.innerHTML = ` 
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Discryption</th>
            <th>Check comments</th>
          </tr>
        `;
  fetch("https://jsonplaceholder.typicode.com/posts?userId=" + usersId)
    .then((response) => response.json())
    .then((post) => {
      console.log(post);
      for (let i = 0; i < post.length; i++) {
        tbody.innerHTML += `
                <tr>
                    <th>${post[i].id}</th>
                    <td>${post[i].title}</td>
                    <td>${post[i].body}</td>
                    <td class="button"><span onclick="seePost_Comment(${post[i].id})" class="btn"><svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path
        d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320v-480 480Zm594 0 46 45v-525H160v480h594Z"
      /> 
    </svg> comments</span></td>
                </tr>
            `;
      }
    })
    .catch((error) => {
      console.error("Failed to fetch post", error);
      tbody.innerHTML =
        '<tr><td colspan="5">Error fetching user posts</td></tr>';
    });
};

// for check comments

const seePost_Comment = (postsId) => {
  showLoader();
  setTimeout(() => {
    hideLoader();
  }, 5000);

  tbody.innerHTML = "";
  thead.innerHTML = ` 
        <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Body</th>
        </tr>`;
  fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postsId)
    .then((response) => response.json())
    .then((getComments) => {
      console.log(getComments);
      for (let i = 0; i < getComments.length; i++) {
        tbody.innerHTML += `
                <tr>
                    <th>${getComments[i].id}</th>
                    <td>${getComments[i].name}</td>
                    <td>${getComments[i].email}</td>
                    <td>${getComments[i].body}</td>
                </tr>
            `;
      }
    })
    .catch((error) => {
      console.error("Failed to fetch Comments:", error);
      tbody.innerHTML =
        '<tr><td colspan="5">Error fetching user comments</td></tr>';
    });
};

const goBack = () => {
  showLoader();
  setTimeout(() => {
    hideLoader();
  }, 5000);

  userData();
};

// here I didn't know about async await