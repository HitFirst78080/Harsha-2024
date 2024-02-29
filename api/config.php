<?php

function connectDB() 
	{
	$servername = "localhost";
	$username = "root";
	$password = "";
	$db="tupperware";

$con = new mysqli($servername, $username, $password,$db);
if ($con->connect_errno) {
  $res['errror'] = "Failed to connect to MySQL: " . $con->connect_error;
	echo json_encode($res);	
  exit();
}
		return $con;
} 
function tableName(){
$tab = 'harshamonsoon2023';
return $tab;
}

?>