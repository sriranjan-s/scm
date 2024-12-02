package org.egov.infra.mdms.repository;

import java.util.List;

import org.egov.infra.mdms.dto.Organization;
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
	
	public List<Organization> fetchOrganization() {
		String query = "select * from eg_organizations";
		List<Organization> organizations = jdbcTemplate.query(query, organizationResultExtractor);
		return organizations;
	}

}
