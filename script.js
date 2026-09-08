const screens = [...document.querySelectorAll(".screen")];

function goTo(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo(0,0);
}
window.goTo = goTo;

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>goTo(btn.dataset.next));
});

document.querySelectorAll(".wrong").forEach(btn=>{
  btn.addEventListener("click",()=>{
    btn.classList.remove("shake");
    void btn.offsetWidth;
    btn.classList.add("shake");
    const old = btn.textContent;
    btn.textContent = "Thử lại nhé ♡";
    setTimeout(()=>btn.textContent=old,900);
  });
});

document.querySelectorAll(".correct").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const next = btn.dataset.success;
    btn.textContent = "✓ Chính xác!";
    setTimeout(()=>goTo(next),450);
  });
});

const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", async ()=>{
  if(audio.paused){
    try{
      await audio.play();
      playBtn.textContent="❚❚";
    }catch(e){
      alert("Em hãy đặt file music.mp3 cạnh index.html trước nhé!");
    }
  }else{
    audio.pause();
    playBtn.textContent="▶";
  }
});

audio.addEventListener("play",()=>playBtn.textContent="❚❚");
audio.addEventListener("pause",()=>playBtn.textContent="▶");

document.querySelectorAll(".screen").forEach(screen=>{
  screen.addEventListener("animationend",()=>{
    screen.querySelectorAll(".choice").forEach(b=>b.blur());
  });
});
