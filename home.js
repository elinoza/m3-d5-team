window.onload = () => {
  window.location.href.includes("index") ? loadAlbums(1) : "";
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
      console.log(body);
      data(body);
    })

    .catch((err) => {
      //alert("AN ERROR HAS OCCURRED  " + err);
      console.error(err);
    });
};
const loadAlbums = (option) => {
  let endpoint = [],
    pages = [];
  if (option === 1) {
    endpoint = [
      ["jazz", "classical", "R&B"],
      ["techno", "indie", "pop"],
      ["rap", "classical", "R&B"],
      ["jazz", "classical", "R&B"],
      ["jazz", "classical", "R&B"],
    ];

    pages = ["#trending", "#contents", "#mooDandGenres", "#newReleases", "#discover"];
  } else {
    endpoint = [[option]];
    pages = ["#Results"];
  }

  let endp;
  pages.forEach((page, index) => {
    endpoint[index].forEach((el) => {
      endp = "search?q=" + el;
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
        <a href='./Album Page.html?id=${element.album.id}'>
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

/*******************FOR THE SEARCH PAGE************************ */
const searchAlbums = () => {
  const search = document.querySelector("#search").value;
  const cards = document.querySelectorAll(".card");
  const h3s = document.querySelectorAll("h3");
  cards.forEach((card) => card.remove());
  h3s.forEach((h3) => h3.remove());
  loadAlbums(search);
};
const filterAlbums = (event) => {
  const search = event.target.value;
  search.length > 2 ? searchAlbums() : "";
};

/**********FOOOTER PLAY MUSIC************/


function changevolume(amount) {
  const audioobject = document.getElementsByTagName("audio")[0];
  audioobject.volume = amount;
}
const playmusic = (id) => {
  id = "/album/" + id;
  let albumCover = document.querySelector(".song-info-cover")
  let songName = document.querySelector("#songName")
  let artistName = document.querySelector("#artistName")
  let trackPlay = document.querySelector("source")
  fetchAlbums(id, (body) => {
    track = body.tracks.data[0];
    console.log(track)
    albumCover.src=track.artist.md5_image
    artistName.innerHTML=track.artist.name
    songName.innerHTML=track.title
    trackPlay.src=track.preview
    x.play()
  });
};
const x = document.getElementById("myAudio");
function playAudio() {
  x.play();
}
