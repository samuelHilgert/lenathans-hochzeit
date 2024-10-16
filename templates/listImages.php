<?php
$directory = '../img/gallery/';
$images = glob($directory . "*.{jpg,jpeg,png,gif}", GLOB_BRACE);
echo json_encode($images);
?>