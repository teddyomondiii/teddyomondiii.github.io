function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    currentTimeElement.textContent = timeString;
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime(); // Call this immediately to set the time on page load
