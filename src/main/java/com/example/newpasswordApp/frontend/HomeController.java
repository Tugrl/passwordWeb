package com.example.newpasswordApp.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String HomePage() {
        return "index";  // "index.html" sayfasını döndürür
    }

    @GetMapping("/index2")
    public String redirectToIndex2() {
        return "index2";  // index2.html sayfasını Thymeleaf ile render eder
    }

}
