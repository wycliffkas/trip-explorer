package org.billy.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class AuthRequest {

    private String email;
    private String password;

}
