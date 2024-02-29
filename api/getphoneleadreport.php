<?php
include("includes/conn.php");
$getNews = "SELECT * FROM bgcoursephone ORDER BY id DESC";
$query = mysqli_query($con,$getNews);
$allNew = array();
while($newArr = mysqli_fetch_array($query))
{
	$allNew[] = $newArr;
}
$allNew = json_encode($allNew);
echo $allNew;
?>