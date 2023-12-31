package com.cleanread.company.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @project: backend
 */

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ImageUploadException extends RuntimeException {
    private String message;

    public ImageUploadException(String message) {
        super(message);
    }

    public ImageUploadException() {
        super("Profil resmi yükleme hatası: Geçersiz resim türü.");
    }
}
