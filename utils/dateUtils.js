function futureDateValue(days = 7) {
    const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    // format as YYYY-MM-DDTHH:MM (suitable for datetime-local inputs)
    const pad = (n) => String(n).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const min = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

module.exports = { futureDateValue };
