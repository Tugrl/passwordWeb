package com.example.newpasswordApp;


import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Constructor Dependency Injection
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user){
        // Şifreyi şifreleyerek kaydet
        String encodedPassword = passwordEncoder.encode(user.getUserPassword());
        user.setUserPassword(encodedPassword);

        User userSaved = userRepository.save(user);
        return ResponseEntity.ok(userSaved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("Giriş yapmaya çalışan kullanıcı: " + loginRequest.getUser_name());

        User user = userRepository.findByUserName(loginRequest.getUser_name());
        if (user == null) {
            System.out.println("Kullanıcı bulunamadı.");
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        System.out.println("Veritabanında saklanan şifre: " + user.getUserPassword());
        System.out.println("Girilen şifre: " + loginRequest.getUser_password());

        boolean matches = passwordEncoder.matches(loginRequest.getUser_password(), user.getUserPassword());
        System.out.println("Şifre eşleşti mi? " + matches);

        if (!matches) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        System.out.println("Giriş başarılı.");
        LoginResponse login= new LoginResponse("Login Successful",user);
        return ResponseEntity.ok(login);
    }


}
