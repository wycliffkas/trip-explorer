package org.billy.backend.dto.request;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String password;
    private String role;
    private String name;
}
