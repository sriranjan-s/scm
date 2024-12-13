import { Request } from "../atoms/Utils/Request";
import Urls from "../atoms/urls";

const AccessControlService = {
  getAccessControl: (roles = []) =>
    Request({
      url: Urls.access_control,
      method: "POST",
      auth: true,
      useCache: false,
      userService: true,
      data: {
        roleCodes: roles,
        tenantId: Digit.ULBService.getCurrentTenantId(),
        actionMaster: "actions-test",
        enabled: true,
      },
      reqTimestamp: true,
    }),
};
export default AccessControlService;
