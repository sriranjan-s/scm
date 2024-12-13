import { roundToNearestMinutes } from "date-fns/esm";
import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

const HrmsService = {
  search: (tenantId, filters, searchParams) =>
    Request({
      url: Urls.hrms.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId, ...filters, ...searchParams },
    }),
  create: (data, tenantId) =>
    Request({
      data: data,
      url: Urls.hrms.create,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId },
    }),
    createOrg: (data, tenantId) =>
    Request({
      data: data,
      url: Urls.hrms.createOrg,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId },
    }),
    updateOrg: (data, tenantId) =>
    Request({
      data: data,
      url: Urls.hrms.updateOrg,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId },
    }),
    updateOff: (data, tenantId) =>
    Request({
      data: data,
      url: Urls.hrms.updateOff,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId },
    }),
    
    createOff: (data, tenantId) =>
    Request({
      data: data,
      url: Urls.hrms.createOff,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId },
    }),
  update: (data, tenantId) =>
    Request({
      data: data,
      url: Urls.hrms.update,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId },
    }),
  count: (tenantId) =>
    Request({
      url: Urls.hrms.count,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId },
    }),
};

export default HrmsService;
