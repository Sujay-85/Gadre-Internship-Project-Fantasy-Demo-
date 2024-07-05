document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rpassword = document.getElementById('rpassword').value;



    const formData = {
        name,
        email,
        number,
        username,
        password,
        rpassword
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('userForm').reset();
    })
    .catch(error => console.error('Error:', error));
});


document.getElementById('userlogin').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission


    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    



    const formdata = {

        username,
        password
        
    };

    fetch('/login ', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formdata)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('userlogin').reset();
    })
    .catch(error => console.error('Error:', error));
});
