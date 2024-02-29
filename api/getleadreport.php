<?php
include("config.php");
$con = connectDB();
$table =  tableName();
$getData = "SELECT * FROM ". $table ." ORDER BY id DESC";
$query = $con->query($getData);
$allNew = array();
while($newArr = mysqli_fetch_array($query))
{
	$allNew[] = $newArr;
}
$allNew = json_encode($allNew);
echo $allNew;
?>