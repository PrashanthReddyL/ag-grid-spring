package com.javatodev.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Airlines {
    private List<UserData> airline;
}
