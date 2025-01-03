package com.example.newpasswordApp;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        String encodedPassword = passwordEncoder.encode(user.getUserPassword());
        user.setUserPassword(encodedPassword);

        User userSaved = userRepository.save(user);
        return ResponseEntity.ok(userSaved);
    }

    @GetMapping("/allusers")
    public ResponseEntity<List<User>> takeAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.status(HttpStatus.CREATED).body(users);
    }

    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer uuid){
        Optional<User> userOptional = userRepository.findById(uuid);
        if (userOptional.isPresent()){
            userRepository.deleteById(uuid);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return null;
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> deleteAllUsers() {
        try {
            userRepository.deleteAll();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        User user = userRepository.findByUserName(loginRequest.getUser_name());
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        boolean matches = passwordEncoder.matches(loginRequest.getUser_password(), user.getUserPassword());
        if (!matches) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        LoginResponse login = new LoginResponse("Login Successful", user);
        return ResponseEntity.ok(login);
    }


}
