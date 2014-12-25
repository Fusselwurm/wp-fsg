<?php
/*
* Plugin Name: Fucking Simple Gallery
* Description: Hacky as hell. For it to work: include underscorejs, execute <code>fusselGalleryHack()</code> somewhere on page. For it to work with the <em>Grid Gallery</em>: deactivate the colorbox call in <code>wp-content/plugins/grid-gallery-ready/src/GirdGallery/Galleries/views/shortcode/gallery.twig</code> , call <code>fusselGalleryHack</code> in <code>wp-content/plugins/grid-gallery-ready/src/GirdGallery/Galleries/assets/js/frontend.js</code> after gallery initialization
* Version: 0.1
* Author: Fusselwurm
* License: GPLv2
* */

$fsg_version = '2014-12-25_1';

wp_register_script('fsg-script', plugins_url('/plugin.js', __FILE__ ), [], $fsg_version, true);
wp_enqueue_script('fsg-script');

wp_register_style('fsg-style', plugins_url( '/styles.css', __FILE__ ), [], $fsg_version);
wp_enqueue_style('fsg-style');
