-- users table
      CREATE TABLE users
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1000 ),
    user_name text NOT NULL,
    user_email text NOT NULL UNIQUE,
    user_password text NOT NULL,
    user_type text NOT NULL,
    user_gender text ,
    user_phone integer ,
    isDeleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (user_id)
);

-- create  hotel table

CREATE TABLE hotelInfo(
    hotel_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1000 ),
    hotel_name VARCHAR(255) NOT NULL,
    descriptions VARCHAR(500) NOT NULL,
    city VARCHAR(75) NOT NULL,
    phoneHotel NUMERIC NOT NULL,
    stars NUMERIC,
    imageHotel text NOT NULL,
    is_deleted boolean NOT NULL DEFAULT false,
    is_accept boolean NOT NULL DEFAULT false,
    user_id INT ,
    PRIMARY KEY (hotel_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) 
)


CREATE TABLE roominfo
(
    room_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1000 ),
    room_type  VARCHAR(75) NOT NULL ,
    number_of_room NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    number_of_beds NUMERIC NOT NULL,
    floor_area NUMERIC NOT NULL,
    descriptions VARCHAR(500) NOT NULL,
    room_img text[] NOT NULL,
    number_of_guests NUMERIC NOT NULL,
    hotel_id INT ,
    is_available boolean NOT NULL DEFAULT true,
    PRIMARY KEY (room_id),
    FOREIGN KEY (hotel_id) REFERENCES hotelinfo (hotel_id)
);

-------------------Payment Table------------------
CREATE TABLE paymentinfo
(
    user_id integer,
    payment_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1000 ),
    card_name text NOT NULL,
    card_number text NOT NULL,
    expiration_date date NOT NULL,
    security_code text NOT NULL,
    PRIMARY KEY (payment_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);


CREATE TABLE bookinginfo
(
    user_id integer NOT NULL,
    hotel_id integer NOT NULL,
    room_id integer NOT NULL,
    booking_date date NOT NULLو
     FOREIGN KEY (user_id) REFERENCES users (user_id),
     FOREIGN KEY (hotel_id) REFERENCES hotelinfo(hotel_id),
     FOREIGN KEY (room_id) REFERENCES roominfo(room_id)
);