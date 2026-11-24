(() => {
  'use strict';
  const data = window.WITS_DATA;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const icons = {
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    bookmark:'<path d="M6 4h12v17l-6-4-6 4z"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 11h18M7 15h2M13 15h2"/>',
    pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',
    chevron:'<path d="m6 9 6 6 6-6"/>',
    award:'<circle cx="12" cy="8" r="5"/><path d="m8 12-2 9 6-3 6 3-2-9"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    sliders:'<path d="M4 7h9m4 0h3M4 17h3m4 0h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    expand:'<path d="m8 5 4-3 4 3M4 9h16M4 15h16m-12 4 4 3 4-3"/>',
    cup:'<path d="M4 8h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm12 1h2a3 3 0 0 1 0 6h-2M7 3v2M12 3v2"/>',
    bus:'<rect x="5" y="3" width="14" height="17" rx="3"/><path d="M5 11h14M8 20v2m8-2v2M8 15h1m6 0h1M9 6h6"/>',
    mic:'<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',
    people:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4M17 4a3 3 0 0 1 0 6m2 11v-4a5 5 0 0 0-2-4"/>',
    paper:'<path d="M5 3h10l4 4v14H5zM14 3v5h5M8 12h8m-8 4h6"/>',
    link:'<path d="m10 13 4-4m-7 1-2 2a4 4 0 0 0 6 6l2-2m-2-9 2-2a4 4 0 0 1 6 6l-2 2"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.calendar}</svg>`;
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dict = {
    en: {
      skip:'Skip to program',program:'Program',mySchedule:'My schedule',presenterGuide:'Presenter guide',conferenceProgram:'Conference program<span class="title-dot">.</span>',conferenceDates:'16–18 December 2026',refine:'Refine your program',reset:'Reset',track:'Track',sessionType:'Session type',bestNominees:'Best paper nominees',venue:'The venue',campus:'Carcavelos Campus · Lisbon',roomsTbd:'Room assignments to be announced.',showResults:'Show results',searchLabel:'Search papers, authors, discussants or sessions',filtersLabel:'Filters',expandPapers:'Expand papers',collapsePapers:'Collapse papers',exportCalendar:'Export calendar',programFootnote:'All times are local to Lisbon (WET, UTC+0). Bold author names indicate presenters, as marked in the source program.',footerLocation:'16–18 December · Lisbon',footerNote:'A little less searching. A little more connecting.',allTracks:'All tracks',allTypes:'All types',complete:'Complete papers',short:'Short papers',dissertation:'Dissertation proposals',feeder:'Feeder workshop',demo:'Demos & prototypes',events:'Keynote & other events',allDays:'All days',fullProgram:'Full program',day0:'Day 0',day1:'Day 1',day2:'Day 2',searchPlaceholder:'Search papers, authors, discussants…',chair:'Chair',room:'Room TBD',session:'Session',papers:'papers',paper:'paper',presentations:'presentations',parallel:'Parallel sessions',viewPapers:'View',matched:'matching',discussant:'Discussant',nomination:'Best paper nominee',saved:'Saved',save:'Save to my schedule',remove:'Remove from my schedule',savedToast:'Added to your schedule',removedToast:'Removed from your schedule',savedLocally:'Your selections are saved in this browser. Calendar exports use session times; individual presentation times are not specified.',noSavedTitle:'Make the program yours.',noSavedBody:'Save a session or a paper with the bookmark icon. Your picks will be waiting here.',browse:'Browse the program',noResults:'No matches just yet.',noResultsBody:'Try a different title or name, or clear your filters to explore the full program.',clearFilters:'Clear search & filters',searchResults:'Search results',sessions:'sessions',activities:'other activities',matches:'matching presentations',lisbonTime:'Lisbon time · UTC+0',searchAllDays:'Search covers all days; use the date tabs to narrow it down.',saveSession:'Save session',savedSession:'Session saved',guideTitle:'Ready for your session.',guideIntro:'Presentation formats and practical notes from the WITS 2026 program.',completeTiming:'15 min presentation + 3 min discussant + 2 min Q&A',dissertationTiming:'18 min presentation + 2 min Q&A',shortTiming:'10 min presentation + 5 min Q&A',demoTiming:'Demo and Prototype Ignite Talks: 3 minutes each',guideItem1:'Report to your session chair 5 minutes before the session begins.',guideItem2:'The presenter of the last paper in each session will serve as the session chair.',guideItem3:'Session chairs coordinate with presenters to set up presentations.',guideItem4:'Presenting authors are shown in bold in the program. Room assignments and the social event details are to be announced.',gotIt:'Got it',downloaded:'Calendar file downloaded',noExport:'Save a session or paper to export your schedule.',storageError:'This browser could not save your selections. They will last for this visit only.',openPapers:'Open papers',selected:'saved items',allSessions:'All sessions',nomineesCount:'5 nominees across the program',allDates:'16–18 December 2026',results:'results',filtersTitle:'Program filters',close:'Close',clearSearch:'Clear search',timeLabel:'Switch between 12-hour and 24-hour time',dateFilter:'Select day',searchTip:'Search by paper title, author, discussant, or session chair.',savedEmptyFilter:'No saved items match these filters.',overlapNote:'Some saved sessions run at the same time. Review parallel sessions before exporting.',
    },

  };
  function readLocal(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
  const allItems = [...data.sessions, ...data.events];
  const itemsById = new Map(allItems.map(s => [s.id, s]));
  const papersById = new Map(allItems.flatMap(s => (s.papers || []).map(p => [p.id, {paper:p, session:s}])));
  const savedValue = readLocal('wits2026-saved', []);
  const saved = new Set((Array.isArray(savedValue) ? savedValue : []).filter(id => itemsById.has(id) || papersById.has(id)));
  const prefs = readLocal('wits2026-preferences', {});
  const state = {day:'2026-12-17',track:'all',type:'all',nominees:false,query:'',view:'program',lang:'en',format:prefs?.format===12?12:24,expanded:new Set(),expandAll:false};
  const t = key => dict[state.lang][key] ?? key;
  let visibleItems = [], toastTimer, inputTimer;
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  const queryTokens = () => normalize(state.query).split(/\s+/).filter(Boolean);
  const match = value => queryTokens().every(token => normalize(value).includes(token));
  const sessionText = s => [s.title,s.code,s.chair,s.speaker,s.note,s.room,s.track && `Track ${s.track}`,s.date].filter(Boolean).join(' ');
  const paperText = p => [p.title,...p.authors,...p.presenters,p.discussant].filter(Boolean).join(' ');
  function highlighted(value) {
    const tokens = state.query.trim().split(/\s+/).filter(Boolean).sort((a,b)=>b.length-a.length);
    if (!tokens.length) return esc(value);
    const pattern = new RegExp(tokens.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'giu');
    let out='',last=0;
    for (const m of String(value).matchAll(pattern)) { out+=esc(String(value).slice(last,m.index))+`<mark>${esc(m[0])}</mark>`;last=m.index+m[0].length; }
    return out+esc(String(value).slice(last));
  }
  function time(value) {
    if (!value) return '';
    if (state.format===24) return value;
    const [h,m]=value.split(':').map(Number);
    return `${h%12||12}:${String(m).padStart(2,'0')} ${h<12?'am':'pm'}`;
  }
  const timeRange = s => s.end ? `${time(s.start)} – ${time(s.end)}` : time(s.start);
  function dayTitle(date, short=false) {
    if(short) return new Intl.DateTimeFormat('en-GB',{weekday:'short',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'))+' '+Number(date.slice(-2));
    return new Intl.DateTimeFormat('en-GB',{weekday:short?'short':'long',month:short?'short':'long',day:'numeric',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
  }
  const kind = s => t(s.kind in dict.en ? s.kind : 'events');
  const authorMarkup = p => p.authors.map(a=>p.presenters.includes(a)?`<strong>${highlighted(a)}</strong>`:highlighted(a)).join(', ');
  const saveButton = (id,label) => `<button class="save-button" data-action="save" data-id="${esc(id)}" aria-pressed="${saved.has(id)}" aria-label="${esc(t(saved.has(id)?'remove':'save')+': '+label)}" title="${esc(t(saved.has(id)?'remove':'save'))}">${icon('bookmark')}</button>`;
  const nomineeBadge = () => `<span class="nominee-badge">${icon('award')}${t('nomination')}</span>`;
  function filteredItems() {
    return allItems.flatMap(s => {
      if(state.day!=='all' && s.date!==state.day) return [];
      if(state.track!=='all' && s.track && s.track!==state.track) return [];
      if(state.type!=='all' && (state.type==='events' ? !!s.papers : s.kind!==state.type)) return [];
      let papers=s.papers||[];
      if(state.view==='saved' && !saved.has(s.id)) {papers=papers.filter(p=>saved.has(p.id));if(!papers.length)return [];}
      if(state.nominees) {papers=papers.filter(p=>p.nominated);if(!papers.length)return [];}
      if(state.query.trim()) {
        const base=sessionText(s);
        const found=papers.filter(p=>match(base+' '+paperText(p)));
        if(!match(base) && !found.length)return [];
        papers=found;
      }
      return [{...s,visiblePapers:papers}];
    }).sort((a,b)=>`${a.date} ${a.start} ${a.track||'0'}`.localeCompare(`${b.date} ${b.start} ${b.track||'0'}`));
  }
  function paperHtml(p) {
    return `<article class="paper-item" id="${esc(p.id)}">${p.nominated?nomineeBadge():''}<div class="paper-top"><h4 class="paper-title">${highlighted(p.title)}</h4>${saveButton(p.id,p.title)}</div><p class="paper-authors">${authorMarkup(p)}</p>${p.discussant?`<p class="discussant">${t('discussant')} <strong>${highlighted(p.discussant)}</strong></p>`:''}</article>`;
  }
  const isExpanded = s => state.expandAll || state.expanded.has(s.id) || !!state.query.trim() || state.nominees || state.view==='saved';
  function sessionHtml(s) {
    const expanded=isExpanded(s), n=s.visiblePapers.length;
    return `<article class="session-card track-${s.track.toLowerCase()} ${saved.has(s.id)?'is-saved':''}" id="${s.id}"><div class="session-top"><span class="track-badge">${t('track')} ${s.track}</span><span class="session-code">${t('session')} ${s.code}</span>${saveButton(s.id,s.title)}</div><div class="session-main"><h3>${highlighted(s.title)}</h3><div class="session-meta"><span>${icon('pin')}${t('room')}</span><span>${esc(kind(s))}</span></div><p class="session-chair">${t('chair')} <strong>${highlighted(s.chair)}</strong></p></div><div class="session-footer"><button class="expand-button" data-action="expand" data-id="${s.id}" aria-controls="papers-${s.id}" aria-expanded="${expanded}">${icon('paper')}<span>${t('viewPapers')} ${n} ${t(n===1?'paper':'papers')}</span>${s.visiblePapers.some(p=>p.nominated)?`<span class="tiny-award" title="${t('nomination')}">${icon('award')}</span>`:''}<span>${icon('chevron')}</span></button><div class="paper-list" id="papers-${s.id}" ${expanded?'':'hidden'}>${s.visiblePapers.map(paperHtml).join('')}</div></div></article>`;
  }
  function eventHtml(s) {
    const eventIcon=s.kind==='transport'?'bus':s.kind==='break'?'cup':s.kind==='keynote'?'mic':s.kind==='demo'?'paper':s.kind==='social'?'people':s.id==='lunch-awards'?'award':'calendar';
    const special=s.kind==='keynote'||s.kind==='demo';
    const subtitle=[s.speaker?`<strong>${highlighted(s.speaker)}</strong>`:'',s.note?highlighted(s.note):'',s.chair?`${t('chair')}: ${highlighted(s.chair)}`:''].filter(Boolean).join('<br>');
    const expanded=isExpanded(s);
    return `<div class="event-wrapper" id="${s.id}"><article class="event-card ${special?'feature-event':''} ${s.kind==='break'?'break-event':''} ${s.kind==='transport'?'transport-event':''}"><span class="event-icon">${icon(eventIcon)}</span><div class="event-details"><h3>${highlighted(s.title)}</h3>${subtitle?`<p>${subtitle}</p>`:''}${s.room?`<p class="mobile-room">${t('room')}</p>`:''}${s.papers?`<button class="event-expand" data-action="expand" data-id="${s.id}" aria-controls="papers-${s.id}" aria-expanded="${expanded}">${t('viewPapers')} ${s.visiblePapers.length} ${t('presentations')}${icon('chevron')}</button>`:''}</div>${s.room?`<span class="room-label">${t('room')}</span>`:''}${saveButton(s.id,s.title)}</article>${s.papers?`<div class="paper-list" id="papers-${s.id}" ${expanded?'':'hidden'}>${s.visiblePapers.map(paperHtml).join('')}</div>`:''}</div>`;
  }
  function renderFilters() {
    $('#track-options').innerHTML=['all','A','B','C','D'].map(track=>`<button class="track-option ${track==='all'?'':'track-'+track.toLowerCase()}" data-action="track" data-track="${track}" aria-pressed="${state.track===track}"><span class="track-symbol ${track==='all'?'track-all':''}">${track==='all'?icon('grid'):track}</span><span>${track==='all'?t('allTracks'):t('track')+' '+track}</span><span class="track-number">${track==='all'?28:7}</span></button>`).join('');
    $('#type-filter').innerHTML=['all','complete','short','dissertation','demo','feeder','events'].map(type=>`<option value="${type}" ${state.type===type?'selected':''}>${type==='all'?t('allTypes'):t(type)}</option>`).join('');
    $('#type-filter').setAttribute('aria-label',t('sessionType'));
    $('#nominee-filter').checked=state.nominees;
    $('#day-tabs').innerHTML=['all',...data.dates].map((d,i)=>`<button class="day-tab" data-action="day" data-day="${d}" aria-pressed="${state.day===d}"><span>${d==='all'?t('allDays'):dayTitle(d,true)}</span><span>${d==='all'?t('fullProgram'):t('day'+(i-1))}</span></button>`).join('');
    $('#day-tabs').setAttribute('aria-label',t('dateFilter'));
    const chips=[];
    if(state.track!=='all')chips.push(['track',`${t('track')} ${state.track}`]);
    if(state.type!=='all')chips.push(['type',t(state.type)]);
    if(state.nominees)chips.push(['nominees',t('bestNominees')]);
    $('#active-filters').innerHTML=chips.map(([key,label])=>`<button class="filter-chip" data-action="remove-filter" data-filter="${key}" aria-label="${esc(t('reset')+': '+label)}">${esc(label)}${icon('close')}</button>`).join('');
    $('#filter-count').textContent=chips.length;
    $('#filter-count').hidden=!chips.length;
  }
  function render() {
    const focusedId=document.activeElement?.dataset?.action==='save'?document.activeElement.dataset.id:null;
    const focusExpand=document.activeElement?.dataset?.action==='expand'?document.activeElement.dataset.id:null;
    visibleItems=filteredItems();
    renderFilters();
    $('#saved-count').textContent=saved.size;
    $$('.nav-item').forEach(b=>{b.classList.toggle('active',b.dataset.view===state.view);b.setAttribute('aria-pressed',String(b.dataset.view===state.view));});
    $('#search-clear').hidden=!state.query;
    $('.search-box kbd').hidden=!!state.query;
    $('.time-format').textContent=state.format+'h';
    const countPapers=visibleItems.reduce((sum,s)=>sum+s.visiblePapers.length,0),countSessions=visibleItems.filter(s=>s.code).length,countEvents=visibleItems.length-countSessions;
    $('#results-title').textContent=state.view==='saved'?t('mySchedule'):state.query.trim()?t('searchResults'):state.day==='all'?t('fullProgram'):dayTitle(state.day);
    $('#search-hint').textContent=(state.query.trim()?`${countPapers} ${t('matches')} · `:`${countSessions} ${t('sessions')} · ${countEvents} ${t('activities')} · `)+t('lisbonTime');
    $('#result-announcement').textContent=`${visibleItems.length} ${t('results')}, ${countPapers} ${t('presentations')}`;
    const forced=!!state.query.trim()||state.nominees||state.view==='saved';
    $('#expand-all').hidden=forced||!visibleItems.some(s=>s.visiblePapers.length);
    $('#expand-all').querySelector('[data-i18n]').textContent=t(state.expandAll?'collapsePapers':'expandPapers');
    $('#export-calendar').hidden=state.view!=='saved';
    $('#export-calendar').disabled=!saved.size;
    $('#schedule-info').hidden=state.view!=='saved';
    $('#schedule-info').textContent=t('savedLocally')+(hasOverlap()?' '+t('overlapNote'):'');
    if(!visibleItems.length) {
      const emptySaved=state.view==='saved'&&!saved.size;
      $('#agenda').innerHTML=`<div class="empty-state"><span class="empty-icon">${icon(emptySaved?'bookmark':'search')}</span><h3>${t(emptySaved?'noSavedTitle':'noResults')}</h3><p>${t(emptySaved?'noSavedBody':state.view==='saved'?'savedEmptyFilter':'noResultsBody')}</p><button class="primary-button" data-action="${emptySaved?'browse':'reset'}">${t(emptySaved?'browse':'clearFilters')}</button></div>`;
    } else {
      $('#agenda').innerHTML=data.dates.map(date=>{
        let items=visibleItems.filter(s=>s.date===date);if(!items.length)return '';
        const arrivals=(!state.query.trim()&&state.view==='program'&&state.type==='all'&&!state.nominees&&date!=='2026-12-16')?items.filter(s=>['registration','transport'].includes(s.kind)||s.id.startsWith('breakfast-')):[];
        if(arrivals.length)items=items.filter(s=>!arrivals.includes(s));
        const arrivalHtml=arrivals.length?`<details class="arrival-details"><summary><span>${icon('cup')}</span><span>${'Arrival, breakfast & registration'}<small>${`Breakfast from ${time('07:30')} · Buses arrive by ${time('08:10')}`}</small></span><span>${icon('chevron')}</span></summary><div class="arrival-list">${arrivals.map(s=>`<div class="arrival-item"><div><strong>${esc(s.title)}</strong><span>${timeRange(s)}${s.room?' · '+t('room'):''}</span></div>${saveButton(s.id,s.title)}</div>`).join('')}</div></details>`:'';
        const slots=[...new Set(items.map(s=>s.start+'|'+(s.end||'')))].sort();
        return `<section class="agenda-day" aria-label="${esc(dayTitle(date))}">${state.day==='all'?`<h3 class="date-heading">${dayTitle(date)}<span>${t('day'+data.dates.indexOf(date))}</span></h3>`:''}${arrivalHtml}${slots.map(slot=>{
          const group=items.filter(s=>s.start+'|'+(s.end||'')===slot),sessions=group.filter(s=>s.code),events=group.filter(s=>!s.code);
          return `<section class="time-block"><h3 class="time-label">${icon('clock')}<span>${timeRange(group[0])}</span>${sessions.length>1?`<span class="parallel-label">${sessions.length} ${t('parallel')}</span>`:''}</h3>${events.length?`<div class="event-stack">${events.map(eventHtml).join('')}</div>`:''}${sessions.length?`<div class="session-grid">${sessions.map(sessionHtml).join('')}</div>`:''}</section>`;
        }).join('')}</section>`;
      }).join('');
    }
    if(focusedId)$(`[data-action="save"][data-id="${focusedId}"]`)?.focus({preventScroll:true});
    if(focusExpand)$(`[data-action="expand"][data-id="${focusExpand}"]`)?.focus({preventScroll:true});
  }
  function setLanguage() {
    document.documentElement.lang='en';
    $$('[data-i18n]').forEach(el=>{el.innerHTML=t(el.dataset.i18n);});
    $('#search').placeholder=t('searchPlaceholder');
    $('#search-clear').setAttribute('aria-label',t('clearSearch'));
    $('.time-format').setAttribute('title',t('timeLabel'));
    $('.time-format').setAttribute('aria-label',t('timeLabel'));
    $('.mobile-filter-close').setAttribute('aria-label',t('close'));
    render();
  }
  function toast(message) {clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
  function savePreferences(){try{localStorage.setItem('wits2026-preferences',JSON.stringify({lang:state.lang,format:state.format}));}catch{}}
  function toggleSave(id) {
    const removing=saved.has(id);
    if(removing)saved.delete(id);else saved.add(id);
    let stored=true;try{localStorage.setItem('wits2026-saved',JSON.stringify([...saved]));}catch{stored=false;}
    render();
    toast(t(stored?(removing?'removedToast':'savedToast'):'storageError'));
  }
  function resetFilters() {clearTimeout(inputTimer);Object.assign(state,{day:'all',track:'all',type:'all',nominees:false,query:'',expandAll:false});$('#search').value='';render();}
  function setView(view) {state.view=view;resetFilters();if(view==='program') {state.day='2026-12-17';render();}}
  function filtersOpen(open) {
    document.body.classList.toggle('filters-open',open);$('.filter-toggle').setAttribute('aria-expanded',String(open));
    const panel=$('#filters');
    if(open){panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label',t('filtersTitle'));$('.mobile-filter-close').focus();}
    else{panel.removeAttribute('role');panel.removeAttribute('aria-modal');panel.removeAttribute('aria-label');$('.filter-toggle').focus({preventScroll:true});}
  }
  function hasOverlap() {
    if(state.view!=='saved')return false;
    const sessions=allItems.filter(s=>s.code && (saved.has(s.id)||(s.papers||[]).some(p=>saved.has(p.id))));
    return sessions.some((a,i)=>sessions.slice(i+1).some(b=>a.date===b.date&&a.start<(b.end||b.start)&&b.start<(a.end||a.start)));
  }
  const closeDialogButton = () => `<button class="icon-button" data-action="dialog-close" aria-label="${t('close')}">${icon('close')}</button>`;
  function openGuide() {
    $('#dialog-content').innerHTML=`<div class="dialog-head"><span class="dialog-kicker">WITS 2026 · ${t('presenterGuide')}</span>${closeDialogButton()}</div><div class="dialog-body"><h2 id="dialog-title">${t('guideTitle')}</h2><p class="guide-intro">${t('guideIntro')}</p>${['complete','dissertation','short','demo'].map(k=>`<div class="format-row"><strong>${t(k)}</strong><span>${t(k+'Timing')}</span></div>`).join('')}<ul class="guide-list">${[1,2,3,4].map(n=>`<li>${t('guideItem'+n)}</li>`).join('')}</ul><div class="dialog-actions"><button class="primary-button" data-action="dialog-close">${t('gotIt')}</button></div></div>`;
    if(!$('#detail-dialog').open)$('#detail-dialog').showModal();
  }
  function exportCalendar() {
    const selected=allItems.filter(s=>saved.has(s.id)||(s.papers||[]).some(p=>saved.has(p.id))).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start));
    if(!selected.length){toast(t('noExport'));return;}
    const escapeIcs=s=>String(s).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
    // December 16–18 in Europe/Lisbon is UTC+0; no per-paper times are inferred.
    const stamp=(date,hour)=>date.replaceAll('-','')+'T'+hour.replace(':','')+'00Z';
    const now=new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//WITS 2026//Conference Program//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:WITS 2026 — My schedule','X-WR-TIMEZONE:Europe/Lisbon'];
    for(const s of selected) {
      const selectedPapers=(s.papers||[]).filter(p=>saved.has(s.id)||saved.has(p.id));
      const description=[s.chair?`Chair: ${s.chair}`:'',s.speaker||'',s.note||'',...selectedPapers.map(p=>`${p.title}\nAuthors: ${p.authors.join(', ')}${p.discussant?'\nDiscussant: '+p.discussant:''}`),selectedPapers.length?'Times refer to the whole session; individual presentation times are not specified.':''].filter(Boolean).join('\n\n');
      lines.push('BEGIN:VEVENT',`UID:${s.id}@wits2026.program`,`DTSTAMP:${now}`,`DTSTART:${stamp(s.date,s.start)}`);
      if(s.end)lines.push(`DTEND:${stamp(s.date,s.end)}`);
      lines.push(`SUMMARY:${escapeIcs('WITS 2026 · '+(s.code?s.code+': ':'')+s.title)}`,`LOCATION:${escapeIcs(s.kind==='transport'?'Nova SBE, Carcavelos Campus':s.id==='reception'||s.id==='registration-0'||s.id==='social'?'Location TBD':`${s.room||'Location TBD'}, Nova SBE, Carcavelos Campus`)}`,`DESCRIPTION:${escapeIcs(description)}`,'END:VEVENT');
    }
    lines.push('END:VCALENDAR');
    // RFC 5545 folds at 75 octets, without splitting a UTF-8 character.
    function fold(line){const result=[];let part='',bytes=0;for(const ch of line){const size=new TextEncoder().encode(ch).length;if(bytes+size>75){result.push(part);part=' ';bytes=1;}part+=ch;bytes+=size;}result.push(part);return result.join('\r\n');}
    const blob=new Blob([lines.map(fold).join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='WITS-2026-My-Schedule.ics';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast(t('downloaded'));
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-action]');if(!button)return;
    const action=button.dataset.action;
    if(action==='save'){toggleSave(button.dataset.id);return;}
    if(action==='expand'){
      const id=button.dataset.id, panel=$('#papers-'+id), expanded=button.getAttribute('aria-expanded')==='true';
      if(expanded)state.expanded.delete(id);else state.expanded.add(id);
      panel.hidden=expanded;button.setAttribute('aria-expanded',String(!expanded));return;
    }
    if(action==='expand-all'){state.expandAll=!state.expandAll;if(!state.expandAll)state.expanded.clear();render();return;}
    if(action==='view'){setView(button.dataset.view);return;}
    if(action==='browse'){setView('program');$('#program').scrollIntoView({behavior:'smooth'});return;}
    if(action==='day'){state.day=button.dataset.day;render();$(`[data-action="day"][data-day="${state.day}"]`)?.focus({preventScroll:true});return;}
    if(action==='track'){state.track=button.dataset.track;render();$(`[data-action="track"][data-track="${state.track}"]`)?.focus({preventScroll:true});return;}
    if(action==='reset'){resetFilters();return;}
    if(action==='remove-filter'){state[button.dataset.filter]=button.dataset.filter==='nominees'?false:'all';render();return;}
    if(action==='search-clear'){clearTimeout(inputTimer);state.query='';$('#search').value='';render();$('#search').focus();return;}
    if(action==='time-format'){state.format=state.format===24?12:24;savePreferences();render();return;}
    if(action==='filters-open'){filtersOpen(true);return;}
    if(action==='filters-close'){filtersOpen(false);return;}
    if(action==='guide'){openGuide();return;}
    if(action==='dialog-close'){$('#detail-dialog').close();return;}
    if(action==='export'){exportCalendar();return;}

  });
  $('#search').addEventListener('input',event=>{
    clearTimeout(inputTimer);const value=event.target.value;
    if(!state.query.trim()&&value.trim())state.day='all';state.query=value;
    inputTimer=setTimeout(render,120);
  });
  $('#type-filter').addEventListener('change',event=>{state.type=event.target.value;render();$('#type-filter').focus({preventScroll:true});});
  $('#nominee-filter').addEventListener('change',event=>{state.nominees=event.target.checked;render();});
  document.addEventListener('keydown',event=>{
    const editing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
    if(event.key==='/'&&!editing&&!$('#detail-dialog').open&&!document.body.classList.contains('filters-open')){event.preventDefault();$('#search').focus();}
    if(event.key==='Escape'&&document.body.classList.contains('filters-open')){event.preventDefault();filtersOpen(false);}
    if(event.key==='Tab'&&document.body.classList.contains('filters-open')){
      const focusable=$$('#filters button, #filters select, #filters input, #filters a').filter(el=>el.getClientRects().length&&!el.disabled),first=focusable[0],last=focusable.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  $('#detail-dialog').addEventListener('click',event=>{if(event.target===$('#detail-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
  window.addEventListener('resize',()=>{if(window.innerWidth>680&&document.body.classList.contains('filters-open'))filtersOpen(false);});
  window.addEventListener('storage',event=>{if(event.key==='wits2026-saved'){const current=readLocal('wits2026-saved',[]);saved.clear();if(Array.isArray(current))current.filter(id=>itemsById.has(id)||papersById.has(id)).forEach(id=>saved.add(id));render();}});
  $$('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon);});
  setLanguage();
})();
