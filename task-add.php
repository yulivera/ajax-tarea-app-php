<?php 

include('database.php');

    // si existe una variable con nombre name , 
    if(isset($_POST['name'])){
    	// echo $_POST['name'];
    	$name = $_POST['name'];
    	$description = $_POST['description'];
    	// hacer consulta en bd
    	$query = "INSERT INTO tareas(nombre,descripcion) VALUES ('$name', '$description')";
    	$result = mysqli_query($connection, $query);
    	if(!$result){
    		die('consulta a fallado');
    	}

    	echo "tarea agregado satisfatoriamente";
    }

 ?>