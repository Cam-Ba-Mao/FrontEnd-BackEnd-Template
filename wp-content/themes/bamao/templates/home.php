<?php
    /* 
    Template Name: Contact
    */
    $data['categories'] = getCategories('term_order', 'ASC', 'false');
	// dd($data['categories'] );
?>

<?php get_header(); ?>
<h1>Trang chủ</h1>
<?php foreach($data['categories'] as $cat ): ?>
    <a href="<?= get_term_link($cat); ?>"><?= $cat->name; ?></a>
<?php endforeach; ?>
<?php get_footer(); ?>
