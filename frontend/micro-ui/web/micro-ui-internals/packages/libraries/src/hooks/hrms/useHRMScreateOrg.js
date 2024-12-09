import { useQuery, useMutation } from "react-query";
import HrmsService from "../../services/elements/HRMS";

export const useHRMSCreateOrg = (tenantId, config = {}) => {
  return useMutation((data) => HrmsService.createOrg(data, tenantId));
};

export default useHRMSCreateOrg;
