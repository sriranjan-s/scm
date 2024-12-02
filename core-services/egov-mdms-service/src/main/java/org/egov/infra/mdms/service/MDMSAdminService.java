package org.egov.infra.mdms.service;

import java.util.List;

import org.egov.infra.mdms.dto.Organization;
import org.egov.infra.mdms.repository.MDMSAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;

@Service
@Slf4j
public class MDMSAdminService {
	
	@Autowired
	private MDMSAdminRepository adminRepository;

	public JSONArray getOrganization() {
		List<Organization> organizations = adminRepository.fetchOrganization();
		return JsonPath.read(JSONArray.toJSONString(organizations),"$");
	}
}
