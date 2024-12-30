// Verileri yükleme fonksiyonu
function loadUserData() {
    const userList = document.getElementById("user-list");

    // Listeyi sıfırla
    userList.innerHTML = "";

    // Fetch API ile backend'den kullanıcı verilerini al
    fetch('/api/user/allusers') // Backend URL'ini doğru yaz
        .then(response => {
            if (!response.ok) {
                throw new Error('Server error');
            }
            return response.json();
        })
        .then(users => {
            if (users.length === 0) {
                userList.innerHTML = "<p>No user data available.</p>";
                return;
            }

            // Kullanıcı bilgilerini kart şeklinde listele
            users.forEach((user, index) => {
                const listItem = document.createElement("div");
                listItem.classList.add("user-card");

                // Kart içeriği
                listItem.innerHTML = `
                    <p><strong>Username:</strong> ${user.userName}</p>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Surname:</strong> ${user.surname}</p>
                    <p><strong>Password:</strong> ${user.userPassword}</p>
                    <button class="delete-btn" onclick="deleteUser(${user.uuid})">Delete</button>
                `;

                userList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            userList.innerHTML = "<p>Error loading user data.</p>";
        });
}

// Kullanıcı silme fonksiyonu
function deleteUser(uuid) {
    fetch(`/api/user/delete/${uuid}`, {
        method: 'Delete',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            loadUserData(); // Silme işlemi başarılıysa listeyi güncelle
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to delete user.");
        });
}

// Veritabanını temizleme fonksiyonu
document.getElementById("clear-database").addEventListener("click", () => {
    fetch('http://localhost:8080/api/user/clear', {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to clear database');
            }
            loadUserData(); // Listeyi sıfırla
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to clear database.");
        });
});

// Sayfa yüklendiğinde verileri çek
document.addEventListener("DOMContentLoaded", loadUserData);
