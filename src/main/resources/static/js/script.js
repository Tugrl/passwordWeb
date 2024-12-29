function navigateToClearDatabase() {
//    window.location.href = 'index2.html';  // Buraya gitmek istediğiniz sayfanın adını yazın
      window.location.href = '/index2';
}
function checkPasswordCriteria(password) {
    // Kriterleri kontrol et
    const hasUppercase = /[A-Z]/.test(password);
    const isLongEnough = password.length >= 8;
    const hasSpecialChar = /[#!&]/.test(password);
    const hasNumber = /\d/.test(password); // Sayı içeriğini kontrol et

    // Her kriteri güncelle
    updateCriteria("uppercase", hasUppercase, "Büyük harf içeriyor", "Büyük harfli karaktere sahip değil");
    updateCriteria("length", isLongEnough, "Yeterli uzunlukta", "Minimum uzunluk 8 karakter olmalıdır");
    updateCriteria("specialChar", hasSpecialChar, "Geçerli bir sembol içeriyor (#, &, !)", "İstenilen sembollerden birine sahip değil (#, &, !)");
    updateCriteria("number", hasNumber, "Bir sayı içeriyor", "Bir sayı içermiyor");
}

function updateCriteria(criteria, isValid, positiveMessage, negativeMessage) {
    const element = document.getElementById(criteria);
    const icon = element.querySelector(".icon");
    const text = element.querySelector(".text");

    if (isValid) {
        icon.textContent = "✅";
        text.style.color = "green";
        text.textContent = positiveMessage; // Olumlu mesajı göster
    } else {
        icon.textContent = "❌";
        text.style.color = "red";
        text.textContent = negativeMessage; // Olumsuz mesajı göster
    }
}

// Input alanına her yazıldığında şifre kontrolü yap
document.getElementById("passwordField").addEventListener("input", function () {
    const password = this.value;
    checkPasswordCriteria(password);
});



// Şifre görünürlüğünü değiştir
function togglePasswordVisibility() {
    const passwordField = document.getElementById("passwordField");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
}

// Kullanıcı her giriş yaptığında kontrol et
document.getElementById("passwordField").addEventListener("input", (event) => {
    const password = event.target.value;
    checkPasswordCriteria(password);
});

function generatePassword() {
    // Karakter grupları
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "#!&";
    const allChars = uppercaseChars + lowercaseChars + numbers + specialChars;

    // Rastgele karakterleri seçerek kriterleri garanti altına al
    let password = "";
    password += getRandomCharacter(uppercaseChars); // En az bir büyük harf
    password += getRandomCharacter(specialChars);  // En az bir özel karakter
    password += getRandomCharacter(numbers);       // En az bir rakam

    // Geri kalan karakterleri tamamla
    for (let i = password.length; i < 12; i++) {
        password += getRandomCharacter(allChars);
    }

    // Karakterleri karıştır (shuffle)
    password = shuffleString(password);

    // Şifre alanına yerleştir
    const passwordField = document.getElementById("passwordField");
    passwordField.value = password;

    // Kriterleri kontrol et
    checkPasswordCriteria(password);
    
}

// Rastgele bir karakter seçmek için yardımcı fonksiyon
function getRandomCharacter(charSet) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
}

// Şifreyi karıştırmak için yardımcı fonksiyon
function shuffleString(str) {
    return str.split("").sort(() => Math.random() - 0.5).join("");
}
function saveUserData() {
    // Giriş alanlarını al
    const username = document.getElementById("usernameField").value;
    const name = document.getElementById("nameField").value;
    const surname = document.getElementById("surnameField").value;
    const password = document.getElementById("passwordField").value;

    // Şifre kriterlerini kontrol et
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasNumberName = /\d/.test(name);
    const hasNumberSurname = /\d/.test(surname);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!username || !name || !surname || !password) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    if (!hasUpperCase || !hasNumber || !hasSpecialChar || !isLongEnough) {
        alert("Daha güvenli bir şifre oluşturun. Şifreniz en az 8 karakter uzunluğunda, bir büyük harf, bir rakam ve bir özel karakter içermelidir.");
        return;
    }
    if(hasNumberName || hasNumberSurname){
        alert("İsim ve Soyisim numara içeremez");
        return;
    }

    alert("Bilgiler başarıyla kaydedildi.");

    // Kullanıcı bilgilerini kaydet
    const userData = {
        username: username,
        name: name,
        surname: surname,
        password: btoa(password), // Şifreyi şifreleyerek sakla
    };

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    savedUsers.push(userData);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    // Giriş alanlarını sıfırla
    document.getElementById("usernameField").value = "";
    document.getElementById("nameField").value = "";
    document.getElementById("surnameField").value = "";
    document.getElementById("passwordField").value = "";
}

