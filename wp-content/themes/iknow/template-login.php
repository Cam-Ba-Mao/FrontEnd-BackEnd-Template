<?php
/**
 * Template Name: Login page
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
<section class="iedg-login section">
	<div class="container"> 
		<h1 class="iedg-title"><?php the_title(); ?></h1>
		<div class="columns is-multiline"> 
			<div class="column is-half-desktop">
				<div class="iedg-login__google-btn">
					<a href="#" id="iedg-btn-google-login">
						<div class="google-icon-wrapper">
							<img class="google-icon" src="<?= get_template_directory_uri(); ?>/assets/images/login/google.svg"/>
						</div>
						<p class="btn-text"><b><?php _e('Đăng nhập bằng google','iknow');?></b></p>
					</a>
				</div>
				
				<div class="iedg-login__message"> 
                </div>
			</div>
		</div>
	</div>
</section>
<section class="message-google-login d-none">
    <div class="message-google-login-content">
        <p><?php _e('Chỉ chấp nhận với email','iknow');?></p>
        <ul> 
            <li>@indochinagroup.edu.vn</li>
            <li>@wass.edu.vn</li>
            <li>@pennschool.edu.vn</li>
            <li>@amcollege.edu.vn</li>
            <li>@dongduong.edu.vn</li>
            <li>@tils.edu.vn</li>
            <li>@icsa.edu.vn</li>
            <li>@iabm.edu.vn</li>
            <li>@indochinagroup.de</li>
            <li>@aedg.us</li>
        </ul>
    </div>
</section>

<?php get_footer();