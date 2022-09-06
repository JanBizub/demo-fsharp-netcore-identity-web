import * as UserManagerStyles from "../../../../src/UserManager/UserManagerStyles.css";
import { createElement } from "react";
import * as react from "react";
import { safeHash, equals, createObj } from "../../fable_modules/fable-library.3.7.11/Util.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.1.40.0/Interop.fs.js";
import { singleton as singleton_1, tryFind, empty, map, toArray, contains, ofArray } from "../../fable_modules/fable-library.3.7.11/List.js";
import { unitialisedView, errorView, loadingView } from "../FableApp.js";
import { toArray as toArray_1, singleton, append, delay, toList } from "../../fable_modules/fable-library.3.7.11/Seq.js";
import { join } from "../../fable_modules/fable-library.3.7.11/String.js";
import { appNameVersion } from "../AppConfig.js";
import { Record } from "../../fable_modules/fable-library.3.7.11/Types.js";
import { record_type, list_type, uint8_type, option_type, string_type, class_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { TimesheetModule_$007COpenedTimesheet$007CClosedTimesheet$007CUnlockedTimesheet$007COpenedTimesheetInClosedPeriod$007CInvalidStateTimesheet$007C, AccessLevelModule_timesheetAccessLevel, AccessLevel, AccessLevel$reflection } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { UserManagerMsg } from "./UserManagerTypes.js";
import { map as map_1 } from "../../fable_modules/fable-library.3.7.11/Option.js";
import { LicenseManager } from "@ag-grid-enterprise/all-modules";
import { ButtonRenderer as ButtonRenderer_1 } from "../../../../src/AgGridComponents/VanillaJS/ButtonRenderer";
import { agGrid, columnDefProp, agGridProp } from "../../Fable/Feliz.AgGrid/Feliz.AgGrid.js";
import { ThemeClass_Balham, rangeSelectionModule, allEnterpriseModules, clientSideRowModelModule } from "../../Fable/Feliz.AgGrid/Feliz.AgGrid.js";
import { Interop_reactApi as Interop_reactApi_1 } from "../../fable_modules/Feliz.1.40.0/Interop.fs.js";


export function NavItem(navItemInputProps) {
    let elems;
    const onclick = navItemInputProps.onclick;
    const text = navItemInputProps.text;
    return createElement("li", createObj(ofArray([["className", "nav-item"], (elems = [createElement("a", {
        className: "nav-link cursor-pointer",
        children: text,
        onClick: onclick,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function NavItemAuth(navItemAuthInputProps) {
    const onclick = navItemAuthInputProps.onclick;
    const text = navItemAuthInputProps.text;
    return createElement("a", {
        className: "nav-link authentication-label",
        children: "Login",
        onClick: (_arg1) => {
        },
    });
}

export function RenderHeader(renderHeaderInputProps) {
    let elems_4, elems_3;
    const onLogoClick = renderHeaderInputProps.onLogoClick;
    const dispatch = renderHeaderInputProps.dispatch;
    const state = renderHeaderInputProps.state;
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
            const matchValue_1 = state.User;
            if (matchValue_1 != null) {
                const user = matchValue_1;
                return createElement("nav", createObj(ofArray([["className", "navbar navbar-expand-lg navbar-dark bg-dark"], (elems_4 = [createElement("div", createObj(ofArray([["className", "container-fluid"], (elems_3 = toList(delay(() => append(singleton(createElement("img", {
                    src: "img/cloud-logo.svg",
                    className: "navbar-brand cursor-pointer",
                    onClick: (_arg1) => {
                        onLogoClick();
                    },
                })), delay(() => {
                    let elems;
                    return append(singleton(createElement("button", createObj(ofArray([["className", "navbar-toggler"], ["type", "button"], ["data-bs-toggle", "collapse"], ["data-bs-target", "#navbarSupportedContent"], ["aria-controls", join(" ", ["navbarSupportedContent"])], ["aria-expanded", false], ["aria-label", "Toggle navigation"], (elems = [createElement("span", {
                        className: "navbar-toggler-icon",
                    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), delay(() => {
                        let elems_2, elems_1;
                        let loginOrLogout;
                        const matchValue_2 = state.User;
                        if (matchValue_2 != null) {
                            const ui = matchValue_2;
                            loginOrLogout = createElement(NavItemAuth, {
                                text: "Logout",
                                onclick: (_arg3) => {
                                },
                            });
                        }
                        else {
                            loginOrLogout = createElement(NavItemAuth, {
                                text: "Login",
                                onclick: (_arg2) => {
                                },
                            });
                        }
                        return singleton(createElement("div", createObj(ofArray([["id", "navbarSupportedContent"], ["className", "collapse navbar-collapse"], (elems_2 = [createElement("ul", createObj(ofArray([["className", "navbar-nav me-auto mb-2 mb-lg-0"], (elems_1 = [createElement(NavItem, {
                            text: appNameVersion,
                            onclick: (_arg4) => {
                                onLogoClick();
                            },
                        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))));
                    }));
                })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])));
            }
            else {
                return createElement("p", {
                    children: ["No User"],
                });
            }
        }
        default: {
            return unitialisedView;
        }
    }
}

export class UserAndTimesheet extends Record {
    constructor(Id, Username, TimesheetId, TimesheetStatus, PeriodStatus, AccessLevel) {
        super();
        this.Id = Id;
        this.Username = Username;
        this.TimesheetId = TimesheetId;
        this.TimesheetStatus = TimesheetStatus;
        this.PeriodStatus = PeriodStatus;
        this.AccessLevel = AccessLevel;
    }
}

export function UserAndTimesheet$reflection() {
    return record_type("UserManagerView.UserAndTimesheet", [], UserAndTimesheet, () => [["Id", class_type("System.Guid")], ["Username", string_type], ["TimesheetId", option_type(class_type("System.Guid"))], ["TimesheetStatus", option_type(uint8_type)], ["PeriodStatus", option_type(uint8_type)], ["AccessLevel", list_type(AccessLevel$reflection())]]);
}

export function controlButtonRendererParams(ut, dispatch) {
    const matchValue = [ut.TimesheetId, ut.TimesheetStatus];
    let pattern_matching_result, timesheetId, timesheetStatus;
    if (matchValue[0] != null) {
        if (matchValue[1] != null) {
            pattern_matching_result = 0;
            timesheetId = matchValue[0];
            timesheetStatus = matchValue[1];
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
            if (contains(new AccessLevel(2), ut.AccessLevel, {
                Equals: equals,
                GetHashCode: safeHash,
            }) && (timesheetStatus === 1)) {
                return {
                    className: (_arg2) => ["btn btn-warning btn-sm"],
                    onClick: (_arg3) => {
                        dispatch(new UserManagerMsg(10, timesheetId));
                    },
                    text: (_arg1) => "Open",
                };
            }
            else if (contains(new AccessLevel(3), ut.AccessLevel, {
                Equals: equals,
                GetHashCode: safeHash,
            }) && ((timesheetStatus === 0) ? true : (timesheetStatus === 2))) {
                return {
                    className: (_arg5) => ["btn btn-success btn-sm"],
                    onClick: (_arg6) => {
                        dispatch(new UserManagerMsg(8, timesheetId));
                    },
                    text: (_arg4) => "Close",
                };
            }
            else if (contains(new AccessLevel(4), ut.AccessLevel, {
                Equals: equals,
                GetHashCode: safeHash,
            }) && (timesheetStatus === 1)) {
                return {
                    className: (_arg8) => ["btn btn-danger btn-sm"],
                    onClick: (_arg9) => {
                        dispatch(new UserManagerMsg(6, timesheetId));
                    },
                    text: (_arg7) => "Unlock",
                };
            }
            else {
                return {
                    className: (_arg11) => ["btn btn-primary btn-sm disabled"],
                    onClick: (_arg12) => {
                    },
                    text: (_arg10) => "N/A",
                };
            }
        }
        case 1: {
            return {
                className: (_arg14) => ["btn btn-primary btn-sm disabled"],
                onClick: (_arg15) => {
                },
                text: (_arg13) => "N/A",
            };
        }
    }
}

export function RenderUsersGrid(renderUsersGridInputProps) {
    const monthString = renderUsersGridInputProps.monthString;
    const dispatch = renderUsersGridInputProps.dispatch;
    const state = renderUsersGridInputProps.state;
    const usersAndTimesheets = toArray(map((tupledArg) => {
        const u = tupledArg[0];
        const t_1 = tupledArg[1];
        let accessLevel;
        const matchValue = [state.User, t_1];
        let pattern_matching_result, timesheet, user_1;
        if (matchValue[0] != null) {
            if (matchValue[1] != null) {
                pattern_matching_result = 0;
                timesheet = matchValue[1];
                user_1 = matchValue[0];
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
                accessLevel = AccessLevelModule_timesheetAccessLevel(timesheet, user_1);
                break;
            }
            case 1: {
                accessLevel = empty();
                break;
            }
        }
        const PeriodStatus = map_1((t_2) => t_2.PeriodStatus, t_1);
        return new UserAndTimesheet(u.Id, u.Name, map_1((t_3) => t_3.TimesheetId, t_1), map_1((t_4) => t_4.TimesheetStatus, t_1), PeriodStatus, accessLevel);
    }, map((user) => [user, tryFind((t) => (t.UserId === user.Id), state.Timesheets)], state.Users)));
    LicenseManager.setLicenseKey("CompanyName=AIMTEC a. s.,LicensedApplication=Project Delivery App,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=2,LicensedProductionInstancesCount=0,AssetReference=AG-016380,ExpiryDate=11_June_2022_[v2]_MTY1NDkwMjAwMDAwMA==2b17acda80330ea91069dd33df31bb5b");
    const props_4 = toList(delay(() => {
        const ButtonRenderer = ButtonRenderer_1;
        return append(singleton(agGridProp(["components", {
            buttonRenderer: ButtonRenderer,
        }])), delay(() => append(singleton(agGridProp(["modules", [clientSideRowModelModule, allEnterpriseModules, rangeSelectionModule]])), delay(() => append(singleton(agGridProp(["className", ThemeClass_Balham])), delay(() => append(singleton(agGridProp(["rowData", usersAndTimesheets])), delay(() => append(singleton(agGridProp(["rowClassRules", createObj(map((tupledArg_1) => {
            const className = tupledArg_1[0];
            const rule = tupledArg_1[1];
            return [className, (p) => rule(p.data)];
        }, singleton_1(["grayed", (ut) => (ut.TimesheetStatus == null)])))])), delay(() => {
            let v_4;
            return singleton(agGridProp(["columnDefs", toArray_1([createObj([columnDefProp()(["width", 70]), columnDefProp()(["cellRenderer", "buttonRenderer"]), (v_4 = {
                className: (data_2) => ((data_2.TimesheetStatus == null) ? ["btn btn-primary btn-sm disabled"] : ["btn btn-sm btn-primary"]),
                onClick: (data_3) => {
                    let tupledArg_2;
                    dispatch((tupledArg_2 = [data_3.Username, monthString], new UserManagerMsg(0, tupledArg_2[0], tupledArg_2[1])));
                },
                text: (data_1) => "Visit",
            }, columnDefProp()(["cellRendererParams", v_4]))]), createObj([columnDefProp()(["width", 75]), columnDefProp()(["cellRenderer", "buttonRenderer"]), columnDefProp()(["cellRendererParams", (p_1) => controlButtonRendererParams(p_1.data, dispatch)])]), createObj([columnDefProp()(["headerName", "UserName"]), columnDefProp()(["field", "Username"]), columnDefProp()(["width", 75])]), createObj([columnDefProp()(["headerName", "Status"]), columnDefProp()(["field", "TimesheetStatus"]), columnDefProp()(["width", 90]), columnDefProp()(["valueFormatter", (p_2) => {
                const row = p_2.data;
                const v_14 = p_2.value;
                const matchValue_1 = [row.TimesheetStatus, row.PeriodStatus];
                const activePatternResult24832 = TimesheetModule_$007COpenedTimesheet$007CClosedTimesheet$007CUnlockedTimesheet$007COpenedTimesheetInClosedPeriod$007CInvalidStateTimesheet$007C(matchValue_1[0], matchValue_1[1]);
                return (activePatternResult24832.tag === 2) ? "Unlocked" : ((activePatternResult24832.tag === 1) ? "Closed" : ((activePatternResult24832.tag === 0) ? "Opened" : ((activePatternResult24832.tag === 4) ? "N/A" : "Not Closed")));
            }]), columnDefProp()(["cellClass", (p_3) => {
                let row_1, v_16, matchValue_2, activePatternResult24835;
                return toArray_1((row_1 = p_3.data, (v_16 = p_3.value, (matchValue_2 = [row_1.TimesheetStatus, row_1.PeriodStatus], (activePatternResult24835 = TimesheetModule_$007COpenedTimesheet$007CClosedTimesheet$007CUnlockedTimesheet$007COpenedTimesheetInClosedPeriod$007CInvalidStateTimesheet$007C(matchValue_2[0], matchValue_2[1]), (activePatternResult24835.tag === 2) ? ["unlockedTimesheet"] : ((activePatternResult24835.tag === 1) ? ["closedTimesheet"] : ((activePatternResult24835.tag === 0) ? ["openedTimesheet"] : ((activePatternResult24835.tag === 4) ? ["invalidStateTimesheet"] : ["openedTimesheetInClosedPeriod"]))))))));
            }])])])]));
        }))))))))));
    }));
    return Interop_reactApi_1.createElement(agGrid, createObj(props_4));
}

export function RenderUsers(renderUsersInputProps) {
    let value;
    const monthString = renderUsersInputProps.monthString;
    const dispatch = renderUsersInputProps.dispatch;
    const state = renderUsersInputProps.state;
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
            const xs = [(value = (`User Timesheets for month: ${monthString}`), createElement("h2", {
                children: [value],
            })), createElement(RenderUsersGrid, {
                state: state,
                dispatch: dispatch,
                monthString: monthString,
            })];
            return react.createElement(react.Fragment, {}, ...xs);
        }
        default: {
            return unitialisedView;
        }
    }
}

