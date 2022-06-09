package org.egov.swservice.web.models;

import java.util.List;
import java.util.Set;

import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchCriteria {

	@JsonProperty("tenantId")
	private String tenantId;

	@JsonProperty("status")
	private String status;
	
	private Set<String> propertyIds;
	
	private Set<String> userIds;

	@JsonProperty("ids")
	private Set<String> ids;

	@JsonProperty("applicationNumber")
	private Set<String> applicationNumber;
	
	@JsonProperty("connectionNumber")
	private Set<String> connectionNumber;

	@JsonProperty("oldConnectionNumber")
	private String oldConnectionNumber;
		
	@JsonProperty("applicationStatus")
	private Set<String> applicationStatus;

	@JsonProperty("mobileNumber")
	private String mobileNumber;
	
	@JsonProperty("propertyId")
	private String propertyId;

	@JsonIgnore
	private String accountId;

	@JsonProperty("fromDate")
	private Long fromDate = null;

	@JsonProperty("toDate")
	private Long toDate = null;

	@JsonProperty("offset")
	private Integer offset;

	@JsonProperty("limit")
	private Integer limit;
	
	@JsonProperty("applicationType")
	private String applicationType;

	@JsonProperty("searchType")
	private String searchType = "APPLICATION";

	@JsonProperty("locality")
	private String locality;

	@JsonProperty("isPropertyDetailsRequired")
	private Boolean isPropertyDetailsRequired = false;


	@JsonIgnore
	private List<String> ownerIds;

	@JsonProperty("doorNo")
	private String doorNo;
	
	@JsonProperty("ownerName")
	private String ownerName;
	
	@JsonProperty("assignee")
	private String assignee;

	@JsonIgnore
	private Boolean isCountCall = false;

	public boolean isEmpty() {
		return (StringUtils.isEmpty(this.tenantId) && StringUtils.isEmpty(this.mobileNumber)
				&& StringUtils.isEmpty(this.propertyId) && CollectionUtils.isEmpty(this.ids)
				&& StringUtils.isEmpty(this.oldConnectionNumber) && StringUtils.isEmpty(this.connectionNumber)
				&& StringUtils.isEmpty(this.status) && StringUtils.isEmpty(this.applicationNumber)
				&& StringUtils.isEmpty(this.applicationStatus) && StringUtils.isEmpty(this.fromDate)
				&& StringUtils.isEmpty(this.toDate) && StringUtils.isEmpty(this.applicationType)
				&& StringUtils.isEmpty(this.doorNo) && StringUtils.isEmpty(this.ownerName))
				&& StringUtils.isEmpty(this.assignee);
	}

	public boolean tenantIdOnly() {
		return (this.tenantId != null && this.status == null && this.ids == null && this.applicationNumber == null
				&& this.connectionNumber == null && this.oldConnectionNumber == null && this.mobileNumber == null
				&& this.fromDate == null && this.toDate == null && this.ownerIds == null && this.propertyId == null
				&& this.applicationType == null && this.doorNo == null && this.ownerName == null
				&& this.assignee == null);
	}

}
