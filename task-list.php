<?php 

  include('database.php');

    $query = "SELECT * FROM tareas";

    $result = mysqli_query($connection, $query);

    if(!$result){
    	die('fallo consulta'. mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        // arreglo lleno de objetos
       $json[] = array(
         'name' => $row['nombre'],
         'description' => $row['descripcion'],
         'id' => $row['id']
       );
    }

    $jsonstring =  json_encode($json);
    echo $jsonstring;

 ?>