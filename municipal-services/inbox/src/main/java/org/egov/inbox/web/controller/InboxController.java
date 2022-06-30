package org.egov.inbox.web.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.egov.inbox.service.DSSInboxFilterService;
import org.egov.inbox.service.InboxService;
import org.egov.inbox.web.model.Inbox;
import org.egov.inbox.web.model.InboxRequest;
import org.egov.inbox.web.model.InboxResponse;
import org.egov.inbox.web.model.InboxSearchCriteria;
import org.egov.inbox.web.model.RequestInfoWrapper;
import org.egov.inbox.util.ResponseInfoFactory;
import org.egov.inbox.web.model.dss.RequestDto;
import org.egov.inbox.web.model.dss.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Home redirection to swagger api documentation 
 */
@RestController
@RequestMapping("/v1")
public class InboxController {
	
	@Autowired
	private InboxService inboxService;

	@Autowired
	private DSSInboxFilterService dssInboxService;

	@Autowired
	private ResponseInfoFactory responseInfoFactory;
	
	
	@PostMapping(value = "/_search")
	public ResponseEntity<InboxResponse> search(@Valid @RequestBody  InboxRequest inboxRequest) {
		
		InboxResponse response = inboxService.fetchInboxData(inboxRequest.getInbox(),inboxRequest.getRequestInfo());
		
		response.setResponseInfo(
				responseInfoFactory.createResponseInfoFromRequestInfo(inboxRequest.getRequestInfo(), true));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping(value = "/dss/_search")
	public ResponseEntity<Map<String, BigDecimal>> getChartV2(@Valid @RequestBody RequestDto request) {
		Map<String, BigDecimal> response = dssInboxService.getAggregateData(request);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
}
