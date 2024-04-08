/**
 * 1. Render song
 * 2. Play / pause / seek
 * 3. Cd rotate
 * 4. Next / prev
 * 5. Random
 * 6. Next / Repeat when ended
 * 7. Active song
 * 8. Scrool into view
 * 9. Play song when click
 */
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const showlistMusic = $(".play-list-wrap")
const closelistMusic = $(".icon-close")
const listBtn = $('.icon-list')
const favourite = $(".control-favourite")
const playList = $('.play-list')
const nameSong = $(".name-song")
const nameSinger = $(".singer-song")
const audio = $("#audio")
const cdImg = $(".cd-img")
const togglePlay = $(".btn-toggle-play")
const progressBar = $(".progress-bar")
const progressArea = $(".progress-area")
const musicDuration = $('.duration-time');
const musicDurationList = $('.music-duration');
const musicCurrent = $('.current-time');
const nextBtn = $(".btn-next")
const prevBtn = $(".btn-prev")
const randomBtn = $(".btn-random")
const repeatBtn = $(".btn-repeat")
const liTagElements = $$(".play-list-wrap ul li")

let currentIndex = 0
const isPlaying = false

const songs = [
    {    id: 1,
         name: 'Faded',
         singer: 'Alan Walker',
         path: './assets/audio/faded.mp3',
         image: './assets/img/faded.jpg'
    },
    {    id: 2,
         name: 'Gone',
         singer: 'Rosé',
         path: './assets/audio/gone.mp3',
         image: './assets/img/gone.jpg'
     },
     {   id: 3,
         name: 'Havana',
         singer: 'Camila Cabello',
         path: './assets/audio/havana.mp3',
         image: './assets/img/havana.jpg'
    },
    {    id: 4,
         name: 'Lemon tree',
         singer: "Fool's Garden",
         path: './assets/audio/lemon-tree.mp3',
         image: './assets/img/lemon-tree.jpg'
     },
     {   id: 5,
         name: 'Mood',
         singer: "24kGoldn",
         path: './assets/audio/mood.mp3',
         image: './assets/img/mood.jpg'
     },
     {   id: 6,
         name: 'Pretty girl',
         singer: "Maggie Lindemann",
         path: './assets/audio/pretty-girl.mp3',
         image: './assets/img/pretty-girl.jpg'
     },
     {   id: 7,
         name: 'See you a again',
         singer: "Wiz Khalifa & Charlie Puth",
         path: './assets/audio/see-you-again.mp3',
         image: './assets/img/see-you-again.jpg'
     },
     {   id: 8,
         name: 'Shape of you',
         singer: "Ed Sheeran",
         path: './assets/audio/shape-of-you.mp3',
         image: './assets/img/shape-of-you.jpg'
     },
     {   id: 9,
         name: 'Something just like this',
         singer: "The Chainsmokers & Coldplay",
         path: './assets/audio/some-things-just-like-this.mp3',
         image: './assets/img/some-things-just-like-this.jpg'
     },
     {  
         id: 10,
         name: "We don't talk anymore",
         singer: "Charlie Puth",
         path: './assets/audio/we-dont-talk-anymore.mp3',
         image: './assets/img/we-dont-talk-anymore.jpg'
     },
 ]

//Xu ly CD quay va dung
const cdThumbAnimate =  cdImg.animate([
    { transform: 'rotate(360deg)'}
],{ duration: 10000,
    iterations: Infinity
})

function renderSong(){
    const htmls = songs.map((song, index) => {
        return `
            <li class="play-list-item ${ index === currentIndex  ? "active" : ""}" data-index ="${index}">
                <div class="song">
                    <span class="song-name">${song.name}</span>
                    <p class="song-singer">${song.singer}</p>
                </div>
                <audio id="${song.id}" src="${song.path}"></audio>
                <span id="${song.id}-time"  class="music-duration"></span>
            </li>
        `
    })
    playList.innerHTML = htmls.join("") 
    
    // Set time play list
    for( let i = 0 ; i< songs.length; i++){
        
        const audioTag = document.getElementById(`${songs[i].id}`)
        const audioDuration = document.getElementById(`${songs[i].id}-time`);
        const audioCurrent = document.getElementById(`${songs[currentIndex].id}-time`);
        audioTag.addEventListener('loadeddata',() => {
            const duration = audioTag.duration
            let totalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
            if (totalSec < 10) {
                totalSec = '0' + totalSec;
            }   
            audioDuration.innerText = `${totalMin}:${totalSec}`;
            if(currentIndex > 0){
                audioCurrent.innerText = "Playing";
            }
            else {
                audioDuration.innerText = `${totalMin}:${totalSec}`;
            }
            audioDuration.setAttribute("playing-duration", `${totalMin}:${totalSec}`)     
        })
    }
}

function loadCurrentSong(index){
    nameSong.textContent = `${songs[index].name}`
    nameSinger.textContent = `${songs[index].singer}`
    cdImg.style.backgroundImage = `url('${songs[index].image}')`
    audio.src = `${songs[index].path}`
    cdThumbAnimate.pause()
    if(!togglePlay.classList.contains('pause')){
            $(".equaliser-container").classList.add("block")
            $(".soundwave-img").classList.add("active")
    }   
    // Xu ly set thoi gian bai hat
     audio.addEventListener('loadeddata',() => {
        const duration = audio.duration
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) {
            totalSec = '0' + totalSec;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    })
}

function nextSong(){
    currentIndex++;
    currentIndex = currentIndex > songs.length - 1 ? 0 : currentIndex;
    loadCurrentSong(currentIndex)
}

function prevSong(){
    currentIndex--;
    currentIndex = currentIndex < 0 ? songs.length - 1 : currentIndex;
    loadCurrentSong(currentIndex)
}

function randomSong(){
    let newIndex
    do {
        newIndex = Math.floor(Math.random() * songs.length)
    } while(newIndex === currentIndex)
    currentIndex = newIndex
    loadCurrentSong(currentIndex)

}

function handlePlay(){
    audio.play()
    togglePlay.classList.remove("pause")
    togglePlay.innerHTML = `<i class="fa-solid fa-pause"></i>`
    cdThumbAnimate.play() 
}

function handlePause(){
    audio.pause()
    togglePlay.classList.add("pause")
    togglePlay.innerHTML = `<i class="fa-solid fa-play icon-play"></i>`
    cdThumbAnimate.pause()   
}

function scrollIntoView(){
    setTimeout(function(){
        $(".play-list-item.active").scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        })
    }, 300)
}

function handleEvents(){
     // handle event click show/ close play list
     listBtn.addEventListener("click",() => {
         showlistMusic.classList.toggle("show")  
         scrollIntoView()
     })
     closelistMusic.addEventListener("click",() => {
        showlistMusic.classList.toggle("show")           
     })
     // handle event click favourite
     favourite.addEventListener("click",() => {
         favourite.classList.toggle("like")
     })
     // handle click play / pause
     togglePlay.addEventListener("click", () => {
        $(".soundwave-img").classList.toggle("active")
        $(".equaliser-container").classList.toggle("block")
        const isPaused = togglePlay.classList.contains('pause');
        isPaused ? handlePlay() : handlePause();
        if (!isPaused){
            const currentSong = document.querySelector('li.active');
            const durationCurrent = currentSong.querySelector('.music-duration');      
            durationCurrent.innerHTML = durationCurrent.getAttribute('playing-duration');
        }
        else {
            const currentSong = $$('li');
            for(let i = 0 ; i< currentSong.length; i++){
                if(currentSong[i].classList.contains("active")) {
                    const durationCurrent = currentSong[i].querySelector('.music-duration');
                    durationCurrent.innerText = "Playing"
                }
            }
        }
     })
     
     
     // handle khi tien do bai hat thay doi
     audio.ontimeupdate = function(e){
        if(audio.duration){
            const currentTime = e.target.currentTime;
            const duration = e.target.duration;
            var progressPercent = Math.floor(currentTime / duration * 100)
            progressBar.style.width = progressPercent + "%"      
            let currentMin = Math.floor(currentTime / 60);
            let currentSec = Math.floor(currentTime % 60);
            if (currentSec < 10) {
                currentSec = '0' + currentSec;
            }
            musicCurrent.innerText = `${currentMin}:${currentSec}`;
        }
     }
    
     // handle khi tua video
     progressArea.onclick = function(e) {
        const progressAreaWidth =  progressArea.clientWidth
        const valueOffSetX = e.offsetX
        const seekTime = valueOffSetX / progressAreaWidth * audio.duration
        audio.currentTime = seekTime
     }

     //handle next song
     nextBtn.addEventListener("click",() => {
        if(randomBtn.classList.contains("active")){
            randomSong()
        }
        else{
            nextSong()
        }
        handlePlay()
        renderSong()
     })

     //handle prev song
     prevBtn.addEventListener("click",() => {
        if(randomBtn.classList.contains("active")){
            randomSong()
            
        }
        else{
            prevSong()
        }
        handlePlay()
        renderSong()
        
  
     })

     //handle random song
     randomBtn.addEventListener("click",() => {
        randomBtn.classList.toggle("active")
    
     })

     //handle repeat song
     repeatBtn.addEventListener("click",() => {
        repeatBtn.classList.toggle("active")
     })

     // xy ly next song khi audio ended
     audio.onended = function(){
        if(repeatBtn.classList.contains("active")){
            audio.play()
            
        } else{
            nextBtn.click()  
        }
     
    }

    //handel when click play list
    playList.addEventListener("click",(e) => {
        const songNode = e.target.closest(".play-list-item:not(.active)")
        if(songNode) {
            currentIndex = Number(songNode.getAttribute("data-index"))
            loadCurrentSong(currentIndex)
            renderSong()
            handlePlay()
            
        }
            
    })
 }

function start(){
    handleEvents()
    renderSong()
    loadCurrentSong(currentIndex)
}
start() 
