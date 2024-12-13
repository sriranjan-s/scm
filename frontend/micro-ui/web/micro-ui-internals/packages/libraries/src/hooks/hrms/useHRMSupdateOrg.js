import { useQuery, useMutation } from "react-query";
import HrmsService from "../../services/elements/HRMS";

export const useHRMSUpdateOrg = (tenantId, config = {}) => {
  return useMutation((data) => HrmsService.updateOrg(data, tenantId));
};

export default useHRMSUpdateOrg;
