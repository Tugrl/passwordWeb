// Form submit handler
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Prepare the login request body
    const loginRequest = {
        user_name: username,
        user_password: password
    };

    // Make the API call for login
    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // JSON içeriğini döndür
        } else {
            return response.text().then(message => {
                throw new Error(message); // Hata mesajını al ve at
            });
        }
    })
    .then(data => {
        // Giriş başarılı olduğunda yanıtı işle
        alert(data.message); // Örneğin, başarılı giriş mesajını göster
        displayUserInfo(data.user); // Kullanıcı bilgilerini ekrana yazdır
    })
    .catch(error => {
        // Hata durumunda hata mesajını göster
        document.getElementById("error-message").innerText = error.message;
    });
});

// Kullanıcı bilgilerini ekranda gösteren fonksiyon
function displayUserInfo(user) {
    // Kullanıcı bilgilerini DOM'a ekleyin
    document.getElementById("user-username").innerText = `Username: ${user.userName}`;
    document.getElementById("user-name").innerText = `Name: ${user.name}`;
    document.getElementById("user-surname").innerText = `Surname: ${user.surname}`;

    // Kullanıcı bilgisi bloğunu görünür hale getirin
    document.querySelector(".user-info-container").style.visibility = 'visible';
}


