import { useTranslation } from "react-i18next";

const { useState, useEffect } = require("react");

const useInputDefs = (tenantId, moduleCode) => {
  const [localMenu, setLocalMenu] = useState([]);
  const SessionStorage = Digit.SessionStorage;
  let { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const serviceDefs = await Digit.MDMSService.getServiceInputDefs(tenantId, moduleCode);
      SessionStorage.set("inoutDefs", serviceDefs);

      //const serviceDefsWithKeys = serviceDefs.map((def) => ({ ...def, i18nKey: t("SERVICEDEFS." + def.serviceCode.toUpperCase()) }));
      setLocalMenu(serviceDefs);
    })();
  }, [t, tenantId, moduleCode]);

  return localMenu;
};

export default useInputDefs;
