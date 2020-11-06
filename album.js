window.onload = () => {
  loadTracks();
};

let fetchTracks = (endp) => {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/" + endp, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "49f4e1e876msh90846b28b1ca30fp193c58jsn17d62173eae9",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.json);
        return response.json();
      }
    })
    .then((body) => {
      console.log(body);
    })

    .catch((err) => {
      alert("AN ERROR HAS OCCURRED  " + err);
      console.error(err);
    });
};

const loadTracks = function () {
  const parsedUrl = new URL(window.location.href);
  let endp = "album/" + parsedUrl.searchParams.get("id");
  const albumTitle = document.querySelector("#album-title");
  const albumArtist = document.querySelector("#album-artist");
  const albumCover = document.querySelector("#album-img");
  const trackList = document.querySelector("#trackl-col");

  fetchTracks(endp, (body) => {
    console.log(body.data);
    albumTitle.innerText = body.data.album.title;
    albumArtist.innerText = body.data.artist.name;
    albumCover.innerText = body.data.album.cover_medium;
    body.data.forEach((element) => {
      let trackUl = document.createElement("ul");
      trackUl.className = "tracklist pr-3 p-1";
      trackUl.innerHTML += ` <li class="d-flex">
                        <a href="#">
                        <i class="align-self-start fas fa-music mr-2"></i>

                        <div class="d-inline align-self-start">
                            <p>${element.album.title}</p>
                            <p class="subtitle"><a href="#"> ${element.artist.name} </a></p>
                        </div>
                        <p class="d-inline subtitle ml-auto">1:13</p>
                        </a>
                        </li>`;
      trackList.appendChild(trackUl);
    });
  });
};
