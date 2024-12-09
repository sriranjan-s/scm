import { useQuery, useMutation } from "react-query";
import HrmsService from "../../services/elements/HRMS";

export const useHRMSCreateOffice = (tenantId, config = {}) => {
  return useMutation((data) => HrmsService.createOff(data, tenantId));
};

export default useHRMSCreateOffice;
