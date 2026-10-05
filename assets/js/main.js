(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('mnav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Skin tabs
  var tabs=document.querySelectorAll('[role="tab"]');
  function sel(t){tabs.forEach(function(x){x.setAttribute('aria-selected','false');x.tabIndex=-1;document.getElementById(x.getAttribute('aria-controls')).hidden=true;});t.setAttribute('aria-selected','true');t.tabIndex=0;document.getElementById(t.getAttribute('aria-controls')).hidden=false;}
  tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t);});t.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;var nx=tabs[(i+d+tabs.length)%tabs.length];sel(nx);nx.focus();});});
  // Bag finder
  var S={top:['The structured top-handle','Carried in the hand or the crook of the arm, it frames an outfit and keeps its shape on a table.',['Rigid base and protective feet','A detachable strap for hands-free days','Medium size: room for phone, wallet and keys']],
    clutch:['The evening clutch','A slim, sculptural piece that turns a simple outfit into an occasion.',['A secure clasp or magnetic closure','A slim chain you can tuck inside','Glazed finishes catch candlelight beautifully']],
    shoulder:['The polished shoulder bag','Sits neatly under the arm and moves easily from office to dinner.',['Adjustable strap length','An internal zip pocket for small valuables','Matte finishes for everyday sophistication']],
    tote:['The refined tote','Spacious and practical, with enough structure to look sharp on a busy day.',['Reinforced handles and base','A zip or snap closure for security','Croc-embossed leather resists everyday scuffs']],
    cross:['The compact crossbody','Hands-free elegance for travel, markets and city walking.',['A wide, comfortable strap','Front-facing closure you can keep an eye on','Small but well-organised interior']]};
  var ff=document.getElementById('finder');
  function find(){if(!ff)return;var o=ff.querySelector('[name=occ]:checked').value,c=ff.querySelector('[name=carry]:checked').value,sz=ff.querySelector('[name=size]:checked').value,k;
    if(o==='evening')k=sz==='small'?'clutch':'shoulder';else if(c==='hands')k=sz==='large'?'tote':'cross';else if(o==='work')k=sz==='large'?'tote':(c==='hand'?'top':'shoulder');else if(o==='travel')k=sz==='large'?'tote':'cross';else k=c==='hand'?'top':'shoulder';
    var s=S[k];document.getElementById('r-name').textContent=s[0];document.getElementById('r-desc').textContent=s[1];document.getElementById('r-list').innerHTML=s[2].map(function(x){return '<li>'+x+'</li>';}).join('');
    document.querySelectorAll('[data-bag]').forEach(function(i){i.hidden=i.dataset.bag!==k;});}
  if(ff){ff.addEventListener('change',find);find();}
  // Responsible-buying checklist
  var cl=document.querySelectorAll('.clist input');
  function meter(){var c=0;cl.forEach(function(x){if(x.checked)c++;});var p=Math.round(c/cl.length*100);
    document.getElementById('cm-bar').style.width=p+'%';document.getElementById('cm-n').textContent=c+' of '+cl.length;
    document.getElementById('cm-t').textContent=c===cl.length?'Every box ticked. You have done your homework thoroughly.':c>=4?'Good progress. Check the remaining points before you commit.':'Work through each point before buying any exotic leather piece.';}
  cl.forEach(function(x){x.addEventListener('change',meter);});if(cl.length)meter();
  // Seasonal care tip
  var T={spring:['Spring','Air your bags after winter storage, wipe them with a soft dry cloth and check handles and corners for wear before the busy season.'],
    summer:['Summer','Keep exotic leather out of direct sun and hot cars. Heat and UV can dry the scales and fade glazed finishes.'],
    autumn:['Autumn','Rain arrives: carry a protective cover, blot any drops immediately and let bags dry naturally, away from radiators.'],
    winter:['Winter','Central heating dries the air. Store bags stuffed and covered, away from heaters, and ask a specialist about conditioning.']};
  var m=new Date().getMonth()+1,k=m>=3&&m<=5?'spring':m>=6&&m<=8?'summer':m>=9&&m<=11?'autumn':'winter',st=document.getElementById('stip');
  if(st){st.querySelector('.s').firstChild.textContent=T[k][0];st.querySelector('p').textContent=T[k][1];}
  // Contact form -> email app
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  // Cookie
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('al_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('al_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
