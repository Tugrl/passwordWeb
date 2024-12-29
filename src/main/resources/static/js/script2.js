function loadUserData() {
  const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const userList = document.getElementById("user-list");

  // Listeyi sıfırla
  userList.innerHTML = "";

  if (savedUsers.length === 0) {
      userList.innerHTML = "<p>No user data saved.</p>";
      return;
  }

  // Kullanıcı bilgilerini kart şeklinde listele
  savedUsers.forEach((user, index) => {
      const listItem = document.createElement("div");
      listItem.classList.add("user-card");

      // Kart içeriği
      listItem.innerHTML = `
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Surname:</strong> ${user.surname}</p>
          <p><strong>Password:</strong> ${atob(user.password)}</p>
          <button class="delete-btn" data-index="${index}" onclick="deleteUser(${index})">Delete</button>
      `;

      // Listeye ekle
      userList.appendChild(listItem);
  });
}

function deleteUser(index) {
  const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
  savedUsers.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(savedUsers));
  loadUserData(); // Listeyi güncelle
}

// Clear Database button functionality
document.getElementById("clear-database").addEventListener("click", () => {
  localStorage.removeItem("users");
  loadUserData();
});

// Load data on page load
document.addEventListener("DOMContentLoaded", loadUserData);
