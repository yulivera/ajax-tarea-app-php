<?php 

include('database.php');

$id =  $_POST['id'];
$name = $_POST['name'];
$description =  $_POST['description'];

$query = "UPDATE tareas SET nombre = '$name' , descripcion = '$description' WHERE id = '$id' ";

$result = mysqli_query($connection, $query);

if(!$result){
	die('Consulta Fallida');
}

echo "Tarea Actualizada ";


 ?>