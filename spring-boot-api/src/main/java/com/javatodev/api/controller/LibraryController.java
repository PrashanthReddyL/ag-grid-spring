package com.javatodev.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.javatodev.api.model.UserData;
import com.javatodev.api.service.DataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/library")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LibraryController {



    private final DataService dataService;

    @GetMapping("/book")
    public List<UserData> getUserdata() throws JsonProcessingException {

        return dataService.getData();
    }


}
