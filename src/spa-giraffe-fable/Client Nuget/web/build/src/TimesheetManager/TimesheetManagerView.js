import * as TimesheetManagerStyles from "../../../../src/TimesheetManager/TimesheetManagerStyles.css";
import { LicenseManager } from "@ag-grid-enterprise/all-modules";
import { createElement } from "react";
import * as react from "react";
import { int32ToString, createObj } from "../../fable_modules/fable-library.3.7.11/Util.js";
import { toArray as toArray_1, singleton, append, delay, toList } from "../../fable_modules/fable-library.3.7.11/Seq.js";
import { ButtonRenderer as ButtonRenderer_1 } from "../../../../src/AgGridComponents/VanillaJS/ButtonRenderer";
import { agGrid, columnDefProp, agGridProp } from "../../Fable/Feliz.AgGrid/Feliz.AgGrid.js";
import { ThemeClass_Balham, rangeSelectionModule, allEnterpriseModules, clientSideRowModelModule } from "../../Fable/Feliz.AgGrid/Feliz.AgGrid.js";
import { fold, ofArray, toArray } from "../../fable_modules/fable-library.3.7.11/List.js";
import { unitialisedView, errorView, loadingView, createMonthString } from "../FableApp.js";
import { month, year } from "../../fable_modules/fable-library.3.7.11/Date.js";
import { TimesheetManagerMsg } from "./TimesheetManagerTypes.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.1.40.0/Interop.fs.js";
import { Interop_reactApi as Interop_reactApi_1 } from "../../fable_modules/Feliz.1.40.0/Interop.fs.js";
import { map, head, append as append_1, tryFind } from "../../fable_modules/fable-library.3.7.11/Array.js";


export function YearsGrid(yearsGridInputProps) {
    let elems, props_3;
    const userCode = yearsGridInputProps.userCode;
    const yearString = yearsGridInputProps.yearString;
    const dispatch = yearsGridInputProps.dispatch;
    const yearTimesheets = yearsGridInputProps.yearTimesheets;
    LicenseManager.setLicenseKey("CompanyName=AIMTEC a. s.,LicensedApplication=Project Delivery App,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=2,LicensedProductionInstancesCount=0,AssetReference=AG-016380,ExpiryDate=11_June_2022_[v2]_MTY1NDkwMjAwMDAwMA==2b17acda80330ea91069dd33df31bb5b");
    return createElement("div", createObj(ofArray([["className", "col-sm-2 years-container"], (elems = [createElement("h1", {
        children: [yearString],
    }), (props_3 = toList(delay(() => {
        const ButtonRenderer = ButtonRenderer_1;
        return append(singleton(agGridProp(["components", {
            buttonRenderer: ButtonRenderer,
        }])), delay(() => append(singleton(agGridProp(["modules", [clientSideRowModelModule, allEnterpriseModules, rangeSelectionModule]])), delay(() => append(singleton(agGridProp(["className", ThemeClass_Balham])), delay(() => append(singleton(agGridProp(["rowData", toArray(yearTimesheets)])), delay(() => {
            let v_4;
            const inserZero = (n) => {
                if (n < 10) {
                    return "0";
                }
                else {
                    return "";
                }
            };
            return singleton(agGridProp(["columnDefs", toArray_1([createObj([columnDefProp()(["width", 110]), columnDefProp()(["cellRenderer", "buttonRenderer"]), (v_4 = {
                className: (_arg1) => ["btn btn-primary btn-sm"],
                onClick: (data_2, _arg2) => {
                    let tupledArg;
                    return dispatch((tupledArg = [userCode, createMonthString(year(data_2.StartDate), month(data_2.StartDate))], new TimesheetManagerMsg(0, tupledArg[0], tupledArg[1])));
                },
                text: (data_1) => (`Timesheet ${inserZero(month(data_1.StartDate))}${month(data_1.StartDate)}`),
            }, columnDefProp()(["cellRendererParams", v_4]))]), createObj([columnDefProp()(["width", 110]), columnDefProp()(["field", "TimesheetStatus"]), columnDefProp()(["headerName", "Status"]), columnDefProp()(["valueFormatter", (p) => {
                const row = p.data;
                const v_8 = p.value;
                return (v_8 === 0) ? "Opened" : "Closed";
            }]), columnDefProp()(["cellClass", (p_1) => {
                let row_1, v_10;
                return toArray_1((row_1 = p_1.data, (v_10 = p_1.value, (v_10 === 0) ? ["opened-timesheet"] : ["closed-timesheet"])));
            }])])])]));
        }))))))));
    })), Interop_reactApi.createElement(agGrid, createObj(props_3)))], ["children", Interop_reactApi_1.Children.toArray(Array.from(elems))])])));
}

export function SplitByYears(timeshets) {
    const accumulator = [];
    const splitByYearsFolder = (acc, timesheet) => {
        const matchValue = tryFind((ta) => ta.some((ts) => (year(ts.StartDate) === year(timesheet.StartDate))), acc);
        if (matchValue != null) {
            const l = matchValue;
            const lIndex = acc.findIndex((l_1) => l_1.some((timesheet_1) => (year(timesheet_1.StartDate) === year(timesheet_1.StartDate)))) | 0;
            acc[lIndex] = append_1([timesheet], acc[lIndex]);
            return acc;
        }
        else {
            return append_1([[timesheet]], acc);
        }
    };
    return fold(splitByYearsFolder, accumulator, timeshets);
}

export function RenderTimesheets(renderTimesheetsInputProps) {
    let value_1;
    const userCode = renderTimesheetsInputProps.userCode;
    const dispatch = renderTimesheetsInputProps.dispatch;
    const state = renderTimesheetsInputProps.state;
    const matchValue = state.ComponentState;
    switch (matchValue.tag) {
        case 1: {
            return loadingView;
        }
        case 2: {
            const errorMessages = matchValue.fields[0];
            return errorView(errorMessages);
        }
        case 3: {
            const getYearString = (tsa) => int32ToString(year(head(tsa).StartDate));
            const yearCards = map((tsa_1) => {
                const yearString = getYearString(tsa_1);
                return createElement(YearsGrid, {
                    yearTimesheets: ofArray(tsa_1),
                    dispatch: dispatch,
                    yearString: yearString,
                    userCode: userCode,
                });
            }, SplitByYears(state.Timesheets));
            const xs_2 = [(value_1 = (`User Timesheets for user: ${userCode}`), createElement("h2", {
                children: [value_1],
            })), createElement("hr", {}), createElement("div", {
                className: "row",
                children: Interop_reactApi_1.Children.toArray(Array.from(yearCards)),
            })];
            return react.createElement(react.Fragment, {}, ...xs_2);
        }
        default: {
            return unitialisedView;
        }
    }
}

