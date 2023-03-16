package com.javatodev.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javatodev.api.model.Airlines;
import com.javatodev.api.model.UserData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DataService {

    @Autowired
    private RestTemplate restTemplate;

    public List<UserData> getData() throws JsonProcessingException {
        String url = "https://jsonplaceholder.typicode.com/posts";
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        String responseBody = responseEntity.getBody();

        log.info("responseBody: {}", responseBody);
        ObjectMapper mapper = new ObjectMapper();
//        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        List<UserData> userDataList = mapper.readValue(responseBody, List.class);
        return userDataList;
    }
}
