import { useQuery, useMutation } from "react-query";
import HrmsService from "../../services/elements/HRMS";

export const useHRMSUpdateOffice = (tenantId, config = {}) => {
  return useMutation((data) => HrmsService.updateOff(data, tenantId));
};

export default useHRMSUpdateOffice;
