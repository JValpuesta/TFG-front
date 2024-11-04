package com.valpuestajorge.conecta4.errors;

import java.time.LocalDateTime;
import java.util.Date;

public class CustomError extends Exception{
    private final LocalDateTime timestamp;
    private final int HttpCode;
    private final String mensaje;

    public CustomError(LocalDateTime timestamp, int HttpCode, String mensaje) {
        this.timestamp = timestamp;
        this.HttpCode = HttpCode;
        this.mensaje = mensaje;
    }

    // Getters y setters

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getHttpCode() {
        return HttpCode;
    }

    public String getMensaje() {
        return mensaje;
    }
}