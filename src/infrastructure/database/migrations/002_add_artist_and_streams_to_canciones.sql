ALTER TABLE canciones 
ADD COLUMN idArtista INT NOT NULL AFTER idCancion,
ADD COLUMN streams INT DEFAULT 0 AFTER año,
ADD CONSTRAINT fk_cancion_artista 
    FOREIGN KEY (idArtista) REFERENCES artistas(idArtista) 
    ON DELETE CASCADE;

CREATE INDEX idx_canciones_artista ON canciones(idArtista);
