const VALID = 'ThgW8pDf6t1';
const START_KEY = 'sabbway_start_date';
const MS_DAY = 24*60*60*1000;
const flipEl = document.getElementById('flip');
const detailsEl = document.getElementById('details');
const detailsBtn = document.getElementById('detailsBtn');
const locationText = document.getElementById('locationText');

function onSubmitTrack(e){
  e.preventDefault();
  const code = document.getElementById('trackingInput').value.trim();
  if(code !== VALID){ alert('Invalid tracking number'); return false; }
  if(!localStorage.getItem(START_KEY)) localStorage.setItem(START_KEY,new Date().toISOString());
  flipEl.classList.add('is-flipped');
  setTimeout(() => {
    updateLocationText();
    detailsEl.style.display = 'none';
    detailsBtn.textContent = 'See Package Details';
  },900);
  return false;
}

function toggleDetails(){
  if(detailsEl.style.display==='flex'){
    detailsEl.style.display='none';
    detailsBtn.textContent='See Package Details';
  }else{
    detailsEl.style.display='flex';
    detailsBtn.textContent='Hide Package Details';
  }
}

function computeLocation(){
  const start = localStorage.getItem(START_KEY);
  let startDate = start ? new Date(start) : new Date();
  const days = Math.floor((new Date()-startDate)/MS_DAY);
  if(days<7) return 'Ghana';
  if(days<14) return 'Bamako, Mali 🇲🇱';
  return 'Mauritania 🇲🇷';
}

function updateLocationText(){ locationText.textContent = computeLocation(); }
setInterval(updateLocationText,60*60*1000);
window.addEventListener('focus',updateLocationText);