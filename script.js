const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const introScreen = $('#introScreen');
const choiceScreen = $('#choiceScreen');
const loveScreen = $('#loveScreen');
const loadingScene = $('#loadingScene');
const journeyScene = $('#journeyScene');
const letterScene = $('#letterScene');
const loveAnswer = $('#loveAnswer');
const loadingFill = $('#loadingFill');
const loadingPercent = $('#loadingPercent');
const loadingHearts = $('#loadingHearts');
const personName = $('#personName');
const nameError = $('#nameError');
const fallingEnvelopes = $('#fallingEnvelopes');
const letterModal = $('#letterModal');
const typedText = $('#typedText');
const letterTitle = $('#letterTitle');
const letterDate = $('#letterDate');
const letterCounter = $('#letterCounter');
const completionScreen = $('#completionScreen');

let chosen = new Set();
let consumedLetters = new Set();
let activeLetter = null;
let typingTimer = null;

const letters = [
  {title:'Đố anh', date:'không biết thì hỏi chính chủ', text:'Trâm sợ gì nhất'},
  {title:'Đố anh', date:'lý do này tui biết, còn anh không nên biết, mà tui vẫn thích hỏi', text:'Lý do nhỏ Trâm đọc truyện gay từ nhỏ là gì? pov: lớp 5 là nó đã đọc truyện gay rồi đó anh'},
  {title:'Đố anh', date:'Chọn 1 thôi nghen', text:'giữa biển và núi Trâm sẽ chọn gì? Giữa Bình minh và Hoàng hôn, Trâm sẽ chọn gì?'},
  {title:'Đố anh', date:'câu này dễ nè anh oi', text:'Dứa thích ở nhà hay đi chơi'},
  {title:'Đố anh', date:'trả lời cho khéo không là nó giận á nha', text:'Nếu anh đang ở sa mạc và sắp chết khát\nMà trước mặt anh có 2 ly nước, 1 ly nước tiểu, 1 ly thuốc độc thì anh sẽ chọn uống cái nào?'},
  {title:'Đố anh', date:'hm....', text:'Vì sao Dứa thích tất cả các con vật nhưng nó không thích nuôi con nào?'},
  {title:'Cho hỏi', date:'câu này em hỏi dùm Trâm luônn nha', text:'Các mối quan hệ hiện tại của anh là quen qua gì ?'},
  {title:'Cho hỏi', date:'em biết anh với Trâm quen qua app dating', text:'anh đã xóa app dating chưa?'},
  {title:'Cho hỏi', date:'mong 2 người lâu dài', text:'anh thích Dứa ở điểm nào, sao lại muốn tìm hiểu'},
  {title:'đố anh', date:'con gà có trước hay quả trứng có trước'},
  {title:'đố ông', date:'Trâm nó em tui nha', text:'nếu Trâm biến thành con gián thì ông có yêu nó không :))'},
  {title:'tui hỏi ông cái này', date:'....', text:'nếu cứu người là vi phạm pháp luật thì ông có cứu người không? nếu không hiểu câu hỏi thì hỏi nó nha, ví dụ là tàu xe lửa'},
  {title:'tui hỏi nhen', date:'trả lời cho trâm nghe', text:'ông nghĩ sao khi tìm hiểu nhiều người cùng một lúc? ví dụ có một người tìm hiểu nhiều người cùng một lúc và người đó hầu như cân được thời gian, rồi sau đó người này thấy 1 trong số đó hợp với mình và làm bạn trai họ, và từ chối những người còn lại, thì ông thấy sao'},
  {title:'đố anh', date:'1+1=2', text:'Làm sao để nhét con voi vào tủ lạnh'},
  {title:'điều cần biết nè anh', date:'thứ Trâm ghét', text:'Những nơi có thuốc lá, đi chơi thì đi đâu trong lành á nghen'},
  {title:'Nếu', date:'...', text:'Nếu trong quá trình tìm hiểu yêu đương, Trâm nó giận ông cái gì đó, mà ông không biết lý do, thì ông sẽ làm gì? tại sao?'},
  {title:'Đố anh', date:'hello anh, em là đứa cùng lớp đại học với Dứa nè', text:'Có 3 công tắc ở ngoài 1 căn phòng kín. Trong phòng có 3 bóng đèn. Mỗi công tắc điều khiển đúng 1 bóng. Anh chỉ được vào phòng 1 lần làm sao xác định công tắc nào của bóng đèn nào ?”'},
  {title:'chia sẻ ', date:'....', text:'Trâm toxic lắm nên suy nghĩ kĩ trước khi quen, đừng quen vài ba bữa rồi bỏ nó nha'},
  {title:'  ', date:'', text:'tháng nào có ngày 28'},
  {title:'hà lố', date:'trâm bị điên', text:'Trâm nó không chịu nổi cô đơn đâu nên đi chơi với nó nhiều tí, và chia sẻ chuyện hàng ngày nhiều tí, là nó đổ đứ đừ luôn'},
  {title:'hmmmm', date:'chuyện riêng tư', text:'sinh nhật của Trâm ngày mấy :)), cá là không biết'},
  {title:'ầu', date:'dứa so cute', text:'nếu anh được lên list đi chơi cả ngày với người anh thích (là Trâm) anh sẽ lên list thế nào'},
  {title:'', date:'', text:''},
  {title:'', date:'', text:''},
  {title:'', date:'', text:''},
  {title:'', date:'', text:''},
  {title:'', date:'', text:''},
  {title:'', date:'', text:''},
  {title:'', date:'', text:''},
  {title:'', date:'', text:''}
];

function show(el){el.classList.remove('hidden')}
function hide(el){el.classList.add('hidden')}

function makeLoadingHearts(){
  for(let i=0;i<72;i++){
    const s=document.createElement('span'); s.textContent=i%2?'♥':'♡';
    s.style.left=Math.random()*100+'%'; s.style.animationDelay=(-Math.random()*4)+'s'; s.style.animationDuration=(4.5+Math.random()*3.5)+'s';
    loadingHearts.appendChild(s);
  }
}
makeLoadingHearts();

// Hoa + tim nhỏ luôn chuyển động nhẹ ở trang mở đầu.
const introParticleField=$('.petal-field');
if(introParticleField){
  const symbols=['♡','♥','✿','❀','❁','✦'];
  for(let i=0;i<70;i++){
    const s=document.createElement('span');
    s.textContent=symbols[i%symbols.length];
    s.className='intro-particle';
    s.style.left=(Math.random()*100)+'%';
    s.style.bottom=(-10-Math.random()*30)+'px';
    s.style.setProperty('--dx',`${-45+Math.random()*90}px`);
    s.style.animationDelay=(-Math.random()*10)+'s';
    s.style.animationDuration=(9+Math.random()*8)+'s';
    introParticleField.appendChild(s);
  }
}

$('#nextBtn').addEventListener('click',()=>{
  hide(introScreen); show(choiceScreen);
});

// Không tự chuyển: phải bấm vào màn hình “Là anh đó” mới sang loading.
loveAnswer.addEventListener('click',startLoading);

$$('.character-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const who=card.dataset.character;
    if(chosen.has(who)) return;
    chosen.add(who);
    card.classList.add('picked');
    moveCharacter(card,who);
    startEscapeMotion(card,who);

    // Chỉ khi ảnh còn lại được bấm thì “Là anh đó” mới xuất hiện.
    if(chosen.size===2){
      show(loveAnswer);
    }
  });
});

function moveCharacter(card,who){
  // Đẩy ảnh vào một vùng an toàn khác nhau, tránh tâm màn hình quá nhiều.
  const x=who==='dazai' ? (7+Math.random()*34) : (57+Math.random()*34);
  const y=8+Math.random()*57;
  card.style.left=x+'%';
  card.style.right='auto';
  card.style.top=y+'%';
  card.style.bottom='auto';
  card.style.transform=`scale(.88) rotate(${who==='dazai' ? -3 : 3}deg)`;
}

function startEscapeMotion(card,who){
  if(card.dataset.escaping==='1') return;
  card.dataset.escaping='1';
  const escapeTimer=setInterval(()=>{
    if(!document.body.contains(card) || !chosen.has(who) || chosen.size===2){
      clearInterval(escapeTimer);
      card.dataset.escaping='0';
      return;
    }
    moveCharacter(card,who);
  },720);
  card.addEventListener('pointerenter',()=>{
    if(chosen.size<2 && chosen.has(who)) moveCharacter(card,who);
  });
}

function startLoading(){
  hide(choiceScreen); hide(loveAnswer); show(loveScreen); show(loadingScene);
  let p=0;
  const timer=setInterval(()=>{
    p=Math.min(100,p+1.4);
    loadingFill.style.width=p+'%'; loadingPercent.textContent=Math.floor(p)+'%';
    if(p>=100){clearInterval(timer); setTimeout(()=>{hide(loadingScene);show(journeyScene);startJourneyParticles()},500)}
  },45);
}

function startJourneyParticles(){
  const holder=$('#heartParticles');
  for(let i=0;i<86;i++){
    const s=document.createElement('span'); s.textContent=i%3===0?'✿':'♡'; s.style.left=Math.random()*100+'%'; s.style.animationDelay=(-Math.random()*5)+'s'; s.style.animationDuration=(6+Math.random()*5)+'s'; holder.appendChild(s);
  }
}

$('#openLetterBtn').addEventListener('click',()=>{
  const name=personName.value.trim();
  if(!name){nameError.textContent='Anh nhập tên trước rồi mình mở thư nhé ♡'; personName.focus(); return}
  nameError.textContent='';
  hide(journeyScene);
  show(letterScene);
  makeLetterParticles();
  renderEnvelopes(true);
});
personName.addEventListener('keydown',e=>{if(e.key==='Enter')$('#openLetterBtn').click()});

function renderEnvelopes(resetFall=false){
  fallingEnvelopes.innerHTML='';
  const remaining=letters.map((_,i)=>i).filter(i=>!consumedLetters.has(i));
  letterCounter.textContent=`Còn ${remaining.length} câu`;
  if(!remaining.length){show(completionScreen);return}
  hide(completionScreen);

  remaining.forEach((index,slot)=>{
    const b=document.createElement('button');
    b.type='button';
    b.className=`envelope style-${(index%4)+1}`;
    b.dataset.index=index;
    const left=(2+((index*17.7)%94));
    b.style.left=left+'%';
    b.style.setProperty('--drift',`${-80+((index*43)%160)}px`);
    b.style.setProperty('--rot',`${-18+((index*29)%36)}deg`);
    b.style.animationDuration=(8+(index%7)*1.15)+'s';
    // Khi một lá được chọn, toàn bộ các lá còn lại được reset về điểm xuất phát trên cao.
    b.style.animationDelay=resetFall ? `${(slot%10)*0.16}s` : `${-((slot%9)*.75)}s`;
    b.innerHTML=`<span class="stamp"></span><span class="mark">♡</span>`;
    b.addEventListener('click',()=>openLetter(index));
    fallingEnvelopes.appendChild(b);
  });
}

function openLetter(index){
  if(consumedLetters.has(index)) return;

  // Đánh dấu ngay khi mở để lá này không thể xuất hiện lại trong phiên hiện tại.
  consumedLetters.add(index);
  activeLetter=index;
  const data=letters[index];

  // Reset toàn bộ các lá còn lại từ trên cao xuống mỗi lần chọn một lá.
  renderEnvelopes(true);

  letterTitle.textContent=data.title;
  letterDate.textContent=data.date;
  typedText.textContent='';
  $('#letterSignature').textContent=`♡ Từ bạn của Dứa${personName.value.trim()?` gửi ${personName.value.trim()}`:''} ♡`;
  show(letterModal);
  typeText(data.text);
  updateCounter();
}

function updateCounter(){
  letterCounter.textContent=`Còn ${letters.length-consumedLetters.size} câu`;
}

function typeText(text){
  clearInterval(typingTimer);
  let i=0;
  const chars=[...text];
  typingTimer=setInterval(()=>{
    typedText.textContent+=chars[i++]||'';
    if(i>=chars.length){clearInterval(typingTimer);typingTimer=null}
  },22);
}

$('#closeLetter').addEventListener('click',()=>{
  clearInterval(typingTimer); typingTimer=null;
  hide(letterModal);
  activeLetter=null;
  updateCounter();
  if(consumedLetters.size===letters.length){
    setTimeout(()=>show(completionScreen),350);
  }
});
$('#closeEnvelopeLayer').addEventListener('click',()=>{
  if(!letterModal.classList.contains('hidden')) return;
  hide(letterScene);
  show(journeyScene);
});

function makeLetterParticles(){
  const holder=$('#letterParticles');
  if(holder.dataset.ready==='1') return;
  holder.dataset.ready='1';
  const symbols=['♡','♥','✿','❀','✦','❁'];
  for(let i=0;i<150;i++){
    const s=document.createElement('span');
    const symbol=symbols[i%symbols.length];
    s.textContent=symbol;
    s.className=(symbol==='♡'||symbol==='♥')?'heart '+(i%3===0?'pink':''):(i%3===0?'blue':i%3===1?'green':'flower');
    s.style.left=(Math.random()*100)+'%';
    s.style.setProperty('--dx',`${-70+Math.random()*140}px`);
    s.style.animationDelay=(-Math.random()*8)+'s';
    s.style.animationDuration=(9+Math.random()*8)+'s';
    holder.appendChild(s);
  }
}

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!letterModal.classList.contains('hidden')) $('#closeLetter').click();
});

// Tim rê chuột kiểu V3: rê tới đâu, nhiều tim nhỏ bung ra tới đó.
let lastPointerBurst = 0;
document.addEventListener('pointermove',e=>{
  const now=performance.now();
  if(now-lastPointerBurst<30) return;
  lastPointerBurst=now;

  // Mỗi lần rê tạo 2–4 tim, thay vì chỉ 1 tim thưa thớt.
  const amount=2+Math.floor(Math.random()*3);
  for(let i=0;i<amount;i++){
    const h=document.createElement('span');
    h.className='cursor-heart';
    h.textContent=Math.random()>.28?'♡':'♥';
    h.style.left=(e.clientX + (Math.random()*22-11))+'px';
    h.style.top=(e.clientY + (Math.random()*22-11))+'px';
    h.style.setProperty('--cx',`${(Math.random()*54-27).toFixed(1)}px`);
    h.style.setProperty('--cy',`${(-18-Math.random()*35).toFixed(1)}px`);
    h.style.setProperty('--spin',`${-35+Math.random()*70}deg`);
    h.style.fontSize=(11+Math.random()*13)+'px';
    h.style.animationDelay=(Math.random()*70)+'ms';
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1050);
  }
});
