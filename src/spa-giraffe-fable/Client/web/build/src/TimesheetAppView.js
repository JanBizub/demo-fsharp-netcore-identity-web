import { createElement } from "react";
import * as react from "react";
import { Interop_reactApi } from "../fable_modules/Feliz.1.40.0/Interop.fs.js";
import * as bootstrap$002Emin from "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as style from "../../../src/style.scss";
import { RenderUsers, RenderHeader } from "./UserManager/UserManagerView.js";
import { Msg } from "./TimesheetAppTypes.js";
import { int32ToString, createObj } from "../fable_modules/fable-library.3.7.11/Util.js";
import { singleton as singleton_1, empty, ofArray } from "../fable_modules/fable-library.3.7.11/List.js";
import { singleton, append, delay, toList } from "../fable_modules/fable-library.3.7.11/Seq.js";
import { editDate } from "./JsInterop.js";
import { printf, toText, join } from "../fable_modules/fable-library.3.7.11/String.js";
import { RenderTimesheets } from "./TimesheetManager/TimesheetManagerView.js";
import { RenderErrorComponent, InitialisedView, RenderCommandElements } from "./UserTimesheet/UserTimesheetView.js";
import { map, defaultArg } from "../fable_modules/fable-library.3.7.11/Option.js";
import { now, year, month } from "../fable_modules/fable-library.3.7.11/Date.js";
import { AccessLevelModule_timesheetAccessLevel } from "../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { createMonthString, unitialisedView, errorView, loadingView } from "./FableApp.js";
import { Render as Render_1 } from "./PeriodManager/PeriodManagerView.js";

export function row(elems) {
    return createElement("div", {
        className: "row",
        children: Interop_reactApi.Children.toArray(Array.from(elems)),
    });
}

export function Render(renderInputProps) {
    let elems_12, elems_13, elems_15, elems_18, elems_19, elems_20, elems_21, elems_23, elems_25, elems_26, elems_7, elems_8, elems_9, elems_10, elems;
    const dispatch = renderInputProps.dispatch;
    const state = renderInputProps.state;
    const userManagerView = (state_1) => createElement(RenderHeader, {
        state: state_1,
        dispatch: (arg) => {
            dispatch(new Msg(12, arg));
        },
        onLogoClick: () => {
            dispatch(new Msg(0));
        },
    });
    let page;
    const matchValue = state.CurrentRoute;
    switch (matchValue.tag) {
        case 1: {
            const matchValue_4 = state.UserManagerState;
            if (matchValue_4 != null) {
                const usermanagerState = matchValue_4;
                const xs_21 = [userManagerView(usermanagerState), createElement("h3", {
                    children: ["Invalid Route"],
                })];
                page = react.createElement(react.Fragment, {}, ...xs_21);
            }
            else {
                page = createElement("div", createObj(ofArray([["className", "alert alert-waring"], (elems_12 = [createElement("label", {
                    children: "Uninitialised User Timesheet Component",
                })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_12))])])));
            }
            break;
        }
        case 2: {
            const monthNumber = matchValue.fields[0] | 0;
            const matchValue_5 = state.UserManagerState;
            if (matchValue_5 != null) {
                const usermanagerState_1 = matchValue_5;
                const xs_32 = toList(delay(() => append(singleton(userManagerView(usermanagerState_1)), delay(() => {
                    let previousTimesheetBtn;
                    const matchValue_6 = usermanagerState_1.User;
                    if (matchValue_6 != null) {
                        const u_3 = matchValue_6;
                        previousTimesheetBtn = createElement("button", createObj(toList(delay(() => {
                            const prevMonthCode = editDate(int32ToString(monthNumber), -1);
                            const onClick = (_arg6) => {
                                dispatch(new Msg(4, prevMonthCode));
                            };
                            return append(singleton(["className", join(" ", ["btn", "btn-outline-secondary"])]), delay(() => append(singleton(["children", "Previous Month"]), delay(() => singleton(["onClick", onClick])))));
                        }))));
                    }
                    else {
                        previousTimesheetBtn = react.createElement(react.Fragment, {});
                    }
                    let nextTimesheetBtn;
                    const matchValue_7 = usermanagerState_1.User;
                    if (matchValue_7 != null) {
                        const u_4 = matchValue_7;
                        nextTimesheetBtn = createElement("button", createObj(toList(delay(() => {
                            const nextMonthCode = editDate(int32ToString(monthNumber), 1);
                            const onClick_1 = (_arg7) => {
                                dispatch(new Msg(4, nextMonthCode));
                            };
                            return append(singleton(["className", join(" ", ["btn", "btn-outline-secondary", "float-right"])]), delay(() => append(singleton(["children", "Next Month"]), delay(() => singleton(["onClick", onClick_1])))));
                        }))));
                    }
                    else {
                        nextTimesheetBtn = react.createElement(react.Fragment, {});
                    }
                    const back = createElement("button", createObj(toList(delay(() => {
                        const onClick_2 = (_arg8) => {
                            dispatch(new Msg(0));
                        };
                        return append(singleton(["className", join(" ", ["btn", "btn-outline-secondary"])]), delay(() => append(singleton(["children", "Back To Index"]), delay(() => singleton(["onClick", onClick_2])))));
                    }))));
                    const commandElements = createElement("div", {
                        className: join(" ", []),
                        children: Interop_reactApi.Children.toArray([previousTimesheetBtn, back, nextTimesheetBtn]),
                    });
                    return append(singleton(createElement("hr", {})), delay(() => append(singleton(commandElements), delay(() => append(singleton(createElement("hr", {})), delay(() => singleton(createElement(RenderUsers, {
                        state: usermanagerState_1,
                        dispatch: (arg_1) => {
                            dispatch(new Msg(12, arg_1));
                        },
                        monthString: int32ToString(monthNumber),
                    }))))))));
                }))));
                page = react.createElement(react.Fragment, {}, ...xs_32);
            }
            else {
                page = createElement("div", createObj(ofArray([["className", "alert alert-waring"], (elems_13 = [createElement("label", {
                    children: "Uninitialised User Timesheet Component",
                })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_13))])])));
            }
            break;
        }
        case 3: {
            const userCode_2 = matchValue.fields[0];
            const matchValue_8 = state.UserManagerState;
            if (matchValue_8 != null) {
                const usermanagerState_2 = matchValue_8;
                const xs_41 = toList(delay(() => append(singleton(userManagerView(usermanagerState_2)), delay(() => {
                    let xs_40, elems_16;
                    const backToIndex = createElement("button", createObj(toList(delay(() => {
                        const onClick_3 = (_arg9) => {
                            dispatch(new Msg(0));
                        };
                        return append(singleton(["className", join(" ", ["btn", "btn-primary"])]), delay(() => append(singleton(["children", "Back To Index"]), delay(() => singleton(["onClick", onClick_3])))));
                    }))));
                    const matchValue_9 = state.TimesheetManagerState;
                    if (matchValue_9 != null) {
                        const timesheetManagerState = matchValue_9;
                        return singleton((xs_40 = [createElement("hr", {}), backToIndex, createElement("hr", {}), createElement(RenderTimesheets, {
                            state: timesheetManagerState,
                            dispatch: (arg_2) => {
                                dispatch(new Msg(14, arg_2));
                            },
                            userCode: userCode_2,
                        })], react.createElement(react.Fragment, {}, ...xs_40)));
                    }
                    else {
                        return singleton(createElement("div", createObj(ofArray([["className", "alert alert-waring"], (elems_16 = [createElement("label", {
                            children: "Uninitialised User Timesheet Manager State",
                        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_16))])]))));
                    }
                }))));
                page = react.createElement(react.Fragment, {}, ...xs_41);
            }
            else {
                page = createElement("div", createObj(ofArray([["className", "alert alert-waring"], (elems_15 = [createElement("label", {
                    children: "Uninitialised User Timesheet Component",
                })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_15))])])));
            }
            break;
        }
        case 4: {
            const userCode_3 = matchValue.fields[0];
            const monthNumber_1 = matchValue.fields[1] | 0;
            const matchValue_10 = [state.UserTimesheetState, state.UserManagerState];
            let pattern_matching_result, ums_1, uts;
            if (matchValue_10[0] != null) {
                if (matchValue_10[1] != null) {
                    pattern_matching_result = 0;
                    ums_1 = matchValue_10[1];
                    uts = matchValue_10[0];
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
                    const timesheetListViewCmdElemetns = createElement(RenderCommandElements, {
                        state: uts,
                        dispatch: (arg_3) => {
                            dispatch(new Msg(10, arg_3));
                        },
                        singleClickEdit: uts.SingleClickEdit,
                    });
                    const previousTimesheetBtn_1 = createElement("button", createObj(toList(delay(() => {
                        const prevMonthCode_1 = editDate(int32ToString(monthNumber_1), -1);
                        const onClick_4 = (_arg10) => {
                            let tupledArg_1;
                            dispatch((tupledArg_1 = [userCode_3, prevMonthCode_1], new Msg(2, tupledArg_1[0], tupledArg_1[1])));
                        };
                        return append(singleton(["className", join(" ", ["btn", "btn-outline-secondary"])]), delay(() => append(singleton(["children", "Previous Month"]), delay(() => singleton(["onClick", onClick_4])))));
                    }))));
                    const nextTimesheetBtn_1 = createElement("button", createObj(toList(delay(() => {
                        const nextMonthCode_1 = editDate(int32ToString(monthNumber_1), 1);
                        const onClick_5 = (_arg11) => {
                            let tupledArg_2;
                            dispatch((tupledArg_2 = [userCode_3, nextMonthCode_1], new Msg(2, tupledArg_2[0], tupledArg_2[1])));
                        };
                        return append(singleton(["className", join(" ", ["btn", "btn-outline-secondary", "float-right"])]), delay(() => append(singleton(["children", "Next Month"]), delay(() => singleton(["onClick", onClick_5])))));
                    }))));
                    const backToIndex_1 = createElement("button", createObj(toList(delay(() => {
                        const onClick_6 = (_arg12) => {
                            dispatch(new Msg(0));
                        };
                        return append(singleton(["className", join(" ", ["btn", "btn-outline-secondary"])]), delay(() => append(singleton(["children", "Back To Index"]), delay(() => singleton(["onClick", onClick_6])))));
                    }))));
                    const statusText_1 = createElement("label", createObj(toList(delay(() => {
                        const statusText = defaultArg(map((ts) => {
                            const matchValue_11 = ts.Timesheet.TimesheetStatus;
                            switch (matchValue_11) {
                                case 0: {
                                    return `Open Timesheet ${month(ts.Timesheet.StartDate)}/${year(ts.Timesheet.StartDate)} - ${ts.TimesheetOwner.UserCode}`;
                                }
                                case 1: {
                                    return `Closed Timesheet ${month(ts.Timesheet.StartDate)}/${year(ts.Timesheet.StartDate)} - ${ts.TimesheetOwner.UserCode}`;
                                }
                                default: {
                                    return "";
                                }
                            }
                        }, uts.UserTimesheet), "");
                        return append(singleton(["className", join(" ", ["timesheet-status"])]), delay(() => singleton(["children", statusText])));
                    }))));
                    const commandElements_1 = createElement("div", {
                        className: join(" ", []),
                        children: Interop_reactApi.Children.toArray([previousTimesheetBtn_1, nextTimesheetBtn_1, backToIndex_1, statusText_1]),
                    });
                    let accessLevel;
                    const matchValue_12 = [uts.UserTimesheet, uts.User];
                    let pattern_matching_result_1, user, ut;
                    if (matchValue_12[0] != null) {
                        if (matchValue_12[1] != null) {
                            pattern_matching_result_1 = 0;
                            user = matchValue_12[1];
                            ut = matchValue_12[0];
                        }
                        else {
                            pattern_matching_result_1 = 1;
                        }
                    }
                    else {
                        pattern_matching_result_1 = 1;
                    }
                    switch (pattern_matching_result_1) {
                        case 0: {
                            accessLevel = AccessLevelModule_timesheetAccessLevel(ut.Timesheet, user);
                            break;
                        }
                        case 1: {
                            accessLevel = empty();
                            break;
                        }
                    }
                    let timesheet;
                    const matchValue_13 = uts.ComponentState;
                    switch (matchValue_13.tag) {
                        case 1: {
                            const matchValue_14 = uts.UserTimesheet;
                            if (matchValue_14 != null) {
                                const userTimesheet = matchValue_14;
                                const xs_47 = [loadingView, createElement(InitialisedView, {
                                    userTimesheet: userTimesheet,
                                    dispatch: (arg_4) => {
                                        dispatch(new Msg(10, arg_4));
                                    },
                                    accessLevel: accessLevel,
                                    singleClickEdit: uts.SingleClickEdit,
                                })];
                                timesheet = react.createElement(react.Fragment, {}, ...xs_47);
                            }
                            else {
                                timesheet = loadingView;
                            }
                            break;
                        }
                        case 2: {
                            const errorMessages = matchValue_13.fields[0];
                            const matchValue_15 = uts.UserTimesheet;
                            if (matchValue_15 != null) {
                                const userTimesheet_1 = matchValue_15;
                                timesheet = createElement(InitialisedView, {
                                    userTimesheet: userTimesheet_1,
                                    dispatch: (arg_5) => {
                                        dispatch(new Msg(10, arg_5));
                                    },
                                    accessLevel: accessLevel,
                                    singleClickEdit: uts.SingleClickEdit,
                                });
                            }
                            else {
                                timesheet = errorView(errorMessages);
                            }
                            break;
                        }
                        case 3: {
                            const matchValue_16 = uts.UserTimesheet;
                            if (matchValue_16 != null) {
                                const userTimesheet_2 = matchValue_16;
                                timesheet = createElement(InitialisedView, {
                                    userTimesheet: userTimesheet_2,
                                    dispatch: (arg_6) => {
                                        dispatch(new Msg(10, arg_6));
                                    },
                                    accessLevel: accessLevel,
                                    singleClickEdit: uts.SingleClickEdit,
                                });
                            }
                            else {
                                timesheet = unitialisedView;
                            }
                            break;
                        }
                        default: {
                            timesheet = unitialisedView;
                        }
                    }
                    const xs_56 = [createElement("div", createObj(ofArray([["className", join(" ", ["box-row", "header"])], (elems_18 = [userManagerView(ums_1)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_18))])]))), createElement("div", createObj(ofArray([["className", join(" ", ["box-row"])], (elems_19 = [createElement("hr", {}), commandElements_1, createElement("hr", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_19))])]))), createElement("div", createObj(ofArray([["className", join(" ", ["box-row"])], (elems_20 = [timesheetListViewCmdElemetns, createElement("hr", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_20))])]))), createElement("div", createObj(ofArray([["className", join(" ", ["box-row"])], (elems_21 = [createElement(RenderErrorComponent, {
                        state: uts,
                        dispatch: (arg_7) => {
                            dispatch(new Msg(10, arg_7));
                        },
                    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_21))])]))), createElement("div", {
                        className: join(" ", ["box-row", "content"]),
                        children: Interop_reactApi.Children.toArray([timesheet]),
                    })];
                    page = react.createElement(react.Fragment, {}, ...xs_56);
                    break;
                }
                case 1: {
                    page = createElement("div", createObj(ofArray([["className", "alert alert-waring"], (elems_23 = [createElement("label", {
                        children: "Uninitialised User Timesheet Component",
                    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_23))])])));
                    break;
                }
            }
            break;
        }
        case 5: {
            const matchValue_17 = [state.UserManagerState, state.PeriodManagerState];
            let pattern_matching_result_2, pms, ums_2;
            if (matchValue_17[0] != null) {
                if (matchValue_17[1] != null) {
                    pattern_matching_result_2 = 0;
                    pms = matchValue_17[1];
                    ums_2 = matchValue_17[0];
                }
                else {
                    pattern_matching_result_2 = 1;
                }
            }
            else {
                pattern_matching_result_2 = 1;
            }
            switch (pattern_matching_result_2) {
                case 0: {
                    const userManagerView_2 = userManagerView(ums_2);
                    const applicationUserIsAdmin_1 = defaultArg(map((u_5) => u_5.IsAdmin, ums_2.User), false);
                    const periodManagerComponent = createElement(Render_1, {
                        state: pms,
                        dispatch: (arg_8) => {
                            dispatch(new Msg(13, arg_8));
                        },
                        canEdit: applicationUserIsAdmin_1,
                    });
                    const xs_62 = [createElement("div", {
                        className: join(" ", ["box-row", "header"]),
                        children: Interop_reactApi.Children.toArray([userManagerView_2]),
                    }), createElement("div", createObj(ofArray([["className", join(" ", ["box-row", "content-middle"])], (elems_25 = [createElement("br", {}), periodManagerComponent], ["children", Interop_reactApi.Children.toArray(Array.from(elems_25))])])))];
                    page = react.createElement(react.Fragment, {}, ...xs_62);
                    break;
                }
                case 1: {
                    page = createElement("div", createObj(ofArray([["className", "alert alert-waring"], (elems_26 = [createElement("label", {
                        children: "Uninitialised User Timesheet Component",
                    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_26))])])));
                    break;
                }
            }
            break;
        }
        default: {
            const matchValue_1 = state.UserManagerState;
            if (matchValue_1 != null) {
                const ums = matchValue_1;
                const userManagerView_1 = userManagerView(ums);
                let thisMonthString;
                const dtn = now();
                const m = month(dtn) | 0;
                thisMonthString = createMonthString(year(dtn), m);
                let myCurrentTimesheetButton;
                const matchValue_2 = ums.User;
                if (matchValue_2 != null) {
                    const u = matchValue_2;
                    const userCode = u.UserCode;
                    const navigateToMyCurrentTimesheet = () => {
                        let tupledArg;
                        dispatch((tupledArg = [userCode, thisMonthString], new Msg(2, tupledArg[0], tupledArg[1])));
                    };
                    myCurrentTimesheetButton = row(singleton_1(createElement("button", {
                        className: join(" ", ["btn", "btn-lg", "btn-success"]),
                        children: "My Current Timesheet",
                        onClick: (_arg2) => {
                            navigateToMyCurrentTimesheet();
                        },
                    })));
                }
                else {
                    myCurrentTimesheetButton = row(singleton_1(createElement("button", {
                        className: join(" ", ["btn", "btn-lg", "btn-success", "disabled"]),
                        children: "Loading Identity",
                    })));
                }
                let myTimesheeetsThisMonthButton;
                const matchValue_3 = ums.User;
                if (matchValue_3 != null) {
                    const u_1 = matchValue_3;
                    const userCode_1 = u_1.UserCode;
                    const navigateToMyTimesheetsThisMonth = () => {
                        dispatch(new Msg(3, userCode_1));
                    };
                    myTimesheeetsThisMonthButton = row(singleton_1(createElement("button", {
                        className: join(" ", ["btn", "btn-lg", "btn-secondary"]),
                        children: "My Timesheets",
                        onClick: (_arg3) => {
                            navigateToMyTimesheetsThisMonth();
                        },
                    })));
                }
                else {
                    myTimesheeetsThisMonthButton = row(singleton_1(createElement("button", {
                        className: join(" ", ["btn", "btn-lg", "btn-primary", "disabled"]),
                        children: "Loading Identity",
                    })));
                }
                const navigateToTimesheetsByUser = () => {
                    dispatch(new Msg(4, thisMonthString));
                };
                const timesheetsByUserBtn = row(singleton_1(createElement("button", {
                    className: join(" ", ["btn", "btn-lg", "btn-secondary"]),
                    children: "Timesheets By User",
                    onClick: (_arg4) => {
                        navigateToTimesheetsByUser();
                    },
                })));
                const applicationUserIsAdmin = defaultArg(map((u_2) => u_2.IsAdmin, ums.User), false);
                const periodManagerButton = applicationUserIsAdmin ? row(singleton_1(createElement("button", {
                    className: join(" ", ["btn", "btn-lg", "btn-warning"]),
                    children: "(Admin) Period Manager",
                    onClick: (_arg5) => {
                        dispatch(new Msg(5));
                    },
                }))) : react.createElement(react.Fragment, {});
                const xs_18 = [createElement("div", createObj(ofArray([["className", join(" ", ["box-row", "header"])], (elems_7 = [userManagerView_1, createElement("br", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_7))])]))), createElement("div", createObj(ofArray([["className", join(" ", ["box-row"])], (elems_8 = [myCurrentTimesheetButton, createElement("br", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_8))])]))), createElement("div", createObj(ofArray([["className", join(" ", ["box-row"])], (elems_9 = [myTimesheeetsThisMonthButton, createElement("br", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_9))])]))), createElement("div", createObj(ofArray([["className", join(" ", ["box-row"])], (elems_10 = [timesheetsByUserBtn, createElement("br", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems_10))])]))), createElement("div", {
                    className: join(" ", ["box-row"]),
                    children: Interop_reactApi.Children.toArray([periodManagerButton]),
                })];
                page = react.createElement(react.Fragment, {}, ...xs_18);
            }
            else {
                page = createElement("div", createObj(ofArray([["className", "alert alert-waring"], (elems = [createElement("label", {
                    children: "Uninitialised User Timesheet Component",
                })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
            }
        }
    }
    const errorMessage = (msg) => {
        let elems_27;
        return createElement("div", createObj(ofArray([["className", "alert alert-danger"], (elems_27 = [createElement("label", {
            children: toText(printf("%s"))(msg),
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_27))])])));
    };
    return page;
}

