//const notification = document.getElementById('errorBox');
//const span = notification.querySelector('span');


export function notify(msg) {
    const notification = document.getElementById('errorBox');
    const span = notification.querySelector('span');
    span.textContent = msg;
    notification.style.display = 'block';

    setTimeout(() => notification.style.display = 'none', 3000);
}