<?php
/**
 * Template Name: Iknow Home
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @package Iknow
 * @subpackage Iknow
 * @since Iknow 1.0
 */

get_header(); ?>
<section class="hero is-primary">
	<div class="hero-body">
		<div class="container has-text-centered">
			<h1 class="title is-1 is-family-secondary site-name"><?php echo esc_attr__( 'Help Center', 'iknow' ); ?></h1>
			<!--<h2 class="subtitle site-description"><?php echo esc_html( get_bloginfo( 'description' ) ); ?></h2>-->
			<?php get_search_form(); ?>
		</div>
	</div>
</section>

<section class="section" id="content">
	<div class="container">
		<?php while ( have_posts() ) : the_post(); ?>
		<?php if ( !empty(get_the_content()) ): ?>
            <div class="content">
				<?php the_content(); ?>
            </div>
		<?php endif; ?>
		<?php endwhile; // end of the loop. ?>
		<div class="columns is-multiline">
			<?php iknow_get_home_posts(); ?>
		</div>
	</div>
</section>

<section class="section" id="contact_section">
	<div class="container">
		<h1><?php echo esc_attr__( 'Can\'t find what you are looking for?', 'iknow' ); ?></h1>
		<?php if( function_exists( 'pll_get_post' ) ): ?>
		<a href="<?php echo esc_url( "https://ticket.indochinagroup.edu.vn" ); ?>" target="_blank" class="button is-success"><?php echo esc_attr__( 'Access Ticket Center', 'iknow' ); ?></a>
		<?php endif; ?>
	</div>
</section>
<?php get_footer();