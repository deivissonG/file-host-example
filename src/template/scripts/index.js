const loadingEllipsisRoot = document.getElementById('loading-ellipsis-root');
const input = document.getElementsByTagName('input')[0];
input.oninput = onFileInput;

function deleteFile(filename) {
    loadingEllipsisRoot.innerHTML += '<div class="lds-ellipsis center"><div></div><div></div><div></div><div></div></div>';
    fetch('/', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
    })
        .then(response => response.json())
        .then(body => {
            if (!body.ok && body.error) {
                alert(body.error);
            }
            if (body.ok)
                window.location.reload();
        })
}

function onFileInput(e) {
    const files = [...e.target.form[0].files]
    if (files.length > 10)
        return alert("You are only allowed to upload a maximum of 10 files");
    e.target.form.style.display = 'none';
    e.target.form.submit();
    loadingEllipsisRoot.innerHTML += '<div class="lds-ellipsis center"><div></div><div></div><div></div><div></div></div>';
}

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}