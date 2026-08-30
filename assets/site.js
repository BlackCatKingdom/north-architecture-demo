(()=>{
  const io='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target)}}),{threshold:.01}):null;
  document.querySelectorAll('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));
  setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in')),1600);

  const menu=document.querySelector('.mobile');
  const openBtn=document.querySelector('.menu');
  const closeBtn=menu?.querySelector('button');
  if(menu) menu.inert=true;
  const setMenu=open=>{
    if(!menu)return;
    const wasOpen=menu.classList.contains('open');
    menu.classList.toggle('open',open);
    menu.setAttribute('aria-hidden',String(!open));
    menu.inert=!open;
    openBtn?.setAttribute('aria-expanded',String(open));
    document.body.style.overflow=open?'hidden':'';
    if(open) setTimeout(()=>closeBtn?.focus({preventScroll:true}),50);
    else if(wasOpen) openBtn?.focus({preventScroll:true});
  };
  const trapFocus=e=>{
    if(e.key!=='Tab'||!menu?.classList.contains('open'))return;
    const focusable=[...menu.querySelectorAll('a[href],button:not([disabled]),[tabindex]')].filter(el=>el.tabIndex>=0&&!el.hidden);
    if(!focusable.length)return;
    const first=focusable[0],last=focusable[focusable.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  };
  openBtn?.addEventListener('click',()=>setMenu(true));
  closeBtn?.addEventListener('click',()=>setMenu(false));
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.classList.contains('open'))setMenu(false);else trapFocus(e)});
  window.addEventListener('resize',()=>{if(window.innerWidth>900&&menu?.classList.contains('open'))setMenu(false)});
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();