import * as bootstrap$002Emin from "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as AgGridComponent from "../../../../src/UserTimesheet/AgGridComponent.scss";
import { empty, ofArray, singleton, map as map_2, contains, toArray } from "../../fable_modules/fable-library.3.7.11/List.js";
import { AccessLevelModule_timesheetAccessLevel, GridLineStatus, TimesheetLineValidation_cIContains, TimesheetLineValidation_cIEquals, AccessLevel } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { createObj, safeHash, equals } from "../../fable_modules/fable-library.3.7.11/Util.js";
import { luxonToISODate, toDecimal, checkIsNumber, checkIsDate, checkIsDateFromMonth } from "../JsInterop.js";
import { month } from "../../fable_modules/fable-library.3.7.11/Date.js";
import { map } from "../../fable_modules/fable-library.3.7.11/Option.js";
import { toString } from "../../fable_modules/fable-library.3.7.11/Decimal.js";
import { join, isNullOrWhiteSpace, isNullOrEmpty, replace } from "../../fable_modules/fable-library.3.7.11/String.js";
import { toString as toString_1 } from "../../fable_modules/fable-library.3.7.11/Types.js";
import { tryFind, map as map_1 } from "../../fable_modules/fable-library.3.7.11/Array.js";
import { LicenseManager } from "@ag-grid-enterprise/all-modules";
import { agGrid, agGridProp, columnDefProp } from "../../Fable/Feliz.AgGrid/Feliz.AgGrid.js";
import { TimesheetListViewMsg } from "./UserTimesheetTypes.js";
import { singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.3.7.11/Seq.js";
import { DataListEditor as DataListEditor_1 } from "../../../../src/AgGridComponents/VanillaJS/DataListEditor";
import { DxDateBox as DxDateBox_1 } from "../../../../src/AgGridComponents/React/DxDateBox.jsx";
import { DoublingEditor as DoublingEditor_1 } from "../../../../src/AgGridComponents/React/DoublingEditor.jsx";
import { ButtonRenderer as ButtonRenderer_1 } from "../../../../src/AgGridComponents/React/ButtonRenderer.jsx";
import { ThemeClass_Balham, RowSelection, clipboardModule, rangeSelectionModule, allEnterpriseModules, clientSideRowModelModule } from "../../Fable/Feliz.AgGrid/Feliz.AgGrid.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.1.40.0/Interop.fs.js";
import { createElement } from "react";
import * as react from "react";
import { unitialisedView, errorView, loadingView } from "../FableApp.js";
import { parse } from "../../fable_modules/fable-library.3.7.11/Int32.js";
import { Interop_reactApi as Interop_reactApi_1 } from "../../fable_modules/Feliz.1.40.0/Interop.fs.js";



export function InitialisedView(initialisedViewInputProps) {
    let v_5, v_18, v_65, v_71, v_76;
    const singleClickEdit = initialisedViewInputProps.singleClickEdit;
    const accessLevel = initialisedViewInputProps.accessLevel;
    const dispatch = initialisedViewInputProps.dispatch;
    const userTimesheet = initialisedViewInputProps.userTimesheet;
    const timesheetLines = toArray(userTimesheet.TimesheetGridLines);
    const users = toArray(userTimesheet.TimesheetGridOptions.Users);
    const projects = toArray(userTimesheet.TimesheetGridOptions.Projects);
    const tasks = toArray(userTimesheet.TimesheetGridOptions.Tasks);
    const rates = toArray(userTimesheet.TimesheetGridOptions.Rates);
    const urgencies = toArray(userTimesheet.TimesheetGridOptions.Urgencies);
    const canEdit = contains(new AccessLevel(1), accessLevel, {
        Equals: equals,
        GetHashCode: safeHash,
    });
    const isDateFromThisMonth = (d) => (!checkIsDateFromMonth(month(userTimesheet.Timesheet.StartDate), d));
    const dateTypeCheck = (d_1) => (!checkIsDate(d_1));
    const integerTypeCheck = (n) => (!checkIsNumber(n));
    const saveStatusCellClassRules = (p) => (p === "Saved");
    const faultyStatusCellClassRules = (p_1) => (p_1 === "Faulty");
    const decimalFormatter = (p_2) => map((p_3) => toString(toDecimal(replace(p_3, ",", "."))), p_2);
    const entityReferenceNameCheck = (ers, valueO) => {
        const stringValue = toString_1(valueO);
        return !ers.some((er) => TimesheetLineValidation_cIEquals(er.Name, stringValue));
    };
    const taskReferenceCellEditorParams = (projects_1, trefs, p_5) => {
        const selectedProectCode = toString_1(p_5.data.ProjectCode);
        const selectedProjectId = projects_1.find((p_6) => TimesheetLineValidation_cIEquals(p_6.Name, selectedProectCode)).Id;
        const allowedTasks = map_1((tr_1) => tr_1.TaskName, trefs.filter((tr) => (tr.ProjectId === selectedProjectId)));
        return allowedTasks;
    };
    const optionReferenceTypeCheck = (ors, valueO_1) => {
        const stringValue_1 = toString_1(valueO_1);
        return !ors.some((er_1) => TimesheetLineValidation_cIContains(er_1.Label, stringValue_1));
    };
    const subjectCheck = (p_8) => {
        if (p_8 == null) {
            return true;
        }
        else {
            const a = p_8;
            if (isNullOrEmpty(a)) {
                return true;
            }
            else {
                return isNullOrWhiteSpace(a);
            }
        }
    };
    const finishDateTypeCheck = (d_2) => {
        if (d_2 == null) {
            return false;
        }
        else {
            const d_3 = d_2;
            const dS = toString_1(d_3);
            if (isNullOrEmpty(dS)) {
                return false;
            }
            else {
                return !checkIsDate(d_3);
            }
        }
    };
    const taskReferenceNameCheck = (projects_2, taskReference, currentGridLine, selectedOption) => {
        if (selectedOption != null) {
            const o = selectedOption;
            if (isNullOrEmpty(o) ? true : isNullOrWhiteSpace(o)) {
                return true;
            }
            else {
                const matchValue_2 = currentGridLine.ProjectCode;
                if (matchValue_2 != null) {
                    const pc = matchValue_2;
                    const projectId = tryFind((p_9) => TimesheetLineValidation_cIEquals(p_9.Name, pc), projects_2);
                    if (projectId != null) {
                        const projectId_1 = projectId;
                        const availableTasks = taskReference.filter((t) => (t.ProjectId === projectId_1.Id));
                        return !availableTasks.some((t_1) => TimesheetLineValidation_cIEquals(t_1.TaskName, o));
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    LicenseManager.setLicenseKey("CompanyName=AIMTEC a. s.,LicensedApplication=Project Delivery App,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=2,LicensedProductionInstancesCount=0,AssetReference=AG-016380,ExpiryDate=11_June_2022_[v2]_MTY1NDkwMjAwMDAwMA==2b17acda80330ea91069dd33df31bb5b");
    const columDefs = [createObj([columnDefProp()(["field", "UserCode"]), columnDefProp()(["headerName", "User"]), columnDefProp()(["headerTooltip", "User"]), columnDefProp()(["editable", (p_10) => {
        const _arg1 = p_10.data;
        return canEdit;
    }]), columnDefProp()(["width", 70]), columnDefProp()(["cellEditor", "dataListEditor"]), (v_5 = {
        className: "form-control",
        dataListData: map_1((u) => u.Name, users),
        dataListId: "usersDataList",
    }, columnDefProp()(["cellEditorParams", v_5])), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg) => {
        const className = tupledArg[0];
        const rule = tupledArg[1];
        return [className, (p_11) => rule(p_11.value)(p_11.data)];
    }, singleton(["invalid", (a_1) => ((b) => entityReferenceNameCheck(users, a_1))])))]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "Date"]), columnDefProp()(["headerName", "Date"]), columnDefProp()(["headerTooltip", "Date"]), columnDefProp()(["editable", (p_12) => {
        const _arg2 = p_12.data;
        return canEdit;
    }]), columnDefProp()(["width", 120]), columnDefProp()(["cellEditor", "dxDateBox"]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_1) => {
        const className_1 = tupledArg_1[0];
        const rule_1 = tupledArg_1[1];
        return [className_1, (p_13) => rule_1(p_13.value)(p_13.data)];
    }, singleton(["invalid", (a_2) => ((b_1) => (isDateFromThisMonth(a_2) && (!dateTypeCheck(a_2))))])))]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "ProjectCode"]), columnDefProp()(["headerName", "Project"]), columnDefProp()(["headerTooltip", "Project Code"]), columnDefProp()(["editable", (p_14) => {
        const _arg3 = p_14.data;
        return canEdit;
    }]), columnDefProp()(["width", 90]), columnDefProp()(["cellEditor", "dataListEditor"]), (v_18 = {
        className: "form-control",
        dataListData: map_1((p_15) => p_15.Name, projects),
        dataListId: "projectsDataList",
    }, columnDefProp()(["cellEditorParams", v_18])), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_2) => {
        const className_2 = tupledArg_2[0];
        const rule_2 = tupledArg_2[1];
        return [className_2, (p_16) => rule_2(p_16.value)(p_16.data)];
    }, singleton(["invalid", (a_3) => ((b_2) => entityReferenceNameCheck(projects, a_3))])))]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "TaskName"]), columnDefProp()(["headerName", "Task"]), columnDefProp()(["headerTooltip", "Task Name"]), columnDefProp()(["editable", (p_17) => {
        const _arg4 = p_17.data;
        return canEdit;
    }]), columnDefProp()(["width", 300]), columnDefProp()(["cellEditor", "dataListEditor"]), columnDefProp()(["cellEditorParams", (p_18) => ({
        className: "form-control",
        dataListData: taskReferenceCellEditorParams(projects, tasks, p_18),
        dataListId: "tasksDataList",
    })]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_3) => {
        const className_3 = tupledArg_3[0];
        const rule_3 = tupledArg_3[1];
        return [className_3, (p_19) => rule_3(p_19.value)(p_19.data)];
    }, singleton(["invalid", (a_4) => ((b_3) => taskReferenceNameCheck(projects, tasks, b_3, a_4))])))]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "Subject"]), columnDefProp()(["headerTooltip", "Subject"]), columnDefProp()(["editable", (p_20) => {
        const _arg5 = p_20.data;
        return canEdit;
    }]), columnDefProp()(["width", 300]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_4) => {
        const className_4 = tupledArg_4[0];
        const rule_4 = tupledArg_4[1];
        return [className_4, (p_21) => rule_4(p_21.value)(p_21.data)];
    }, singleton(["invalid", (a_5) => ((b_4) => subjectCheck(a_5))])))]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "FinishDatePlan"]), columnDefProp()(["headerTooltip", "Finish Date Plan"]), columnDefProp()(["editable", (p_22) => {
        const _arg6 = p_22.data;
        return canEdit;
    }]), columnDefProp()(["width", 120]), columnDefProp()(["cellEditor", "dxDateBox"]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_5) => {
        const className_5 = tupledArg_5[0];
        const rule_5 = tupledArg_5[1];
        return [className_5, (p_23) => rule_5(p_23.value)(p_23.data)];
    }, singleton(["invalid", (a_6) => ((b_5) => finishDateTypeCheck(a_6))])))]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "WorkRemaining"]), columnDefProp()(["headerName", "Remaining"]), columnDefProp()(["headerTooltip", "Work Remaining"]), columnDefProp()(["editable", (p_24) => {
        const _arg7 = p_24.data;
        return canEdit;
    }]), columnDefProp()(["width", 60]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_6) => {
        const className_6 = tupledArg_6[0];
        const rule_6 = tupledArg_6[1];
        return [className_6, (p_25) => rule_6(p_25.value)(p_25.data)];
    }, singleton(["invalid", (a_7) => ((b_6) => integerTypeCheck(a_7))])))]), columnDefProp()(["valueParser", (p_26) => {
        const gl = p_26.data;
        const nv = p_26.newValue;
        const pv = p_26.oldValue;
        return decimalFormatter(nv);
    }]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "WorkBillable"]), columnDefProp()(["headerName", "Billable"]), columnDefProp()(["headerTooltip", "Work Billable"]), columnDefProp()(["editable", (p_27) => {
        const _arg8 = p_27.data;
        return canEdit;
    }]), columnDefProp()(["width", 60]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_7) => {
        const className_7 = tupledArg_7[0];
        const rule_7 = tupledArg_7[1];
        return [className_7, (p_28) => rule_7(p_28.value)(p_28.data)];
    }, singleton(["invalid", (a_8) => ((b_7) => integerTypeCheck(a_8))])))]), columnDefProp()(["valueParser", (p_29) => {
        const gl_1 = p_29.data;
        const nv_1 = p_29.newValue;
        const pv_1 = p_29.oldValue;
        return decimalFormatter(nv_1);
    }]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "WorkNonBillable"]), columnDefProp()(["headerName", "nBillable"]), columnDefProp()(["headerTooltip", "Work Non Billable"]), columnDefProp()(["editable", (p_30) => {
        const _arg9 = p_30.data;
        return canEdit;
    }]), columnDefProp()(["width", 60]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_8) => {
        const className_8 = tupledArg_8[0];
        const rule_8 = tupledArg_8[1];
        return [className_8, (p_31) => rule_8(p_31.value)(p_31.data)];
    }, singleton(["invalid", (a_9) => ((b_8) => integerTypeCheck(a_9))])))]), columnDefProp()(["valueParser", (p_32) => {
        const gl_2 = p_32.data;
        const nv_2 = p_32.newValue;
        const pv_2 = p_32.oldValue;
        return decimalFormatter(nv_2);
    }]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "WorkOvertime"]), columnDefProp()(["headerName", "Overtime"]), columnDefProp()(["field", "WorkOvertime"]), columnDefProp()(["editable", (p_33) => {
        const _arg10 = p_33.data;
        return canEdit;
    }]), columnDefProp()(["width", 60]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_9) => {
        const className_9 = tupledArg_9[0];
        const rule_9 = tupledArg_9[1];
        return [className_9, (p_34) => rule_9(p_34.value)(p_34.data)];
    }, singleton(["invalid", (a_10) => ((b_9) => integerTypeCheck(a_10))])))]), columnDefProp()(["valueParser", (p_35) => {
        const gl_3 = p_35.data;
        const nv_3 = p_35.newValue;
        const pv_3 = p_35.oldValue;
        return decimalFormatter(nv_3);
    }]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "WorkOvertimeNonBillable"]), columnDefProp()(["headerName", "nOvertime"]), columnDefProp()(["headerTooltip", "Work Overtime Non Billable"]), columnDefProp()(["editable", (p_36) => {
        const _arg11 = p_36.data;
        return canEdit;
    }]), columnDefProp()(["width", 60]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_10) => {
        const className_10 = tupledArg_10[0];
        const rule_10 = tupledArg_10[1];
        return [className_10, (p_37) => rule_10(p_37.value)(p_37.data)];
    }, singleton(["invalid", (a_11) => ((b_10) => integerTypeCheck(a_11))])))]), columnDefProp()(["valueParser", (p_38) => {
        const gl_4 = p_38.data;
        const nv_4 = p_38.newValue;
        const pv_4 = p_38.oldValue;
        return decimalFormatter(nv_4);
    }]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "UrgencyName"]), columnDefProp()(["headerTooltip", "Urgency Name"]), columnDefProp()(["editable", (p_39) => {
        const _arg12 = p_39.data;
        return canEdit;
    }]), columnDefProp()(["width", 90]), columnDefProp()(["cellEditor", "dataListEditor"]), (v_65 = {
        className: "form-control",
        dataListData: map_1((r) => r.Label, urgencies),
        dataListId: "urgenciesDataList",
    }, columnDefProp()(["cellEditorParams", v_65])), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_11) => {
        const className_11 = tupledArg_11[0];
        const rule_11 = tupledArg_11[1];
        return [className_11, (p_40) => rule_11(p_40.value)(p_40.data)];
    }, singleton(["invalid", (a_12) => ((b_11) => optionReferenceTypeCheck(urgencies, a_12))])))]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "RateName"]), columnDefProp()(["headerTooltip", "Rate"]), columnDefProp()(["editable", (p_41) => {
        const _arg13 = p_41.data;
        return canEdit;
    }]), columnDefProp()(["width", 90]), columnDefProp()(["cellEditor", "dataListEditor"]), (v_71 = {
        className: "form-control",
        dataListData: map_1((r_1) => r_1.Label, rates),
        dataListId: "ratesDataList",
    }, columnDefProp()(["cellEditorParams", v_71])), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_12) => {
        const className_12 = tupledArg_12[0];
        const rule_12 = tupledArg_12[1];
        return [className_12, (p_42) => rule_12(p_42.value)(p_42.data)];
    }, singleton(["invalid", (a_13) => ((b_12) => optionReferenceTypeCheck(rates, a_13))])))]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["headerTooltip", "Delete Grid Line"]), columnDefProp()(["width", 55]), columnDefProp()(["cellRenderer", "buttonRenderer"]), (v_76 = {
        className: (_arg15) => (canEdit ? ["btn btn-primary"] : ["btn disabled"]),
        onClick: canEdit ? ((t_2) => {
            dispatch(new TimesheetListViewMsg(10, [t_2]));
        }) : ((value_23) => {
        }),
        text: (_arg14) => "X",
    }, columnDefProp()(["cellRendererParams", v_76]))]), createObj([columnDefProp()(["field", "GridLineStatus"]), columnDefProp()(["headerName", "Status"]), columnDefProp()(["headerTooltip", "Grid Line Status"]), columnDefProp()(["valueGetter", (x_1) => toString_1(x_1.data.GridLineStatus)]), columnDefProp()(["editable", (p_43) => {
        const _arg16 = p_43.data;
        return false;
    }]), columnDefProp()(["width", 75]), columnDefProp()(["resizable", true]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_13) => {
        const className_13 = tupledArg_13[0];
        const rule_13 = tupledArg_13[1];
        return [className_13, (p_44) => rule_13(p_44.value)(p_44.data)];
    }, ofArray([["saved", (a_14) => ((b_13) => saveStatusCellClassRules(a_14))], ["invalid", (a_15) => ((b_14) => faultyStatusCellClassRules(a_15))]])))])]), createObj([columnDefProp()(["field", "WorkBudgeted"]), columnDefProp()(["headerName", "WorkBudgeted"]), columnDefProp()(["headerTooltip", "Work Budgeted"]), columnDefProp()(["editable", (p_45) => {
        const _arg17 = p_45.data;
        return false;
    }]), columnDefProp()(["width", 100]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_14) => {
        const className_14 = tupledArg_14[0];
        const rule_14 = tupledArg_14[1];
        return [className_14, (p_46) => rule_14(p_46.value)(p_46.data)];
    }, ofArray([["invalid", (a_16) => ((b_15) => integerTypeCheck(a_16))], ["locked", (a_17) => ((b_16) => true)]])))]), columnDefProp()(["valueParser", (p_47) => {
        const gl_5 = p_47.data;
        const nv_5 = p_47.newValue;
        const pv_5 = p_47.oldValue;
        return decimalFormatter(nv_5);
    }]), columnDefProp()(["resizable", true])]), createObj([columnDefProp()(["field", "WorkActual"]), columnDefProp()(["headerName", "WorkActual"]), columnDefProp()(["headerTooltip", "Work Actual"]), columnDefProp()(["editable", (p_48) => {
        const _arg18 = p_48.data;
        return false;
    }]), columnDefProp()(["width", 100]), columnDefProp()(["cellClassRules", createObj(map_2((tupledArg_15) => {
        const className_15 = tupledArg_15[0];
        const rule_15 = tupledArg_15[1];
        return [className_15, (p_49) => rule_15(p_49.value)(p_49.data)];
    }, ofArray([["invalid", (a_18) => ((b_17) => integerTypeCheck(a_18))], ["locked", (a_19) => ((b_18) => true)]])))]), columnDefProp()(["valueParser", (p_50) => {
        const gl_6 = p_50.data;
        const nv_6 = p_50.newValue;
        const pv_6 = p_50.oldValue;
        return decimalFormatter(nv_6);
    }]), columnDefProp()(["resizable", true])])];
    const formatPastedValue = (columnName, v_92) => {
        switch (columnName) {
            case "Date":
            case "FinishDatePlan": {
                return luxonToISODate(v_92);
            }
            case "WorkRemaining":
            case "WorkBillable":
            case "WorkNonBillable":
            case "WorkOvertime":
            case "WorkOvertimeNonBillable":
            case "WorkBudgeted":
            case "WorkActual": {
                return toString(toDecimal(replace(v_92, ",", ".")));
            }
            default: {
                return v_92;
            }
        }
    };
    const props_17 = toList(delay(() => append(singleton_1(agGridProp(["processCellFromClipboard", (c) => formatPastedValue(c.column.colId, c.value)])), delay(() => append(singleton_1(agGridProp(["onCellValueChanged", (x_2) => {
        dispatch(new TimesheetListViewMsg(8, x_2.data));
    }])), delay(() => append(singleton_1(agGridProp(["onCellEditingStopped", (x_3) => {
        let tupledArg_16;
        const data = x_3.data;
        const isLastChild = x_3.node.lastChild;
        dispatch((tupledArg_16 = [isLastChild, data], new TimesheetListViewMsg(7, tupledArg_16[0], tupledArg_16[1])));
    }])), delay(() => append(singleton_1(agGridProp(["rowData", timesheetLines])), delay(() => append(singleton_1(agGridProp(["immutableData", true])), delay(() => append(singleton_1(agGridProp(["getRowNodeId", (t_5) => t_5.TimesheetLineId])), delay(() => {
        const DataListEditor = DataListEditor_1;
        return append(singleton_1(agGridProp(["components", {
            dataListEditor: DataListEditor,
        }])), delay(() => {
            const DxDateBox = DxDateBox_1;
            const DoublingEditor = DoublingEditor_1;
            const ButtonRenderer = ButtonRenderer_1;
            return append(singleton_1(agGridProp(["frameworkComponents", {
                buttonRenderer: ButtonRenderer,
                doublingEditor: DoublingEditor,
                dxDateBox: DxDateBox,
            }])), delay(() => append(singleton_1(agGridProp(["modules", [clientSideRowModelModule, allEnterpriseModules, rangeSelectionModule, clipboardModule]])), delay(() => append(singleton_1(agGridProp(["suppressRowClickSelection", true])), delay(() => append(singleton_1(agGridProp(["rowSelection", toString_1(new RowSelection(1)).toLocaleLowerCase()])), delay(() => append(singleton_1(agGridProp(["enableRangeSelection", true])), delay(() => append(singleton_1(agGridProp(["enableFillHandle", true])), delay(() => append(singleton_1(agGridProp(["enableRangeHandle", true])), delay(() => append(singleton_1(agGridProp(["singleClickEdit", singleClickEdit])), delay(() => append(singleton_1(agGridProp(["className", ThemeClass_Balham])), delay(() => append(singleton_1(agGridProp(["enableCellChangeFlash", true])), delay(() => append(singleton_1(agGridProp(["cellFlashDelay", 2500])), delay(() => append(singleton_1(agGridProp(["animateRows", true])), delay(() => append(singleton_1(agGridProp(["rowClassRules", createObj(map_2((tupledArg_17) => {
                const className_16 = tupledArg_17[0];
                const rule_16 = tupledArg_17[1];
                return [className_16, (p_51) => rule_16(p_51.data)];
            }, ofArray([["grayed", (r_2) => (!canEdit)], ["to-remove", (r_3) => equals(r_3.GridLineStatus, new GridLineStatus(5))]])))])), delay(() => singleton_1(agGridProp(["gridOptions", {
                columnDefs: columDefs,
                reactUi: true,
            }]))))))))))))))))))))))))))));
        }));
    }))))))))))))));
    return Interop_reactApi.createElement(agGrid, createObj(props_17));
}

export function RenderCommandElements(renderCommandElementsInputProps) {
    let elems_3, elems_1, elems_2;
    const singleClickEdit = renderCommandElementsInputProps.singleClickEdit;
    const dispatch = renderCommandElementsInputProps.dispatch;
    const state = renderCommandElementsInputProps.state;
    let accessLevel;
    const matchValue = [state.UserTimesheet, state.User];
    let pattern_matching_result, user, ut;
    if (matchValue[0] != null) {
        if (matchValue[1] != null) {
            pattern_matching_result = 0;
            user = matchValue[1];
            ut = matchValue[0];
        }
        else {
            pattern_matching_result = 1;
        }
    }
    else {
        pattern_matching_result = 1;
    }
    switch (pattern_matching_result) {
        case 0: {
            accessLevel = AccessLevelModule_timesheetAccessLevel(ut.Timesheet, user);
            break;
        }
        case 1: {
            accessLevel = empty();
            break;
        }
    }
    const matchValue_1 = state.ComponentState;
    switch (matchValue_1.tag) {
        case 1: {
            const matchValue_2 = state.UserTimesheet;
            if (matchValue_2 != null) {
                const userTimesheet = matchValue_2;
                return react.createElement(react.Fragment, {}, loadingView);
            }
            else {
                return loadingView;
            }
        }
        case 2: {
            const errorMessages = matchValue_1.fields[0];
            const matchValue_3 = state.UserTimesheet;
            if (matchValue_3 != null) {
                const userTimesheet_1 = matchValue_3;
                return null;
            }
            else {
                return errorView(errorMessages);
            }
        }
        case 3: {
            const matchValue_4 = state.UserTimesheet;
            if (matchValue_4 != null) {
                const userTimesheet_2 = matchValue_4;
                const createTimesheetLineBtn = (dispatch_1, accessLevelL) => {
                    if (contains(new AccessLevel(1), accessLevelL, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    })) {
                        return createElement("button", {
                            className: join(" ", ["btn", "btn-outline-primary"]),
                            onClick: (_arg1) => {
                                dispatch_1(new TimesheetListViewMsg(9));
                            },
                            children: "Create Timesheet Line",
                        });
                    }
                    else {
                        return react.createElement(react.Fragment, {});
                    }
                };
                const saveTimesheetBtn = (dispatch_2, accessLevelL_1) => {
                    if (contains(new AccessLevel(1), accessLevelL_1, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    })) {
                        return createElement("button", {
                            className: join(" ", ["btn", "btn-outline-primary"]),
                            children: "Save Timesheet",
                            onClick: (_arg2) => {
                                dispatch_2(new TimesheetListViewMsg(11));
                            },
                        });
                    }
                    else {
                        return react.createElement(react.Fragment, {});
                    }
                };
                const setDefaultRateBtn = (dispatch_3, accessLevelL_2, user_1) => {
                    let elems;
                    if (contains(new AccessLevel(1), accessLevelL_2, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    })) {
                        let defaultValue;
                        const matchValue_5 = user_1.Rate;
                        if (matchValue_5 != null) {
                            const r = matchValue_5;
                            defaultValue = parse(r.toString(), 511, false, 32);
                        }
                        else {
                            defaultValue = 0;
                        }
                        const xs_11 = [createElement("select", createObj(ofArray([["value", defaultValue], ["onChange", (e) => {
                            let tupledArg;
                            let byteValue;
                            if (equals(e.currentTarget.value, null)) {
                                byteValue = 0;
                            }
                            else {
                                const value_15 = e.currentTarget.value | 0;
                                byteValue = (value_15 & 0xFF);
                            }
                            if (byteValue === 0) {
                                dispatch_3(new TimesheetListViewMsg(24, user_1.UserId));
                            }
                            else {
                                dispatch_3((tupledArg = [user_1.UserId, byteValue], new TimesheetListViewMsg(22, tupledArg[0], tupledArg[1])));
                            }
                        }], ["className", join(" ", ["form-select"])], (elems = [createElement("option", {
                            children: "Default Rate: None",
                            value: 0,
                        }), createElement("option", {
                            children: "Default Rate: AppCon",
                            value: 1,
                        }), createElement("option", {
                            children: "Default Rate: OnSite",
                            value: 2,
                        }), createElement("option", {
                            children: "Default Rate: PCPgm",
                            value: 3,
                        }), createElement("option", {
                            children: "Default Rate: SAPCon",
                            value: 4,
                        })], ["children", Interop_reactApi_1.Children.toArray(Array.from(elems))])])))];
                        return react.createElement(react.Fragment, {}, ...xs_11);
                    }
                    else {
                        return react.createElement(react.Fragment, {});
                    }
                };
                const sigleClickEditSwitchBtn = (dispatch_4, accessLevelL_3) => {
                    if (contains(new AccessLevel(1), accessLevelL_3, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    })) {
                        if (singleClickEdit) {
                            return createElement("button", {
                                className: join(" ", ["btn", "btn-outline-secondary"]),
                                children: "Single Click Edit - Writer Mode",
                                onClick: (_arg3) => {
                                    dispatch_4(new TimesheetListViewMsg(5, false));
                                },
                            });
                        }
                        else {
                            return createElement("button", {
                                className: join(" ", ["btn", "btn-outline-secondary"]),
                                children: "Double Click Edit - Editor Mode",
                                onClick: (_arg4) => {
                                    dispatch_4(new TimesheetListViewMsg(5, true));
                                },
                            });
                        }
                    }
                    else {
                        return react.createElement(react.Fragment, {});
                    }
                };
                const openTimesheetButton = (dispatch_5, accessLevelL_4, timesheet) => {
                    if (contains(new AccessLevel(2), accessLevelL_4, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    }) && (timesheet.TimesheetStatus === 1)) {
                        return createElement("button", {
                            className: join(" ", ["btn", "btn-warning", "float-right"]),
                            onClick: (_arg5) => {
                                dispatch_5(new TimesheetListViewMsg(20));
                            },
                            children: "Open Timesheet",
                        });
                    }
                    else {
                        return react.createElement(react.Fragment, {});
                    }
                };
                const unlockTimesheetButton = (dispatch_6, accessLevelL_5, timesheet_1) => {
                    if (contains(new AccessLevel(4), accessLevelL_5, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    }) && (timesheet_1.TimesheetStatus === 1)) {
                        return createElement("button", {
                            className: join(" ", ["btn", "btn-danger", "float-right"]),
                            onClick: (_arg6) => {
                                dispatch_6(new TimesheetListViewMsg(16, timesheet_1.TimesheetId));
                            },
                            children: "Unlock Timesheet",
                        });
                    }
                    else {
                        return react.createElement(react.Fragment, {});
                    }
                };
                const closeTimesheetButton = (dispatch_7, accessLevelL_6, timesheet_2) => {
                    if (contains(new AccessLevel(3), accessLevelL_6, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    }) && ((timesheet_2.TimesheetStatus === 0) ? true : (timesheet_2.TimesheetStatus === 2))) {
                        return createElement("button", {
                            className: join(" ", ["btn", "btn-success", "float-right"]),
                            onClick: (_arg7) => {
                                dispatch_7(new TimesheetListViewMsg(18));
                            },
                            children: "Close Timesheet",
                        });
                    }
                    else {
                        return react.createElement(react.Fragment, {});
                    }
                };
                let canNotEditInfo;
                const children_10 = toList(delay(() => (contains(new AccessLevel(1), accessLevel, {
                    Equals: equals,
                    GetHashCode: safeHash,
                }) ? singleton_1(react.createElement(react.Fragment, {})) : singleton_1(createElement("h2", {
                    children: ["You can not edit this timesheet."],
                })))));
                canNotEditInfo = createElement("div", {
                    children: Interop_reactApi_1.Children.toArray(Array.from(children_10)),
                });
                return createElement("div", createObj(ofArray([["className", join(" ", ["row"])], (elems_3 = [createElement("div", createObj(ofArray([["className", "col-8"], (elems_1 = [createTimesheetLineBtn(dispatch, accessLevel), saveTimesheetBtn(dispatch, accessLevel), sigleClickEditSwitchBtn(dispatch, accessLevel), openTimesheetButton(dispatch, accessLevel, userTimesheet_2.Timesheet), closeTimesheetButton(dispatch, accessLevel, userTimesheet_2.Timesheet), unlockTimesheetButton(dispatch, accessLevel, userTimesheet_2.Timesheet), canNotEditInfo], ["children", Interop_reactApi_1.Children.toArray(Array.from(elems_1))])]))), createElement("div", createObj(ofArray([["className", "col-4"], (elems_2 = [setDefaultRateBtn(dispatch, accessLevel, userTimesheet_2.TimesheetOwner)], ["children", Interop_reactApi_1.Children.toArray(Array.from(elems_2))])])))], ["children", Interop_reactApi_1.Children.toArray(Array.from(elems_3))])])));
            }
            else {
                return unitialisedView;
            }
        }
        default: {
            return unitialisedView;
        }
    }
}

export function RenderErrorComponent(renderErrorComponentInputProps) {
    const dispatch = renderErrorComponentInputProps.dispatch;
    const state = renderErrorComponentInputProps.state;
    const matchValue = state.ComponentState;
    if (matchValue.tag === 2) {
        const errorMessages = matchValue.fields[0];
        const xs_4 = [errorView(errorMessages), createElement("hr", {}), createElement("button", {
            className: join(" ", ["btn", "btn-outline-primary"]),
            onClick: (_arg1) => {
                dispatch(new TimesheetListViewMsg(29));
            },
            children: "Reset Error",
        }), createElement("button", {
            className: join(" ", ["btn", "btn-outline-primary"]),
            onClick: (_arg2) => {
                dispatch(new TimesheetListViewMsg(11));
            },
            children: "Save Timesheet",
        }), createElement("hr", {})];
        return react.createElement(react.Fragment, {}, ...xs_4);
    }
    else {
        return react.createElement(react.Fragment, {});
    }
}

