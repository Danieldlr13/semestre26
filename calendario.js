const calendarEl = document.getElementById('calendar');
const modal = document.getElementById('eventModal');
const modalTitle = document.getElementById('modalTitle');
const eventTitle = document.getElementById('eventTitle');
const eventDesc = document.getElementById('eventDesc');
const saveBtn = document.getElementById('saveEvent');
const deleteBtn = document.getElementById('deleteEvent');
const closeBtn = document.getElementById('closeModal');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = JSON.parse(localStorage.getItem('calendarEvents') || '{}');
let selectedDate = null;
let editingEvent = false;

function renderCalendar(month = currentMonth, year = currentYear) {
    currentMonth = month;
    currentYear = year;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    let html = `<div class='calendar-header'>
        <button onclick='changeMonth(-1)'>&lt;</button>
        <span>${firstDay.toLocaleString('es', { month: 'long', year: 'numeric' })}</span>
        <button onclick='changeMonth(1)'>&gt;</button>
    </div>`;
    html += `<div class='calendar-days'>`;
    ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].forEach(d => html += `<div>${d}</div>`);
    html += `</div><div class='calendar-dates'>`;
    for (let i = 0; i < startDay; i++) html += `<div></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        html += `<div data-date='${dateStr}' onclick='openEventModal("${dateStr}")'>${d}`;
        if (events[dateStr]) {
            events[dateStr].forEach((ev, idx) => {
                html += `<span class='event' onclick='event.stopPropagation(); openEventModal("${dateStr}",${idx})'>${ev.title}</span>`;
            });
        }
        html += `</div>`;
    }
    html += `</div>`;
    calendarEl.innerHTML = html;
}

window.changeMonth = function(delta) {
    let m = currentMonth + delta;
    let y = currentYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    renderCalendar(m, y);
};

window.openEventModal = function(dateStr, eventIdx = null) {
    selectedDate = dateStr;
    editingEvent = eventIdx !== null;
    modal.style.display = 'flex';
    if (editingEvent) {
        modalTitle.textContent = 'Editar evento';
        eventTitle.value = events[dateStr][eventIdx].title;
        eventDesc.value = events[dateStr][eventIdx].desc;
        deleteBtn.style.display = '';
    } else {
        modalTitle.textContent = 'Agregar evento';
        eventTitle.value = '';
        eventDesc.value = '';
        deleteBtn.style.display = 'none';
    }
    saveBtn.onclick = function() {
        if (!eventTitle.value.trim()) return;
        if (!events[dateStr]) events[dateStr] = [];
        if (editingEvent) {
            events[dateStr][eventIdx] = { title: eventTitle.value, desc: eventDesc.value };
        } else {
            events[dateStr].push({ title: eventTitle.value, desc: eventDesc.value });
        }
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        modal.style.display = 'none';
        renderCalendar();
    };
    deleteBtn.onclick = function() {
        if (editingEvent) {
            events[dateStr].splice(eventIdx, 1);
            if (events[dateStr].length === 0) delete events[dateStr];
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            modal.style.display = 'none';
            renderCalendar();
        }
    };
};
closeBtn.onclick = function() { modal.style.display = 'none'; };
window.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };
renderCalendar();
