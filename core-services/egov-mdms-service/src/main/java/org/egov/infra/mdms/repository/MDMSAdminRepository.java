package org.egov.infra.mdms.repository;

import java.util.List;

import org.egov.infra.mdms.dto.Office;
import org.egov.infra.mdms.dto.Organization;
import org.egov.infra.mdms.repository.rowMapper.OfficeResultExtractor;
import org.egov.infra.mdms.repository.rowMapper.OrganizationResultExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class MDMSAdminRepository {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private OrganizationResultExtractor organizationResultExtractor;
	
	@Autowired
	private OfficeResultExtractor officeResultExtractor;
	
	public List<Organization> fetchOrganization() {
		String query = "select id, code, name, description, hod, email_id, telephone_number, address, district, sub_district, state, pin, status from eg_organizations";
		List<Organization> organizations = jdbcTemplate.query(query, organizationResultExtractor);
		return organizations;
	}

	public List<Office> fetchOffice() {
		String query = "select id, code, organization_id, name, description, email_id, telephone_number, office_address, district, sub_district, state, pin, status, Head_office_code, Head_office from eg_offices";
		List<Office> offices = jdbcTemplate.query(query, officeResultExtractor);
		return offices;
	}

}
