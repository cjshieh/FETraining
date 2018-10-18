// console.log("Hello World");
import _ from 'lodash';
import EN from './lang-en';
import ZHTW from './lang-zh-tw';
import './style.css';
import './spinner.css';

const I18N = {
  'en': EN,
  'zh-tw': ZHTW
}

const container = document.querySelector(".elements-grid");
const menu = document.querySelector(".menu");
const spinner = document.querySelector(".spinner");
const thumbnailSize = "620x310";
let nextPageEncode = "";
let isLoading = false;
let LANG = "zh-tw";

function changeLang(e) {
  const lang = e.target.dataset.lang;
  const header = document.querySelector(".menu h1");
  header.textContent = I18N[lang]["TITLE"];
  LANG = lang;
  container.innerHTML = `
  <div id="spinner-content">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>`;
  getStreams().then(handleRequest);
}

async function getStreams(nextPageStr = "") {
  isLoading = true;
  const requestOptions = {
    method: "GET",
    headers: {
      "Client-ID": "1pad2r1f4sf4viku4n5ss733prh1sm",
      "Content-Type": "application/json"
    }
  };
  const streamUrl = `https://api.twitch.tv/helix/streams?game_id=21779&language=${LANG}&after=${nextPageStr}`;
  const requestStream = new Request(encodeURI(streamUrl), requestOptions);
  const lists = [];
  let listsOfStreams;
  try {
    listsOfStreams = await fetch(requestStream);
  } catch (err) {
    console.err("fetch failed", err);
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
  return { data: lists, page: streams.pagination };
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
    const innerHTML = `
    <div class="element">
      <div class="upper">
        <img class="channel" src=${
          stream.thumbnail
        } alt="" />
      </div>
      <div class="down">
        <div class="avtar">
          <img class="person" src=${stream.user_img}>
        </div>
        <div class="content">
          <p class="channelname">${stream.title}</p>
          <p class="username">${stream.user_name}</p>
        </div>
      </div>
    </div>`;
    container.insertAdjacentHTML("beforeend", innerHTML);
  });
  toggleVisibility();
  isLoading = false;
}

function onScroll() {
  let scrollY = window.scrollY || window.pageYOffset || document.body.scrollTop;
  if (window.innerHeight + scrollY >= document.body.offsetHeight - 200) {
    // prevent multiple requests while loading...
    if (!isLoading) {
      getStreams(nextPageEncode).then(handleRequest);
    }
  }
}

function toggleImg(e) {
  const that = e.target;
  if(that.className === 'person') {
    that.style.opacity = 1;
    that.parentNode.classList.toggle("hide");
  }else if( that.className === 'channel') {
    that.style.opacity = 1;
  }
}

function toggleVisibility() {
  menu.style.display = "flex";
  spinner.style.display = "none";
  const spinnerContent = document.querySelector("#spinner-content");
  if(spinnerContent) {
    spinnerContent.style.display='none';
  }
}

// first load
getStreams().then(handleRequest);

// load more
window.addEventListener("scroll", _.debounce(onScroll, 500));

// change language event
Array.from(document.querySelectorAll(".category a"))
  .forEach(link => {
    link.addEventListener("click", changeLang)});

// capturing any onload event
document.body.addEventListener('load', toggleImg, true);
