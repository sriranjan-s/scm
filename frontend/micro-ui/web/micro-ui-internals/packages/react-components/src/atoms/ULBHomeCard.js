import React, { Fragment } from "react";
import { BackButton, Card, AddNewIcon, InboxIcon, ViewReportIcon, CardText, CardHeader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const ULBHomeCard = (props) => {
    const { t } = useTranslation();
    const state = Digit.ULBService.getStateId();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const stateId = Digit.ULBService.getStateId();
    const history = useHistory();

    return (
        <React.Fragment>
            <Card style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                <CardHeader> {t(props.title)} </CardHeader>
                <div style={{ display: "grid", gridTemplateColumns: "33.3% 33.3% 33.3%", textAlign: "-webkit-center" }}>
                    {props.module.map((i) => {
                        return <Card style={{ minWidth: "100px" }} onClick={() => i.link ? history.push(i.link) : location.assign(i.locate)} children={<> {i.icon} <p> {t(i.name)} </p> </>}></Card>
                    })}
                </div>
            </Card>
        </React.Fragment>
    );
};

export default ULBHomeCard;