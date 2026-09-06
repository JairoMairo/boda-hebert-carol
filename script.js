document.querySelectorAll('.reveal').forEach(el=>{
    new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');}});},{threshold:0.15}).observe(el);
  });

  const envelope=document.getElementById('envelope'),gate=document.getElementById('gate');
  const musicToggle=document.getElementById('musicToggle'), bgMusic=document.getElementById('bgMusic');
  let opened=false, musicStarted=false;

  function openEnvelope(){
    if(opened)return;opened=true;
    envelope.classList.add('is-open');
    setTimeout(()=>gate.classList.add('gate-fade-out'),900);
    setTimeout(()=>{gate.classList.add('gate-hidden');document.body.classList.remove('gate-active');},2300);
  }
  envelope.addEventListener('click',()=>{
    openEnvelope();
    if(!musicStarted){
      musicStarted=true;
      bgMusic.volume=0.5;
      bgMusic.play().catch(()=>{});
      musicToggle.classList.add('is-visible');
    }
  });
  envelope.tabIndex=0;
  envelope.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openEnvelope();}});

  musicToggle.addEventListener('click',()=>{
    if(bgMusic.paused){ bgMusic.play(); musicToggle.classList.remove('is-paused'); }
    else{ bgMusic.pause(); musicToggle.classList.add('is-paused'); }
  });

  // Cuenta regresiva — 18 de septiembre de 2026, 12:00 h
  const WEDDING_DATE=new Date(2026,8,18,12,0,0);
  function tick(){
    let diff=WEDDING_DATE-new Date(); if(diff<0)diff=0;
    document.getElementById('cd-days').textContent=String(Math.floor(diff/86400000)).padStart(2,'0');
    document.getElementById('cd-hours').textContent=String(Math.floor(diff/3600000)%24).padStart(2,'0');
    document.getElementById('cd-mins').textContent=String(Math.floor(diff/60000)%60).padStart(2,'0');
    document.getElementById('cd-secs').textContent=String(Math.floor(diff/1000)%60).padStart(2,'0');
  }
  tick();setInterval(tick,1000);

  // Cómo llegar — Google Maps con la dirección real
  const VENUE_QUERY = encodeURIComponent('Las Vegas de Pilcomayo, Pje. Angel Mercedes, Pilcomayo, Junín, Perú');
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${VENUE_QUERY}`;
  document.getElementById('mapLink1').href = mapsUrl;
  document.getElementById('mapLink2').href = mapsUrl;

  // Agregar al calendario (Google Calendar)
  function fmtGCal(date){ return date.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z'; }
  const eventStart = WEDDING_DATE;
  const eventEnd = new Date(WEDDING_DATE.getTime() + 5*60*60*1000);
  const calTitle = encodeURIComponent('Boda de Hebert & Carol');
  const calLocation = encodeURIComponent('Las Vegas de Pilcomayo, Pje. Angel Mercedes, Pilcomayo, Junín');
  const calDetails = encodeURIComponent('¡Nos casamos! Los esperamos para celebrar juntos.');
  document.getElementById('calendarLink').href = `https://www.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${fmtGCal(eventStart)}/${fmtGCal(eventEnd)}&details=${calDetails}&location=${calLocation}`;