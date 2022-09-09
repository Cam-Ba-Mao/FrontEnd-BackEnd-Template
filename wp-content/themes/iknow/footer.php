<?php
/**
 * the closing of the main content elements and the footer element
 *
 * @package WordPress
 * @subpackage Iknow
 * @since Iknow 1.0
 */
?>

	</div>
	<!-- END BODY -->

<?php if ( ! is_404() ) : ?>
    <footer class="footer has-background-grey-darker">
        <div class="container is-size-7">
            <div class="columns">
                <div class="column is-fullwidth has-text-centered has-text-white has-text-weight-semibold">&copy; <?php echo esc_attr ( date_i18n( esc_attr__( 'Y' , 'iknow' ) ) ); ?> <a href="<?php echo esc_url( site_url() ); ?>" title="" target="_blank"><?php bloginfo( 'name' ); ?></a>. <?php echo esc_attr__( 'All rights reserved.', 'iknow' ); ?></div>
            </div>
        </div>
    </footer>
<?php endif; ?>

</div>
<!-- END HOLDER -->
<script src="https://apis.google.com/js/client:platform.js"></script>
<?php wp_footer(); ?>
</body>
</html>