package org.egov.inbox.web.model.dss;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.Valid;
import java.util.Map;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RequestDto {

    @Valid
    @JsonProperty("tenantId")
    private String tenantId;

    @Valid
    @JsonProperty("module")
    private String module;
}
