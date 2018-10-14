// console.log("Hello World");

const container = document.querySelector(".elements-grid");
const thumbnailSize = `800x600`;
const listsOfStream = {};

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

  return listsOfUsers.json()
}

async function getStreams() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Client-ID": "1pad2r1f4sf4viku4n5ss733prh1sm",
      "Content-Type": "application/json"
    }
  };
  const streamUrl =
    "https://api.twitch.tv/helix/streams?game_id=21779&language=en";
  const requestStream = new Request(encodeURI(streamUrl), requestOptions);
  const lists = [];
  const listsOfStreams = await fetch(requestStream);
  const streams = await listsOfStreams.json();

  const idLists = streams.data.map(stream => {
    return `id=${stream.user_id}`; 
  });
  const userLists = await getUsersInfo(idLists.join("&")).then(response => response.data);
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
      tmp["thumbnail"] = stream["thumbnail_url"].replace(/({width})x({height})/i, `${thumbnailSize}`);
      lists.push(tmp);
  });
  return lists;
}

getStreams();
