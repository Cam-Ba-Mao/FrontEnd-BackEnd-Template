<?php
    
/**
 * Get Categories
 *
 * @param string $orderBy
 * @param string $order
 * @param bool $hideEmpty
 * @return array|int|\WP_Error
 */
function getCategories($orderBy = 'term_order', $order = 'ASC', $hideEmpty = false)
{
    $categories = get_terms(array(
        'taxonomy' => 'car_cat',
        'orderby' => $orderBy,
        'order' => $order,
        'hide_empty' => $hideEmpty,
        'parent' => 0
    ));

    return $categories;
}