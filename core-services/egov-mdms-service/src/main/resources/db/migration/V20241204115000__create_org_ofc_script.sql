CREATE TABLE IF NOT EXISTS eg_organizations(
id varying(5) primary key ,
code varying(100) NOT NULL,
name varying(200) NOT NULL,
description varying(500),
hod varying(100),
email_id varying(50),
telephone_number varying(20),
address varying(200),
district varying(100),
sub_district varying(100),
state varying(100),
pin varying(10),
status varying(20),
created_by varying(100),
created_date bigint,
last_modified_by varying(100),
last_modified_date bigint
);



CREATE TABLE IF NOT EXISTS eg_offices(
id varying(100) primary key,
organization_id  varying(100) NOT NULL,
code  varying(100) NOT NULL,
name  varying(100) NOT NULL,
description  varying(100),
email_id  varying(100),
telephone_number  varying(100),
Head_office_code  varying(100),
office_address  varying(100),
district  varying(100),
sub_district  varying(100),
state  varying(100),
pin  varying(100),
status  varying(100),
Head_office  boolean,
created_by varying(100),
created_date bigint,
last_modified_by varying(100),
last_modified_date bigint
);