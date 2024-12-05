package org.egov.infra.mdms.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import org.egov.infra.mdms.dto.Office;
import org.egov.infra.mdms.dto.Organization;
import org.egov.infra.mdms.model.EntityRequest;
import org.egov.infra.mdms.repository.rowMapper.OfficeResultExtractor;
import org.egov.infra.mdms.repository.rowMapper.OrganizationResultExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
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

	public void createOffice(EntityRequest request) {
		String query = "INSERT INTO public.eg_offices"
				+ "(organization_id, code, name, description, email_id, telephone_number, head_office_code, office_address, district, sub_district, state, pin, status, head_office)"
				+ "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

		jdbcTemplate.batchUpdate(query, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				Office office = request.getOffices().get(i);
				ps.setString(2, office.getOrganizationId());
				ps.setString(3, office.getCode());
				ps.setString(4, office.getName());
				ps.setString(5, office.getDescription());
				ps.setString(6, office.getEmailId());
				ps.setString(7, office.getTelephoneNumber());
				ps.setString(8, office.getHeadOfficeCode());
				ps.setString(9, office.getOfficeAddress());
				ps.setString(10, office.getDistrict());
				ps.setString(11, office.getSubDistrict());
				ps.setString(12, office.getState());
				ps.setString(13, office.getPin());
				ps.setString(14, office.getStatus());
				ps.setBoolean(15, office.isHeadOffice());
			}

			@Override
			public int getBatchSize() {
				return request.getOffices().size();
			}
		});
	}

	public void createOrganization(EntityRequest request) {
		String query = "INSERT INTO public.eg_organizations"
				+ "(code, name, description, hod, email_id, telephone_number, address, district, sub_district, state, pin, status)"
				+ "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

		jdbcTemplate.batchUpdate(query, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				Organization org = request.getOrganizations().get(i);

				ps.setString(2, org.getCode());
				ps.setString(3, org.getName());
				ps.setString(4, org.getDescription());
				ps.setString(5, org.getHod());
				ps.setString(6, org.getEmailId());
				ps.setString(7, org.getTelephoneNumber());
				ps.setString(8, org.getAddress());
				ps.setString(9, org.getDistrict());
				ps.setString(10, org.getSubDistrict());
				ps.setString(11, org.getState());
				ps.setString(12, org.getPin());
				ps.setString(13, org.getStatus());
			}

			@Override
			public int getBatchSize() {
				return request.getOrganizations().size();
			}
		});
	}

	public void updateOrganization(EntityRequest request) {
		String query = "UPDATE public.eg_organizations"
				+ "SET code=?, name=?, description=?, hod=?, email_id=?, telephone_number=?, address=?, district=?', sub_district=?, state=?, pin=?, status=?"
				+ "WHERE id=?";

		jdbcTemplate.batchUpdate(query, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				Organization org = request.getOrganizations().get(i);

				ps.setString(2, org.getCode());
				ps.setString(3, org.getName());
				ps.setString(4, org.getDescription());
				ps.setString(5, org.getHod());
				ps.setString(6, org.getEmailId());
				ps.setString(7, org.getTelephoneNumber());
				ps.setString(8, org.getAddress());
				ps.setString(9, org.getDistrict());
				ps.setString(10, org.getSubDistrict());
				ps.setString(11, org.getState());
				ps.setString(12, org.getPin());
				ps.setString(13, org.getStatus());
				ps.setLong(14, org.getId());
			}

			@Override
			public int getBatchSize() {
				return request.getOrganizations().size();
			}
		});

	}

	public void updateOffice(EntityRequest request) {
		String query = "UPDATE public.eg_offices"
				+ " SET organization_id=?, code=?, name=?, description=?, email_id=?, telephone_number=?, head_office_code=?, office_address=?, district=?, sub_district=?, state=?, pin=?, status=?, head_office=?"
				+ " WHERE id=?";

		jdbcTemplate.batchUpdate(query, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				Office office = request.getOffices().get(i);
				ps.setString(2, office.getOrganizationId());
				ps.setString(3, office.getCode());
				ps.setString(4, office.getName());
				ps.setString(5, office.getDescription());
				ps.setString(6, office.getEmailId());
				ps.setString(7, office.getTelephoneNumber());
				ps.setString(8, office.getHeadOfficeCode());
				ps.setString(9, office.getOfficeAddress());
				ps.setString(10, office.getDistrict());
				ps.setString(11, office.getSubDistrict());
				ps.setString(12, office.getState());
				ps.setString(13, office.getPin());
				ps.setString(14, office.getStatus());
				ps.setBoolean(15, office.isHeadOffice());
				ps.setLong(16, office.getId());
			}

			@Override
			public int getBatchSize() {
				return request.getOffices().size();
			}
		});

	}

}
