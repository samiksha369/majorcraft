<?php
/* add extra section to theme cofiguration to let user specify phone number, email, etc */
add_action( 'customize_register' , 'pierryratings_customizer_register', 30, 1);
function pierryratings_customizer_register( $wp_customize ) {

    $wp_customize->add_setting('pierry_mc_address', array(
        'default'        =>  '225 W.190th St.Suite 250 | Gardena. CA90248',
        'type' =>			'option',
        'transport' =>		'refresh'
    ));

	$wp_customize->add_setting('pierry_mc_phone_number', array(
			'default'        =>  '(111)111-1111',
			'type' =>			'option',
			'transport' =>		'refresh'
	));

    $wp_customize->add_setting('pierry_mc_email', array(
        'default'        =>  'info@majorcraft-america.com',
        'type' =>			'option',
        'transport' =>		'refresh'
    ));

    $wp_customize->add_setting('pierry_mc_external_url', array(
        'default'        =>  'www.majorcraft-america.com',
        'type' =>			'option',
        'transport' =>		'refresh'
    ));

    $wp_customize->add_setting('pierry_mc_policy_link', array(
        'default'        =>  '/terms-and-conditions',
        'type' =>			'option',
        'transport' =>		'refresh'
    ));

	$wp_customize->add_section( 'pierry_mc_info', array(
			'priority'       => 2,
			'capability'     => 'edit_theme_options',
			'theme_supports' => '',
			'title'          => 'Your Company Info',
			'description'    => ''
	) );

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'pierry_mc_address',
            array(
                'label'          => __( 'Address'),
                'section'        => 'pierry_mc_info',
                'settings'       => 'pierry_mc_address',
                'type'           => 'text'
            )
        )
    );

	$wp_customize->add_control(
			new WP_Customize_Control(
					$wp_customize,
					'pierry_mc_phone_number',
					array(
							'label'          => __( 'Phone Number'),
							'section'        => 'pierry_mc_info',
							'settings'       => 'pierry_mc_phone_number',
							'type'           => 'text'
					)
			)
	);

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'pierry_mc_email',
            array(
                'label'          => __( 'Info Email'),
                'section'        => 'pierry_mc_info',
                'settings'       => 'pierry_mc_email',
                'type'           => 'text'
            )
        )
    );

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'pierry_mc_external_url',
            array(
                'label'          => __( 'External Site'),
                'section'        => 'pierry_mc_info',
                'settings'       => 'pierry_mc_external_url',
                'type'           => 'text'
            )
        )
    );

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'pierry_mc_policy_link',
            array(
                'label'          => __( 'Policy Link'),
                'section'        => 'pierry_mc_info',
                'settings'       => 'pierry_mc_policy_link',
                'type'           => 'text'
            )
        )
    );
}
