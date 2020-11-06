window.onload = () => {
  loadAlbums();
  getMusic();
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
const loadAlbums = () => {
  let endpoint = [
    ["jazz", "classical", "R&B"],
    ["techno", "indie", "pop"],
    ["rap", "classical", "R&B"],
    ["jazz", "classical", "R&B"],
    ["jazz", "classical", "R&B"],
  ];

  const pages = ["#trending", "#contents", "#mooDandGenres", "#newReleases", "#discover"];
  pages.forEach((page, index) => {
    endpoint[index].forEach((el) => {
      const endp = "search?q=" + el;
      fetchAlbums(endp, (body) => {
        //console.log(body.data);
        let cards = document.createElement("div");
        cards.classList.add("row");
        const destination = document.querySelector(page);
        const header = document.createElement("h3");
        header.innerText = el.toUpperCase();
        body.data.forEach((element, index) => {
          index < 10
            ? (cards.innerHTML += `<div class="col-12 col-md-4  col-lg-2 px-2">
        <div class="card bg-transparent border-0 text-center">
        <a href='/Album Page.html?id=${element.album.id}'>
          <img
            src="${element.album.cover}"
            class="card-img-top"
            alt="..."
          />
          </a>
          <div class="card-body">
            <button class="card-text  btn text-truncate text-white" onclick="playmusic(${element.album.id})" style="max-width: 150px;">${element.album.title}</button>
            <a class="card-text text-truncate text-muted"  href='/artist.html?id=${element.artist.id}'  style="max-width: 150px;">${element.artist.name}</a>
          </div>
        </div>
      </div>`)
            : "";
        });
        destination.appendChild(header);
        destination.appendChild(cards);
      });
    });
  });
};

/**********FOOOTER PLAY MUSIC************/
const x = document.getElementById("myAudio");
function playAudio() {
  x.play();
}

function changevolume(amount) {
  const audioobject = document.getElementsByTagName("audio")[0];
  audioobject.volume = amount;
}
const playmusic = (id) => {
  id = "/album/" + id;
  fetchAlbums(id, (body) => {
    track = body.tracks.data[0];
    console.log(track);
  });
};
