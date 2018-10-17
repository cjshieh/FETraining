// console.log("Hello World");

const container = document.querySelector(".elements-grid");
const menu = document.querySelector(".menu");
const spinner = document.querySelector(".spinner");
const thumbnailSize = "620x310";
let nextPageEncode = '';
let isLoading = false;

async function getStreams(nextPageStr='') {
  isLoading = true;
  const requestOptions = {
    method: "GET",
    headers: {
      "Client-ID": "1pad2r1f4sf4viku4n5ss733prh1sm",
      "Content-Type": "application/json"
    }
  };
  const streamUrl =
    `https://api.twitch.tv/helix/streams?game_id=21779&language=en&after=${nextPageStr}`;
  const requestStream = new Request(encodeURI(streamUrl), requestOptions);
  const lists = [];
  let listsOfStreams;
  try {
    listsOfStreams = await fetch(requestStream);
  } catch(err) {
    console.err('fetch failed', err);
    // return;
  }
  const streams = await listsOfStreams.json();
  // store pagination
  nextPageEncode = streams.pagination.cursor;

  const idLists = streams.data.map(stream => {
    return `id=${stream.user_id}`;
  });
  const userLists = await getUsersInfo(idLists.join("&")).then(
    response => response.data
  );
  const userListsMap = new Map();
  userLists.forEach(user => {
    userListsMap.set(user.id, user);
  });
  // combine step
  streams.data.map(stream => {
    const tmp = {};
    tmp["user_name"] = userListsMap.get(stream.user_id)["display_name"];
    tmp["user_img"] = userListsMap.get(stream.user_id)["profile_image_url"];
    tmp["title"] = stream["title"];
    tmp["thumbnail"] = stream["thumbnail_url"].replace(
      /({width})x({height})/i,
      `${thumbnailSize}`
    );
    lists.push(tmp);
  });
  return {data: lists, page: streams.pagination};
}

async function getUsersInfo(usersId) {
  if (usersId.length < 1) {
    return;
  }
  const requestOptions = {
    method: "GET",
    headers: {
      "Client-ID": "1pad2r1f4sf4viku4n5ss733prh1sm",
      "Content-Type": "application/json"
    }
  };
  const streamUrl = `https://api.twitch.tv/helix/users?${usersId}`;
  const requestUser = new Request(encodeURI(streamUrl), requestOptions);
  const listsOfUsers = await fetch(requestUser);

  return listsOfUsers.json();
}

function handleRequest(response) {
  response.data.forEach(stream => {
    const innerHTML = 
    `
    <div class="element">
      <div class="upper">
        <img id="channel" src=${stream.thumbnail} alt="" onload="this.style.opacity=1"/>
      </div>
      <div class="down">
        <div class="avtar">
          <img class="person" src=${stream.user_img} onload="toggleImg(this)">
        </div>
        <div class="content">
          <p class="channelname">${stream.title}</p>
          <p class="username">${stream.user_name}</p>
        </div>
      </div>
    </div>
    `;
    container.insertAdjacentHTML('beforeend', innerHTML); 
  });
  menu.style.display = 'flex';
  spinner.style.display = "none";
  isLoading = false;
  
}

function onScroll() {
  let scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.body.scrollTop;
  if(window.innerHeight + scrollY >= document.body.offsetHeight - 200) {
    // prevent multiple requests while loading...    
    if(!isLoading) {
      getStreams(nextPageEncode).then(handleRequest);
    }
  }
}

function toggleImg(that) {
  that.style.opacity = 1;
  that.parentNode.classList.toggle("hide");
}

// first load
getStreams().then(handleRequest);

// load more 
window.addEventListener('scroll', _.debounce(onScroll, 500));
