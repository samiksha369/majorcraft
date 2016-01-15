<?php 
echo '<?xml version="1.0" encoding="utf-8"?>';

$button_theme = get_option('pierry_product_360_theme', 'MetroRound');
$button_size = get_option('pierry_product_360_button_size', 16);
$button_position = get_option('pierry_product_360_button_position', 'left');
$button_offset = get_option('pierry_product_360_button_offset', 5);

$show_frame = get_option('pierry_product_360_show_frame');
if($show_frame == 'yes') {
	$show_frame = 'True';
}
else {
	$show_frame = 'False';
}

$post = get_post($product_id);
$product_name = $post->post_title;
if(variation_id) {
	$size = array($image_width, $image_height);
}
else {
	$attachment_id = get_post_thumbnail_id($post->ID);
	$size = getimagesize(get_attached_file( $attachment_id ));
	
}


?>
<Profile Version="1.23">
  <Object Name="PierryProduct360" Model="Cylindrical" Rows="1" Columns="24"  Width="<?php echo $size[0]?>" Height="<?php echo $size[1]?>" Inertia="True" FreeRotate="True">
    <Space Width="<?php echo $size[0]?>" Height="<?php echo $size[1]?>" />
    <Frame Draw="False" Style="NA" Attribute="NA" Color="Black" Background="FFFFFFFF" Width="4000" Height="4000" OffsetX="0" OffsetY="0" />
    <Controls Folder="<?php echo $button_theme?>" Left="<?php echo $button_offset?>" Bottom="50" Position="<?php echo $button_position?>" Dimension="<?php echo $button_size?>" Move="Hide" Zoom="Switch" Play="Toggle" Page="Hide" Show="False" AutoPlay="False" />
    <Description Work="9E58466757" UICulture="en-US" Application="NA"><?php echo $product_title?></Description>
    <Controller PhaseIn="0" Repeatness="False" RotateTime="40" Direction="CW" Flip="False" />
    <InitView Rows="1" Columns="4" Width="533" Height="800" ZoomMin="1" ZoomInit="10" ZoomMax="60" ZoomFactor="50" />
    <Image2D Number2D="3" />
  </Object>
</Profile>
