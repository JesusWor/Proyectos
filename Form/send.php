<?php
    //include(conexion.php);

    if(isset($_POST['send'])){
        if(
            strlen($_POST['usiario']) >= 1 &&
            strlen($_POST['nombre']) >= 1 &&
            strlen($_POST['password']) >= 1 &&
            strlen($_POST['correo']) >= 1 &&
            strlen($_POST['telefono']) >= 1
        ){
            $usuario = trim($_POST['usuario']);
            $nombre = trim($_POST['nombre']);
            $password = trim($_POST['password']);
            $correo = trim($_POST['correo']);
            $telefono = trim($_POST['telefono']);
            $fecha = date('d/m/y'); 

            $query = "INSERT INTO usuarios(usuario, nombre, password, correo, telefono, fecha) VALUES ('$usuario', '$nombre', '$password', '$correo', '$telefono', '$fecha')";
            $result = mysqli_query($conexion, $query);

            if($result){
                ?>
                //header('Location: ../index.php');
                <h3 class="succes">Tu registro ha sido guardado</h3>
                <?php
            }else{
                ?>
                <h3 class="error">Error al registrar</h3>
                <?php
            }
        }else{
            ?>
                <h3 class="error">Llena todos los campos</h3>
                <?php
        }
    }
?>