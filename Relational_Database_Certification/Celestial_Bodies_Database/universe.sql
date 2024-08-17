CREATE TABLE galaxy (
    galaxy_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    age_in_million_years INT NOT NULL,
    galaxy_types VARCHAR(30) NOT NULL,
    size_in_light_years INT NOT NULL,
    star_population_in_millions INT NOT NULL
);
CREATE TABLE star (
    star_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    age_in_million_years INT NOT NULL,
    luminosity DECIMAL NOT NULL,
    temperature_in_K INT NOT NULL,
    spectral_type CHAR NOT NULL,
    radius_in_km INT NOT NULL,
    mass_in_kg DECIMAL NOT NULL,
    galaxy_id INT REFERENCES galaxy(galaxy_id) -- Use INT to match galaxy_id type
);
CREATE TABLE planet (
    planet_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    has_life BOOLEAN not null,
    age_in_million_years INT NOT NULL,
    radius_in_km INT NOT NULL,
    mass_in_kg DECIMAL NOT NULL,
    rotation_in_hours INT NOT NULL,
    star_id INT REFERENCES star(star_id) -- Use INT to match star_id type
);
CREATE TABLE moon (
    moon_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    radius_in_km INT NOT NULL,
    mass_in_kg DECIMAL NOT NULL,
    rotation_in_hours INT NOT NULL,
    planet_id INT REFERENCES planet(planet_id) -- Use INT to match planet_id type
);
CREATE TABLE exoplanet (
    exoplanet_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    distance_from_star_in_km DECIMAL not NULL,
    radius_in_km INT NOT NULL,
    mass_in_kg DECIMAL NOT NULL,
    orbital_period_in_days DECIMAL NOT NULL,
    star_id INT REFERENCES star(star_id)
);





INSERT INTO galaxy (
        name,
        description,
        age_in_million_years,
        galaxy_types,
        size_in_light_years,
        star_population_in_millions
    )
VALUES (
        'Milky Way',
        'A barred spiral galaxy.',
        13600,
        'Spiral',
        100000,
        250000
    ),
    (
        'Andromeda',
        'A spiral galaxy approximately 2.5 million light-years from Earth.',
        10000,
        'Spiral',
        220000,
        1000000
    ),
    (
        'Triangulum',
        'A spiral galaxy in the constellation Triangulum.',
        10000,
        'Spiral',
        60000,
        40000
    ),
    (
        'Whirlpool',
        'A classic spiral galaxy.',
        500,
        'Spiral',
        60000,
        160000
    );
-- Milky Way Galaxy
INSERT INTO star (
        name,
        description,
        age_in_million_years,
        luminosity,
        temperature_in_K,
        spectral_type,
        radius_in_km,
        mass_in_kg,
        galaxy_id
    )
VALUES (
        'Alpha Centauri A',
        'Main-sequence star of spectral type G2V, similar to the Sun.',
        5300,
        1519,
        5793,
        'G',
        696340,
        1.1 * 1.989e30,
        1
    ),
    (
        'Alpha Centauri B',
        'A main-sequence star of spectral type K1V.',
        5300,
        500,
        5260,
        'K',
        601000,
        0.9 * 1.989e30,
        1
    );
-- Andromeda Galaxy
INSERT INTO star (
        name,
        description,
        age_in_million_years,
        luminosity,
        temperature_in_K,
        spectral_type,
        radius_in_km,
        mass_in_kg,
        galaxy_id
    )
VALUES (
        'Alpheratz',
        'Binary star, the brightest in the constellation Andromeda.',
        200,
        200 * 3.828e26,
        13000,
        'B',
        3.8 * 696340,
        3.6 * 1.989e30,
        2
    ),
    (
        'Mirach',
        'A red giant star in the constellation Andromeda.',
        7900,
        1900 * 3.828e26,
        3848,
        'M',
        100 * 696340,
        2.5 * 1.989e30,
        2
    );
-- Triangulum Galaxy (M33)
INSERT INTO star (
        name,
        description,
        age_in_million_years,
        luminosity,
        temperature_in_K,
        spectral_type,
        radius_in_km,
        mass_in_kg,
        galaxy_id
    )
VALUES (
        'HD 9446',
        'A main-sequence star.',
        1300,
        0.7 * 3.828e26,
        5620,
        'G',
        0.9 * 696340,
        0.9 * 1.989e30,
        3
    ),
    (
        'HD 9481',
        'An evolved giant star.',
        4400,
        40 * 3.828e26,
        4900,
        'K',
        12 * 696340,
        2.5 * 1.989e30,
        3
    );
-- Whirlpool Galaxy (M51)
INSERT INTO star (
        name,
        description,
        age_in_million_years,
        luminosity,
        temperature_in_K,
        spectral_type,
        radius_in_km,
        mass_in_kg,
        galaxy_id
    )
VALUES (
        'HD 155358',
        'Metal-poor main-sequence star.',
        9700,
        0.6 * 3.828e26,
        5300,
        'G',
        0.8 * 696340,
        0.87 * 1.989e30,
        4
    ),
    (
        'HD 155358 B',
        'Companion star in a binary system.',
        9700,
        0.35 * 3.828e26,
        4900,
        'K',
        0.6 * 696340,
        0.6 * 1.989e30,
        4
    );
-- Planets for Alpha Centauri A
INSERT INTO planet (
        name,
        description,
        has_life,
        age_in_million_years,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        star_id
    )
VALUES (
        'Proxima Centauri b',
        'Rocky exoplanet in the habitable zone.',
        FALSE,
        5000,
        6371,
        1.27 * 5.972e24,
        268.8,
        1
    ),
    (
        'Alpha Centauri Bb',
        'Hypothetical rocky planet.',
        FALSE,
        5300,
        5500,
        1.1 * 5.972e24,
        192,
        1
    );
-- Planets for Alpha Centauri B
INSERT INTO planet (
        name,
        description,
        has_life,
        age_in_million_years,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        star_id
    )
VALUES (
        'Alpha Centauri Bc',
        'Potentially a terrestrial planet.',
        FALSE,
        4000,
        6371,
        0.9 * 5.972e24,
        310,
        2
    ),
    (
        'Alpha Centauri Bd',
        'Hypothetical planet in a distant orbit.',
        FALSE,
        4000,
        7000,
        1.2 * 5.972e24,
        500,
        2
    );
-- Planets for Alpheratz
INSERT INTO planet (
        name,
        description,
        has_life,
        age_in_million_years,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        star_id
    )
VALUES (
        'Alpheratz I',
        'A gas giant planet.',
        FALSE,
        200,
        70000,
        317.8 * 5.972e24,
        10,
        3
    ),
    (
        'Alpheratz II',
        'A terrestrial planet.',
        FALSE,
        1000,
        6371,
        0.9 * 5.972e24,
        30,
        3
    );
-- Planets for Mirach
INSERT INTO planet (
        name,
        description,
        has_life,
        age_in_million_years,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        star_id
    )
VALUES (
        'Mirach b',
        'A hypothetical planet.',
        FALSE,
        500,
        20000,
        2 * 5.972e24,
        50,
        4
    ),
    (
        'Mirach c',
        'Another hypothetical planet.',
        FALSE,
        500,
        25000,
        3 * 5.972e24,
        24,
        4
    );
-- Planets for HD 9446
INSERT INTO planet (
        name,
        description,
        has_life,
        age_in_million_years,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        star_id
    )
VALUES (
        'HD 9446 b',
        'Gaseous exoplanet.',
        FALSE,
        2000,
        50000,
        4 * 5.972e24,
        20,
        5
    ),
    (
        'HD 9446 c',
        'Rocky exoplanet with a thin atmosphere.',
        FALSE,
        1500,
        6000,
        2.5 * 5.972e24,
        40,
        5
    );
-- Planets for HD 9481
INSERT INTO planet (
        name,
        description,
        has_life,
        age_in_million_years,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        star_id
    )
VALUES (
        'HD 9481 b',
        'Ice giant with a thick atmosphere.',
        FALSE,
        4000,
        25000,
        4 * 5.972e24,
        15,
        6
    ),
    (
        'HD 9481 c',
        'Desert-like planet with extreme temperatures.',
        FALSE,
        3200,
        4500,
        3.5 * 5.972e24,
        25,
        6
    );
-- Planets for HD 155358
INSERT INTO planet (
        name,
        description,
        has_life,
        age_in_million_years,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        star_id
    )
VALUES (
        'HD 155358 b',
        'Gas giant with strong winds.',
        FALSE,
        5000,
        72000,
        5 * 5.972e24,
        12,
        7
    ),
    (
        'HD 155358 c',
        'Rocky planet with volcanic activity.',
        FALSE,
        3500,
        8000,
        3 * 5.972e24,
        48,
        7
    );
-- Planets for HD 155358 B
INSERT INTO planet (
        name,
        description,
        has_life,
        age_in_million_years,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        star_id
    )
VALUES (
        'HD 155358 B b',
        'Small planet with a dense atmosphere.',
        FALSE,
        3000,
        5000,
        2 * 5.972e24,
        30,
        8
    ),
    (
        'HD 155358 B c',
        'Rocky planet with a ring system.',
        FALSE,
        2900,
        6000,
        2.8 * 5.972e24,
        18,
        8
    );
-- Moons for Proxima Centauri b
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Alpha',
        'Small rocky moon.',
        1500,
        7.35e22,
        27.3,
        1
    ),
    (
        'Moon Beta',
        'Another small rocky moon.',
        1600,
        7.8e22,
        25.0,
        1
    );
-- Moons for Alpha Centauri Bb
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Gamma',
        'Rocky moon with a thin atmosphere.',
        1700,
        8.2e22,
        29.5,
        2
    ),
    (
        'Moon Delta',
        'Cratered moon with no atmosphere.',
        1400,
        6.7e22,
        24.8,
        2
    );
-- Moons for Alpha Centauri Bc
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Epsilon',
        'Icy moon with a subsurface ocean.',
        1800,
        9.0e22,
        26.7,
        3
    ),
    (
        'Moon Zeta',
        'Moon with a thin atmosphere.',
        1500,
        7.0e22,
        22.3,
        3
    );
-- Moons for Alpha Centauri Bd
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Eta',
        'Moon with high volcanic activity.',
        1600,
        8.5e22,
        28.4,
        4
    ),
    (
        'Moon Theta',
        'Icy moon with geysers.',
        1700,
        7.9e22,
        30.2,
        4
    );
-- Moons for Alpheratz I
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Iota',
        'Large moon with an iron core.',
        3000,
        1.5e23,
        40.0,
        5
    ),
    (
        'Moon Kappa',
        'Moon with a thick atmosphere.',
        3200,
        1.6e23,
        37.0,
        5
    );
-- Moons for Alpheratz II
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Lambda',
        'Moon with tectonic activity.',
        2800,
        1.4e23,
        33.5,
        6
    ),
    (
        'Moon Mu',
        'Moon with subsurface lakes.',
        2600,
        1.3e23,
        35.0,
        6
    );
-- Moons for Mirach b
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Nu',
        'Moon with a dense atmosphere.',
        2900,
        1.4e23,
        36.8,
        7
    ),
    (
        'Moon Xi',
        'Rocky moon with large craters.',
        2700,
        1.3e23,
        39.4,
        7
    );
-- Moons for Mirach c
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Omicron',
        'Icy moon with a thin atmosphere.',
        2500,
        1.2e23,
        30.6,
        8
    ),
    (
        'Moon Pi',
        'Volcanically active moon.',
        2400,
        1.1e23,
        32.4,
        8
    );
-- Moons for HD 9446 b
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Rho',
        'Large icy moon.',
        2100,
        9.8e22,
        28.0,
        9
    ),
    (
        'Moon Sigma',
        'Moon with significant cratering.',
        2200,
        1.0e23,
        26.0,
        9
    );
-- Moons for HD 9446 c
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Tau',
        'Moon with a thin atmosphere.',
        2300,
        1.1e23,
        24.7,
        10
    ),
    (
        'Moon Upsilon',
        'Moon with large polar ice caps.',
        2400,
        1.2e23,
        23.0,
        10
    );
-- Moons for HD 9481 b
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Phi',
        'Rocky moon with tectonic activity.',
        2600,
        1.3e23,
        27.0,
        11
    ),
    (
        'Moon Chi',
        'Icy moon with subsurface oceans.',
        2700,
        1.4e23,
        25.5,
        11
    );
-- Moons for HD 9481 c
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Psi',
        'Moon with a thick atmosphere.',
        2800,
        1.5e23,
        29.3,
        12
    ),
    (
        'Moon Omega',
        'Moon with a liquid water surface.',
        2900,
        1.6e23,
        31.7,
        12
    );
-- Moons for HD 155358 b
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Alpha1',
        'Rocky moon with a dense core.',
        1700,
        8.0e22,
        26.0,
        13
    ),
    (
        'Moon Beta1',
        'Moon with a significant iron content.',
        1800,
        8.5e22,
        28.0,
        13
    );
-- Moons for HD 155358 c
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Gamma1',
        'Icy moon with a thin atmosphere.',
        1900,
        9.0e22,
        25.0,
        14
    ),
    (
        'Moon Delta1',
        'Moon with an active surface.',
        1600,
        7.5e22,
        27.5,
        14
    );
-- Moons for HD 155358 B b
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Epsilon1',
        'Moon with a large canyon system.',
        2000,
        1.0e23,
        24.0,
        15
    ),
    (
        'Moon Zeta1',
        'Volcanically active moon.',
        2100,
        1.1e23,
        29.0,
        15
    );
-- Moons for HD 155358 B c
INSERT INTO moon (
        name,
        description,
        radius_in_km,
        mass_in_kg,
        rotation_in_hours,
        planet_id
    )
VALUES (
        'Moon Eta1',
        'Moon with a thick atmosphere.',
        2200,
        1.2e23,
        30.0,
        16
    ),
    (
        'Moon Theta1',
        'Icy moon with geysers.',
        2300,
        1.3e23,
        27.0,
        16
    );
-- Exoplanets for Alpha Centauri A
INSERT INTO exoplanet (
        name,
        description,
        distance_from_star_in_km,
        orbital_period_in_days,
        mass_in_kg,
        radius_in_km,
        star_id
    )
VALUES (
        'Proxima Centauri b',
        'An Earth-sized exoplanet orbiting in the habitable zone.',
        7.5e10,
        11.2,
        1.27 * 5.972e24,
        6371,
        1
    ),
    (
        'Alpha Centauri Bb',
        'A rocky planet, similar to Earth.',
        1.4e10,
        3.2,
        0.9 * 5.972e24,
        6051,
        1
    );
-- Exoplanets for Alpha Centauri B
INSERT INTO exoplanet (
        name,
        description,
        distance_from_star_in_km,
        orbital_period_in_days,
        mass_in_kg,
        radius_in_km,
        star_id
    )
VALUES (
        'Alpha Centauri Bc',
        'A planet orbiting close to its star.',
        2.0e10,
        6.7,
        0.8 * 5.972e24,
        6200,
        2
    ),
    (
        'Alpha Centauri Bd',
        'A hot Jupiter-type exoplanet.',
        5.2e10,
        11.0,
        1.9 * 1.898e27,
        71492,
        2
    );
-- Exoplanets for Alpheratz
INSERT INTO exoplanet (
        name,
        description,
        distance_from_star_in_km,
        orbital_period_in_days,
        mass_in_kg,
        radius_in_km,
        star_id
    )
VALUES (
        'Alpheratz I',
        'Gas giant with a massive atmosphere.',
        3.0e10,
        3.0,
        1.0 * 1.898e27,
        71492,
        5
    ),
    (
        'Alpheratz II',
        'Earth-like planet with potential for life.',
        4.0e10,
        6.5,
        1.0 * 5.972e24,
        6371,
        5
    );
-- Exoplanets for Mirach
INSERT INTO exoplanet (
        name,
        description,
        distance_from_star_in_km,
        orbital_period_in_days,
        mass_in_kg,
        radius_in_km,
        star_id
    )
VALUES (
        'Mirach b',
        'Large rocky planet with a thin atmosphere.',
        5.0e10,
        8.4,
        2.0 * 5.972e24,
        7000,
        7
    ),
    (
        'Mirach c',
        'Icy planet orbiting far from its star.',
        6.5e10,
        12.3,
        0.7 * 5.972e24,
        5875,
        7
    );
-- Exoplanets for HD 9446
INSERT INTO exoplanet (
        name,
        description,
        distance_from_star_in_km,
        orbital_period_in_days,
        mass_in_kg,
        radius_in_km,
        star_id
    )
VALUES (
        'HD 9446 b',
        'Gas giant with a thick atmosphere.',
        1.0e11,
        12.0,
        1.5 * 1.898e27,
        71492,
        6
    ),
    (
        'HD 9446 c',
        'Terrestrial planet with a rocky surface.',
        2.0e11,
        8.9,
        1.1 * 5.972e24,
        6500,
        6
    );
-- Exoplanets for HD 9481
INSERT INTO exoplanet (
        name,
        description,
        distance_from_star_in_km,
        orbital_period_in_days,
        mass_in_kg,
        radius_in_km,
        star_id
    )
VALUES (
        'HD 9481 b',
        'Ice giant with a dense core.',
        3.5e10,
        9.1,
        0.6 * 8.681e25,
        24622,
        3
    ),
    (
        'HD 9481 c',
        'Rocky planet with a thin atmosphere.',
        4.5e10,
        15.2,
        0.9 * 5.972e24,
        6200,
        3
    );
-- Exoplanets for HD 155358
INSERT INTO exoplanet (
        name,
        description,
        distance_from_star_in_km,
        orbital_period_in_days,
        mass_in_kg,
        radius_in_km,
        star_id
    )
VALUES (
        'HD 155358 b',
        'Hot Jupiter-type exoplanet.',
        4.5e10,
        7.0,
        1.2 * 1.898e27,
        71492,
        4
    ),
    (
        'HD 155358 c',
        'Super-Earth with a rocky surface.',
        5.8e10,
        10.3,
        1.2 * 5.972e24,
        6900,
        4
    );
-- Exoplanets for HD 155358 B
INSERT INTO exoplanet (
        name,
        description,
        distance_from_star_in_km,
        orbital_period_in_days,
        mass_in_kg,
        radius_in_km,
        star_id
    )
VALUES (
        'HD 155358 B b',
        'Large gas giant with a thick atmosphere.',
        6.0e10,
        14.5,
        2.0 * 1.898e27,
        71492,
        8
    ),
    (
        'HD 155358 B c',
        'Terrestrial planet with potential for liquid water.',
        7.0e10,
        18.9,
        1.5 * 5.972e24,
        6700,
        8
    );