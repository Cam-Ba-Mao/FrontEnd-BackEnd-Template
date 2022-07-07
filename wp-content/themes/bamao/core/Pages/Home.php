<?php 

    add_action('iedg_content_home_page',  'contentHome');        
    

    /**
     * Content Car Cat
     * @param $id
     */
    function contentHome($id)
    {
        $options = get_fields('option');
        if (empty($options)) {
            $options = [];
        }

        $data = get_fields($id);
        if (empty($data)) {
            $data = [];
        }
        $data = array_merge($options, $data);

        set_query_var('data', $data);
        echo "Home";
        get_template_part('templates/home/home'); 
    }