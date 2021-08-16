CREATE INDEX IF NOT EXISTS  idx_egbs_bill_v1_id ON pb.egbs_bill_v1 USING btree (id);
CREATE INDEX IF NOT EXISTS  idx_egbs_bill_v1_isactive ON pb.egbs_bill_v1 USING btree (isactive);
CREATE INDEX IF NOT EXISTS  idx_egbs_bill_v1_tenantid ON pb.egbs_bill_v1 USING btree (tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  pk_egbs_bill_v1 ON pb.egbs_bill_v1 USING btree (id, tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  pk_egbs_billaccountdetails_v1 ON pb.egbs_billaccountdetail_v1 USING btree (id, tenantid);
CREATE INDEX IF NOT EXISTS  idx_egbs_billdetail_v1_businessservice ON pb.egbs_billdetail_v1 USING btree (businessservice);
CREATE INDEX IF NOT EXISTS  idx_egbs_billdetail_v1_consumercode ON pb.egbs_billdetail_v1 USING btree (consumercode);
CREATE INDEX IF NOT EXISTS  idx_egbs_billdetail_v1_tenantid ON pb.egbs_billdetail_v1 USING btree (tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  pk_egbs_billdetail_v1 ON pb.egbs_billdetail_v1 USING btree (id, tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  pk_biz_srvc_det ON pb.egbs_business_service_details USING btree (id, tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  unq_businessservice ON pb.egbs_business_service_details USING btree (businessservice, tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  pk_egbs_collectedreceipts ON pb.egbs_collectedreceipts USING btree (id, tenantid);
CREATE INDEX IF NOT EXISTS  idx_egbs_demand_v1_businessservice ON pb.egbs_demand_v1 USING btree (businessservice);
CREATE INDEX IF NOT EXISTS  idx_egbs_demand_v1_consumercode ON pb.egbs_demand_v1 USING btree (consumercode);
CREATE INDEX IF NOT EXISTS  idx_egbs_demand_v1_consumertype ON pb.egbs_demand_v1 USING btree (consumertype);
CREATE INDEX IF NOT EXISTS  idx_egbs_demand_v1_id ON pb.egbs_demand_v1 USING btree (id);
CREATE INDEX IF NOT EXISTS  idx_egbs_demand_v1_payer ON pb.egbs_demand_v1 USING btree (payer);
CREATE INDEX IF NOT EXISTS  idx_egbs_demand_v1_taxperiodfrom ON pb.egbs_demand_v1 USING btree (taxperiodfrom);
CREATE INDEX IF NOT EXISTS  idx_egbs_demand_v1_taxperiodto ON pb.egbs_demand_v1 USING btree (taxperiodto);
CREATE INDEX IF NOT EXISTS  idx_egbs_demand_v1_tenantid ON pb.egbs_demand_v1 USING btree (tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  pk_egbs_demand_v1 ON pb.egbs_demand_v1 USING btree (id, tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  uk_egbs_demand_v1_consumercode_businessservice ON pb.egbs_demand_v1 USING btree (consumercode, tenantid, taxperiodfrom, taxperiodto, businessservice);
CREATE UNIQUE INDEX IF NOT EXISTS  pk_egbs_demand_v1_audit ON pb.egbs_demand_v1_audit USING btree (id, tenantid);
CREATE INDEX IF NOT EXISTS  idx_egbs_demanddetail_v1_demandid ON pb.egbs_demanddetail_v1 USING btree (demandid);
CREATE INDEX IF NOT EXISTS  idx_egbs_demanddetail_v1_tenantid ON pb.egbs_demanddetail_v1 USING btree (tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  pk_egbs_demanddetail_v1 ON pb.egbs_demanddetail_v1 USING btree (id, tenantid);
CREATE UNIQUE INDEX IF NOT EXISTS  pk_egbs_demanddetail_v1_audit ON pb.egbs_demanddetail_v1_audit USING btree (id, tenantid);
