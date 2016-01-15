<?php
$i = 1;
echo '<table class="pierry_variation_fields_cont">';
foreach ($field_list as $field) {
	list($slug, $name) = explode('=>', $field);
	if ($i == 1) {
		echo "<tr>";
	}
	echo "<td><span class='pierry_variation_fields_label'>$name</span><span class='pierry_variation_fields_value' id='$slug'></span></td>";
	if ($i == $columns) {
		$i = 1;
		echo "</tr>";
	} else {
		$i ++;
	}
}
echo "</table>";
?>



