package com.example.newpasswordApp;

public class LoginResponse {
    private String message;
    private User user;

    // Constructor
    public LoginResponse(String message, User user) {
        this.message = message;
        this.user = user;
    }

    // Getter ve Setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
