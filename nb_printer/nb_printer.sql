-- Tabela drukarek postawionych komendą /printeradmin.
-- Skrypt tworzy ją sam przy starcie, jeśli oxmysql działa.
-- Ten plik jest na wypadek, gdy wolisz odpalić SQL ręcznie.

CREATE TABLE IF NOT EXISTS `nb_printers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(64) NOT NULL,
    `x` DOUBLE NOT NULL,
    `y` DOUBLE NOT NULL,
    `z` DOUBLE NOT NULL,
    `heading` DOUBLE NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
