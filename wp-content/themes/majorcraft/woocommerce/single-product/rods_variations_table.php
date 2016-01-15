<?php 
global $post, $woocommerce, $product;

$available_variations = $product->get_available_variations();
$attributes = $product->get_attributes();
$fields_desc = pierry_variation_fields_get_available_fields();
$fields = pierry_variation_fields_get($post->ID);


// filter out only fields for our product categories
foreach($fields_desc as $slug=>$field) {
	if(empty(array_intersect(array_keys($categories), array_values($field->cats)))) {
		unset($fields_desc[$slug]);
	}
}

?>
<div class="majorcraft-rods-variations">
	<div class="majorcraft-rods-info">USE FILTERS TO FIND THE RIGHT MODEL</div>
	<div class="majorcraft-rods-filters">
		<?php 
		foreach($fields_desc as $slug=>$field) {
			$values = pierry_variation_fields_get_all_field_values($product, $slug);
		?>
			<th class="<?php echo $slug?>-column">
			<?php if(sizeof($values) > 1) {?>
				<select>
					<option value=""><?php echo $field->name ?></option>
					<?php foreach($values as $value) {?>
					<option value="<?php echo $value?>"><?php echo $value?></option>
					<?php }?>
				</select>
			<?php } else {?>
				&nbsp;
			<?php }?>
			</th>
		<?php 
		}
		?>
	</div>
	<table>
		<tr>
			<?php 
			foreach($fields_desc as $slug=>$field) { 
				echo "<th>".$field->name."</th>";
			}
			?>
		</tr>
			<?php foreach($available_variations as $variation) {
					if($variation['variation_is_visible']) {
			?>
				<tr>
					<td colspan="<?php (sizeof($dields_desc)+3)?>">
					AAAA
					</td>
				</tr>
				<tr>
					<td>
						<?php if(empty($variation['image_src'])) {?>
						<img class="variation_image" src="<?php echo wc_placeholder_img_src()?>">
						<?php }?>
						<img class="variation_image" src="<?php echo $variation['image_src']?>">
					</td>
					<td>
					<?php 
						$variation_obj = wc_get_product($variation['variation_id']);
						echo $variation_obj->parent->post->post_title;
					?>
					</td>
						<?php 	}
						 }
					?>
				</tr>		
	</table>
</div>