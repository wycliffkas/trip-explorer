package org.billy.backend.service.Impl;

import lombok.RequiredArgsConstructor;
import org.billy.backend.domain.User;
import org.billy.backend.dto.request.SignupRequest;
import org.billy.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void registerUser(SignupRequest request) {
        // Check if the email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setRole(request.getRole());
        user.setName(request.getName());

        userRepository.save(user);
    }
}
