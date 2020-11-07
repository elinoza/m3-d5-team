let track=[]
const parsedUrl = new URL(window.location.href);
let endp = "album/" + parsedUrl.searchParams.get("id");
const albumTitle = document.querySelector("#album-title");
const albumArtist = document.querySelector("#album-artist");
const albumCover = document.querySelector("#album-img");
const trackList = document.querySelector("#trackl-col");

  fetch("https://deezerdevs-deezer.p.rapidapi.com/" + endp, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "49f4e1e876msh90846b28b1ca30fp193c58jsn17d62173eae9",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (response.ok) {
      
        return response.json();
      }
    })
    .then((body) => {
      
   
      albumTitle.innerText = `${body.title}`;
      albumArtist.innerText = body.artist.name;
      let albumCover=document.createElement('div')
      albumCover.innerHTML = `<img src="${body.cover_medium}" id=album-img class="card-img-top shadow" alt="queen img"
      style="max-width: 70%" />`;
      let ParentCover=document.querySelector('#card')      
      ParentCover.appendChild(albumCover)      
      body.tracks.data.forEach((element) => {
        console.log(element)
        
        track.push(element.preview)
        let trackUl = document.createElement("ul");
        trackUl.className = "tracklist pr-3 p-1";
        trackUl.innerHTML += ` <li class="d-flex">
                          <a href="#">
                          <i class="align-self-start fas fa-music mr-2"></i>
  
                          <div class="d-inline align-self-start">
                              <p>${element.title}</p>
                              <p class="subtitle"><a href="#"> ${element.artist.name} </a></p>
                          </div>
                          <p class="d-inline subtitle ml-auto">1:13</p>
                          </a>
                          </li>`;
        let trackList= document.querySelector('#trackList')
        trackList.appendChild(trackUl);
      })
      
      
    })

    .catch((err) => {
      alert("AN ERROR HAS OCCURRED  " + err);
      console.error(err);
    })

    /**********FOOOTER PLAY MUSIC************/


    const playTrack = () => {
     track.forEach((element) => {
       console.log(element)
       let trackPlay = document.querySelector("#trackPlay") 
       trackPlay.src=element
       trackPlay.controls="none";     
       trackPLay.preload="auto"; 
       trackPlay.play(); 
    })

    };
    
    const playSong=()=>{

    }
    