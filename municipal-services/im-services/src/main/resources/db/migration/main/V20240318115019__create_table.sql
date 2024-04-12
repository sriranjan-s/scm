CREATE TABLE eg_incident_v2(

id                  character varying(64),
tenantId            character varying(256),
incidentType        character varying(256)  NOT NULL,
incidentId		    character varying(256),
description         character varying(4000) NOT NULL,
additionalDetails   JSONB,
applicationStatus   character varying(128),
rating              smallint,
createdby           character varying(256)  NOT NULL,
createdtime         bigint                  NOT NULL,
lastmodifiedby      character varying(256),
lastmodifiedtime    bigint,
CONSTRAINT uk_eg_incident_v2 UNIQUE (id),
CONSTRAINT pk_eg_incidentReq_v2 PRIMARY KEY (tenantId,incidentId)
);

CREATE TABLE eg_incident_address_v2 (

tenantId          CHARACTER VARYING(256)  NOT NULL,
id                CHARACTER VARYING(256)  NOT NULL,
parentid         	CHARACTER VARYING(256)  NOT NULL,
doorno            CHARACTER VARYING(128),
plotno            CHARACTER VARYING(256),
buildingName     	CHARACTER VARYING(1024),
street           	CHARACTER VARYING(1024),
landmark         	CHARACTER VARYING(1024),
city             	CHARACTER VARYING(512),
pincode          	CHARACTER VARYING(16),
locality         	CHARACTER VARYING(128)  NOT NULL,
district          CHARACTER VARYING(256),
region            CHARACTER VARYING(256),
state             CHARACTER VARYING(256),
country           CHARACTER VARYING(512),
latitude         	NUMERIC(9,6),
longitude        	NUMERIC(10,7),
createdby        	CHARACTER VARYING(128)  NOT NULL,
createdtime      	BIGINT NOT NULL,
lastmodifiedby   	CHARACTER VARYING(128),
lastmodifiedtime 	BIGINT,
additionaldetails JSONB,

CONSTRAINT pk_eg_incident_address_v2 PRIMARY KEY (id),
CONSTRAINT fk_eg_incident_address_v2 FOREIGN KEY (parentid) REFERENCES eg_incident_v2 (id)
);


