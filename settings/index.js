const logsElement = document.getElementById('logs');
const clearLogsElement = document.getElementById('clearLogs');

function updateLogs(Homey) {
  Homey.get('logs', (err, logs) => {
    if (err) return Homey.alert(err);
    if (logs === null) return;
    const json = JSON.parse(logs);
    let html = '';
    for (let i = 0; i < json.length; i++) {
      const obj = json[i];
      html += `${obj.date}<br>&nbsp;&nbsp;&nbsp;&nbsp;${obj.message}<br>`;
    }
    logsElement.innerHTML = html;
  });
}


function onHomeyReady(Homey) {
  updateLogs(Homey);
  clearLogsElement.addEventListener('click', (e) => {
    Homey.set('logs', '[]', (err) => {
      if (err) return Homey.alert(err);
    });
    logsElement.innerHTML = '';
  });
  Homey.ready();
}
