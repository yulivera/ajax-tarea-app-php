<?php 

include('database.php');

$search = $_POST['search'];
// si este valor no esta vacio
if(!empty($search)){
	$query = "SELECT * FROM tareas WHERE nombre LIKE '$search%' ";
	$result = mysqli_query($connection, $query);

	// si no tengo una respuesta de la base de datos, termina proceso con die 
	if(!$result){
		die('Query Error'. mysqli_error($connection));
	}
 // resivir resultado, convertirlo en un array y guardarlo en row
	// convertirlo a un arhivo json para enviarlo al froend

    $json = array();
	while($row = mysqli_fetch_array($result)){
          $json[] = array(
              'name' => $row['nombre'],
              'description' => $row['descripcion'],
              'id' => $row['id']
          );
	}
	// convertirlo para enviarlo y guardar en jsonstring
	$jsonstring = json_encode($json);
	echo $jsonstring;
}

 ?>