const holesEl = document.getElementById('holes');
for(let i=0;i<6;i++){
  const h = document.createElement('div');
  h.className = 'hole';
  holesEl.appendChild(h);
}

const dustEl = document.getElementById('dust');
for(let i=0;i<26;i++){
  const s = document.createElement('div');
  s.className = 'speck';
  s.style.left = Math.random()*100+'%';
  s.style.top = (60+Math.random()*30)+'%';
  s.style.animationDuration = (6+Math.random()*8)+'s';
  s.style.animationDelay = (Math.random()*8)+'s';
  dustEl.appendChild(s);
}

const lines = [
  { text:"Should've kissed you",  time:1  },
  { text:"anyway",  time:2   },
  { text:"Ooh",  time:3  },
  { text:"and it was not",  time:4  },
  { text:"An invitation",  time:7  },
  { text:"Should've kissed you",  time:10  },
  { text:"anyway",  time:11  },
  { text:"Should've kissed you ",  time:13  },
  { text:"anyway",  time:14  },
  { text:"anyway", time:15  },
  { text:"And it was not", time:16  },
  { text:"My advice", time:18  },
  { text:"is always", time:19  },
  { text:"ruin the friendship", time:20  },
  { text:"Better that than", time:22  },
  { text:"regret it for all time", time:24  },
  { text:"Should've kissed you", time:27  },
  { text:"anyway", time:28  },
  { text:"And my advice is always", time:30  },
  { text:"answer the question", time:32  },
  { text:"Better that than to ask it", time:34 },
  { text:"all your life", time:37 },
  { text:"Should've kissed you", time:39 },
  { text:"anyway", time:40 },
];
const totalDuration = 122;

const captionZone = document.getElementById('captionZone');
const dotsEl = document.getElementById('dots');
lines.forEach((_,i)=>{
  const d = document.createElement('div');
  d.className = 'dot';
  d.id = 'dot'+i;
  dotsEl.appendChild(d);
});

let currentIndex=-1, startTime=null;

function showLine(index){
  const el = document.createElement('div');
  el.className = 'line';
  el.textContent = lines[index].text;
  captionZone.innerHTML = '';
  captionZone.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('active'));

  document.querySelectorAll('.dot').forEach(d=>d.classList.remove('active'));
  document.getElementById('dot'+index).classList.add('active');
  currentIndex = index;
}

function clearLine(){
  captionZone.innerHTML = '';
  document.querySelectorAll('.dot').forEach(d=>d.classList.remove('active'));
  currentIndex = -1;
}

function tick(ts){
  if(!startTime) startTime = ts;
  const elapsed = (ts-startTime)/1000;

  if(elapsed < lines[0].time){
    requestAnimationFrame(tick);
    return;
  }

  let activeIndex = 0;
  for(let i=0;i<lines.length;i++){ if(elapsed>=lines[i].time) activeIndex=i; }
  if(activeIndex !== currentIndex){ showLine(activeIndex); }

  if(elapsed < totalDuration){
    requestAnimationFrame(tick);
  } else {
    clearLine();
    startTime = null;
    setTimeout(()=>{ requestAnimationFrame(tick); }, 1200);
  }
}

requestAnimationFrame(tick);
