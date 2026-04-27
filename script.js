const state = {
    template: 'classic',
    color: '#1a1a2e',
    fontScale: 100,
    name: '', jobtitle: '', summary: '',
    email: '', phone: '', location: '', website: '',
    experience: [],
    education: [],
    skills: [],
    langs: []
};

let expCounter = 0, eduCounter = 0;

function switchTab(tab, event) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    event.target.classList.add('active');
}

function addEntry(type) {
    const id = type === 'exp' ? ++expCounter : ++eduCounter;
    const listId = type === 'exp' ? 'exp-list' : 'edu-list';
    const arr = type === 'exp' ? state.experience : state.education;

    const entry = type === 'exp'
        ? { id, title: '', org: '', dateFrom: '', dateTo: '', desc: '' }
        : { id, degree: '', school: '', dateFrom: '', dateTo: '', note: '' };
    arr.push(entry);

    const card = document.createElement('div');
    card.className = 'entry-card';
    card.id = `${type}-card-${id}`;

    if (type === 'exp') {
        card.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-title">Experience #${arr.length}</span>
        <button class="btn-remove" onclick="removeEntry('exp',${id})">✕</button>
      </div>
      <div class="field-group"><label>Job Title</label><input type="text" placeholder="Software Engineer" oninput="updateEntry('exp',${id},'title',this.value)"></div>
      <div class="field-group"><label>Company</label><input type="text" placeholder="Acme Corp" oninput="updateEntry('exp',${id},'org',this.value)"></div>
      <div class="field-row">
        <div class="field-group"><label>From</label><input type="text" placeholder="Jan 2021" oninput="updateEntry('exp',${id},'dateFrom',this.value)"></div>
        <div class="field-group"><label>To</label><input type="text" placeholder="Present" oninput="updateEntry('exp',${id},'dateTo',this.value)"></div>
      </div>
      <div class="field-group"><label>Description</label><textarea placeholder="Key responsibilities..." oninput="updateEntry('exp',${id},'desc',this.value)"></textarea></div>
    `;
    } else {
        card.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-title">Education #${arr.length}</span>
        <button class="btn-remove" onclick="removeEntry('edu',${id})">✕</button>
      </div>
      <div class="field-group"><label>Degree / Certificate</label><input type="text" placeholder="B.S. Computer Science" oninput="updateEntry('edu',${id},'degree',this.value)"></div>
      <div class="field-group"><label>School / Institution</label><input type="text" placeholder="University of California" oninput="updateEntry('edu',${id},'school',this.value)"></div>
      <div class="field-row">
        <div class="field-group"><label>From</label><input type="text" placeholder="2016" oninput="updateEntry('edu',${id},'dateFrom',this.value)"></div>
        <div class="field-group"><label>To</label><input type="text" placeholder="2020" oninput="updateEntry('edu',${id},'dateTo',this.value)"></div>
      </div>
      <div class="field-group"><label>Notes (GPA, Honors...)</label><input type="text" placeholder="GPA 3.9, Magna Cum Laude" oninput="updateEntry('edu',${id},'note',this.value)"></div>
    `;
    }

    document.getElementById(listId).appendChild(card);
    render();
}

function removeEntry(type, id) {
    const arr = type === 'exp' ? state.experience : state.education;
    const idx = arr.findIndex(e => e.id === id);
    if (idx > -1) arr.splice(idx, 1);
    const card = document.getElementById(`${type}-card-${id}`);
    if (card) card.remove();
    render();
}

function updateEntry(type, id, field, value) {
    const arr = type === 'exp' ? state.experience : state.education;
    const entry = arr.find(e => e.id === id);
    if (entry) entry[field] = value;
    render();
}

function addSkill() {
    const input = document.getElementById('skill-input');
    const val = input.value.trim();
    if (!val) return;
    state.skills.push(val);
    input.value = '';
    renderSkillsUI();
    render();
}

function addLang() {
    const input = document.getElementById('lang-input');
    const val = input.value.trim();
    if (!val) return;
    state.langs.push(val);
    input.value = '';
    renderSkillsUI();
    render();
}

function removeSkill(i) { state.skills.splice(i, 1); renderSkillsUI(); render(); }
function removeLang(i) { state.langs.splice(i, 1); renderSkillsUI(); render(); }

function renderSkillsUI() {
    document.getElementById('skills-display').innerHTML = state.skills.map((s, i) =>
        `<div class="skill-chip">${s}<button onclick="removeSkill(${i})">✕</button></div>`
    ).join('');
    document.getElementById('langs-display').innerHTML = state.langs.map((l, i) =>
        `<div class="skill-chip">${l}<button onclick="removeLang(${i})">✕</button></div>`
    ).join('');
}

function selectTemplate(tpl, el) {
    state.template = tpl;
    document.querySelectorAll('.template-swatch').forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');
    render();
}

function setColor(el) {
    state.color = el.dataset.color;
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
    render();
}

function setFontScale(v) {
    state.fontScale = v;
    render();
}

function getVal(id) {
    return document.getElementById(id)?.value?.trim() || '';
}

function render() {
    state.name = getVal('name');
    state.jobtitle = getVal('jobtitle');
    state.summary = getVal('summary');
    state.email = getVal('email');
    state.phone = getVal('phone');
    state.location = getVal('location');
    state.website = getVal('website');

    const page = document.getElementById('resume-page');
    page.className = `resume-page ${state.template}`;
    page.style.setProperty('--r-accent', state.color);
    page.style.fontSize = (state.fontScale / 100) + 'rem';

    const name = state.name || 'Your Name';
    const title = state.jobtitle || 'Job Title';

    const contactItems = [
        state.email ? `<span data-icon="✉">${state.email}</span>` : '',
        state.phone ? `<span data-icon="☏">${state.phone}</span>` : '',
        state.location ? `<span data-icon="⌖">${state.location}</span>` : '',
        state.website ? `<span data-icon="⊕">${state.website}</span>` : '',
    ].filter(Boolean).join('');

    const expHTML = state.experience.length ? state.experience.map(e => `
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">${e.title || 'Job Title'}</span>
        <span class="exp-date">${[e.dateFrom, e.dateTo].filter(Boolean).join(' – ')}</span>
      </div>
      ${e.org ? `<div class="exp-org">${e.org}</div>` : ''}
      ${e.desc ? `<div class="exp-desc">${e.desc.replace(/\n/g, '<br>')}</div>` : ''}
    </div>
  `).join('') : '<p class="empty-hint">Add experience entries in the Experience tab.</p>';

    const eduHTML = state.education.length ? state.education.map(e => `
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">${e.degree || 'Degree'}</span>
        <span class="exp-date">${[e.dateFrom, e.dateTo].filter(Boolean).join(' – ')}</span>
      </div>
      ${e.school ? `<div class="exp-org">${e.school}</div>` : ''}
      ${e.note ? `<div class="exp-desc">${e.note}</div>` : ''}
    </div>
  `).join('') : '<p class="empty-hint">Add education entries in the Education tab.</p>';

    const skillsHTML = state.skills.length
        ? `<div class="skills-list">${state.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>`
        : '<p class="empty-hint">Add skills in the Skills tab.</p>';

    const langsHTML = state.langs.length
        ? `<div class="skills-list">${state.langs.map(l => `<span class="skill-tag">${l}</span>`).join('')}</div>`
        : '';

    if (state.template === 'sidebar') {
        page.innerHTML = `
      <div class="resume-inner">
        <aside class="resume-sidebar">
          <div>
            <div class="resume-name">${name}</div>
            <div class="resume-title">${title}</div>
          </div>
          <div>
            <div class="sidebar-section-title">Contact</div>
            <div class="resume-contact">
              ${state.email ? `<span>✉ ${state.email}</span>` : ''}
              ${state.phone ? `<span>☏ ${state.phone}</span>` : ''}
              ${state.location ? `<span>⌖ ${state.location}</span>` : ''}
              ${state.website ? `<span>⊕ ${state.website}</span>` : ''}
            </div>
          </div>
          ${state.skills.length ? `
            <div>
              <div class="sidebar-section-title">Skills</div>
              <div class="skills-list">${state.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>` : ''}
          ${state.langs.length ? `
            <div>
              <div class="sidebar-section-title">Languages</div>
              <div class="skills-list">${state.langs.map(l => `<span class="skill-tag">${l}</span>`).join('')}</div>
            </div>` : ''}
        </aside>
        <main class="resume-main">
          ${state.summary ? `<div><div class="section-title">Profile</div><p class="summary-text">${state.summary}</p></div>` : ''}
          <div><div class="section-title">Experience</div>${expHTML}</div>
          <div><div class="section-title">Education</div>${eduHTML}</div>
        </main>
      </div>
    `;
    } else {
        page.innerHTML = `
      <div class="resume-header">
        <div class="resume-name">${name}</div>
        <div class="resume-title">${title}</div>
        ${contactItems ? `<div class="resume-contact">${contactItems}</div>` : ''}
      </div>
      <div class="resume-body">
        ${state.summary ? `<div><div class="section-title">Profile</div><p class="summary-text">${state.summary}</p></div>` : ''}
        <div><div class="section-title">Experience</div>${expHTML}</div>
        <div><div class="section-title">Education</div>${eduHTML}</div>
        ${state.skills.length ? `<div><div class="section-title">Skills</div>${skillsHTML}</div>` : ''}
        ${state.langs.length ? `<div><div class="section-title">Languages</div>${langsHTML}</div>` : ''}
      </div>
    `;
    }
}

function clearAll() {
    if (!confirm('Clear everything and start fresh?')) return;
    ['name', 'jobtitle', 'summary', 'email', 'phone', 'location', 'website'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    state.experience = [];
    state.education = [];
    state.skills = [];
    state.langs = [];
    document.getElementById('exp-list').innerHTML = '';
    document.getElementById('edu-list').innerHTML = '';
    renderSkillsUI();
    render();
}

render();
