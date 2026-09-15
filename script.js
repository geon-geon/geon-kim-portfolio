// Progressive enhancement: anchors, figures and all content also work without JavaScript.
const links = [...document.querySelectorAll('nav a')];
const sections = [document.querySelector('#top'), ...links.map(link => document.querySelector(link.hash))];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const active = entries.find(entry => entry.isIntersecting);
    if (!active) return;
    links.forEach(link => {
      if (link.hash === `#${active.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  sections.forEach(section => section && observer.observe(section));
}
// Same-origin demo height follows its content, including narrow mobile layouts.
const demoFrame=document.querySelector('.demo-frame iframe');
window.addEventListener('message',event=>{
 if(event.origin!==location.origin||event.source!==demoFrame?.contentWindow)return;
 if(event.data?.type==='compass-height'&&Number.isFinite(event.data.height))demoFrame.style.height=Math.min(1500,Math.max(300,event.data.height))+'px';
});
const researchMenu=document.querySelector('.research-menu');
researchMenu?.addEventListener('click',event=>{if(event.target.closest('a'))researchMenu.open=false;});
document.addEventListener('click',event=>{if(researchMenu&&!researchMenu.contains(event.target))researchMenu.open=false;});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&researchMenu?.open){researchMenu.open=false;researchMenu.querySelector('summary').focus();}});
