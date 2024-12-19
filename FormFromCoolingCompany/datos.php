<?php
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $telefono = $_POST['telefono'];
    $calle = $_POST['calle'];
    $colonia = $_POST['colonia'];
    $numeroExt = $_POST['numeroExt'];
    $problema = $_POST['problema'];
    $municipio = $_POST['municipio'];
    $fecha = date('d/m/y');

    $conn = mysqli_connect("localhost", "root", "", "aire_acondicionado");

    if (!$conn) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    $sql = "INSERT INTO clientes (nombre, apellido, telefono, calle, colonia, numeroExt, problema, municipio, fecha)
    VALUES ('$nombre', '$apellido', '$telefono', '$calle', '$colonia', '$numeroExt', '$problema', '$municipio', '$fecha')";

    mysqli_query($conn, $sql);

    mysqli_close($conn);
?>