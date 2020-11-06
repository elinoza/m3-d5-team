window.onload = () => {
  loadAlbums();
};

let fetchAlbums = (endp, data) => {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/" + endp, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "49f4e1e876msh90846b28b1ca30fp193c58jsn17d62173eae9",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (response.ok) {
        // console.log(response.json);
        return response.json();
      }
    })
    .then((body) => {
      // console.log(body);
      data(body);
    })

    .catch((err) => {
      alert("AN ERROR HAS OCCURRED  " + err);
      console.error(err);
    });
};
let pages = ["#overview", "#fans", "#about"];
const loadAlbums = () => {
  let endpoint = window.location.href.split("id=")[1];
  console.log(endpoint);
  endp = "artist/" + endpoint;
  console.log(endp);
  fetchAlbums(endp, (body) => {
    console.log(body);
    //CHANGE THE ARTIST NAME
    const title = document.querySelector("#title");
    title.innerText = body.name;
    //CHANGE THE BACKGROUNDIMAGE
    const img = document.querySelector(".head img");
    img.src = body.picture_big;
    //GET TRACKS
    getTracks(body.tracklist.split("com/")[1]);
    //GET ALBUMS
    getAlbums("search?q=" + body.name);
  });
};
//Get Tracks for popular
const getTracks = (tracks) => {
  fetchAlbums(tracks, (tracklist) => {
    const destination = document.querySelector("#myTabContent table");
    let list = document.createElement("tbody");
    for (let i = 0; i < 5; i++) {
      const track = tracklist.data[i];

      list.innerHTML += `<tr>
          <th scope="row">${i + 1}<img class="ml-3" src="${track.album.cover}" style="width: 2.5rem">
          </th>
          <td class="play"><i class="fas fa-play-circle"></i></td>
          <td><a class="text-truncate text-muted">${track.title}</a></td>
          <td></td>
          <td>${(track.duration / 60).toFixed(0)}:${((track.duration / 60 - (track.duration / 60).toFixed(0)) * 60).toFixed(0)}</td></tr>
        `;
    }
    destination.appendChild(list);
  });
};
//Get Albums
const getAlbums=()=>{
    fetchAlbums(tracks, (tracklist) => {
        const destination = document.querySelector("#myTab");
        let list = document.createElement("tbody");
        for (let i = 0; i < 5; i++) {

}