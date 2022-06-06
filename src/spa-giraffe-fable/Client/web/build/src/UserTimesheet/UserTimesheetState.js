import { Cmd_OfAsync_start, Cmd_OfAsyncWith_either, Cmd_OfFunc_result } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { UserTimesheetState, TimesheetListViewMsg } from "./UserTimesheetTypes.js";
import { length, tryFind, cons, reduce, head, tail, isEmpty, singleton, append, fold, filter, unzip, contains, ofArray, map, empty } from "../../fable_modules/fable-library.3.7.11/List.js";
import { ComponentState as ComponentState_6 } from "../FableApp.js";
import { taskWorkActual, resetRate, setDefaultRate, openTimesheet, closeTimesheet, postDeleteTimesheetLines, postTimesheetLines, getUserCodeMonthTimesheet, getCurrentTimesheet } from "./UserTimesheetHttp.js";
import { Cmd_batch, Cmd_none } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { safeHash, equals, stringHash } from "../../fable_modules/fable-library.3.7.11/Util.js";
import { TimesheetGridLineModule_defaultValues, Rate_nameOptionOfOfByteOption, User as User_1, Timesheet as Timesheet_3, TimeSheetLineModule_ofTimesheetGridLine, UserTimesheet as UserTimesheet_9, TimesheetGridLine, GridLineStatus as GridLineStatus_6 } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { List_distinct, List_except } from "../../fable_modules/fable-library.3.7.11/Seq2.js";
import { value as value_5, map as map_1 } from "../../fable_modules/fable-library.3.7.11/Option.js";
import { toString } from "../../fable_modules/fable-library.3.7.11/Decimal.js";
import { OptionBuilder__Return_1505, option as option_8, OptionBuilder__ReturnFrom_6F691636, OptionBuilder__Bind_Z424BC9ED, OptionBuilder__Delay_FCFD9EF, OptionBuilder__Run_FCFD9EF } from "../../fable_modules/FsToolkit.ErrorHandling.2.0.0/OptionCE.fs.js";
import { getUserByOid, unlockTimesheet } from "../UserManager/UserManagerHttp.js";

export function update(pci, msg, state) {
    let validateTimesheetGridLine, matchValue_18;
    switch (msg.tag) {
        case 1: {
            const result = msg.fields[0];
            if (result.tag === 1) {
                const statusCode = result.fields[0][0] | 0;
                const errorMessage = result.fields[0][1];
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, [statusCode, errorMessage]))];
            }
            else {
                const user = result.fields[0];
                return [new UserTimesheetState(state.ComponentState, state.SingleClickEdit, user, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), empty()];
            }
        }
        case 2: {
            return [new UserTimesheetState(new ComponentState_6(1), state.SingleClickEdit, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_OfAsyncWith_either((x_1) => {
                Cmd_OfAsync_start(x_1);
            }, getCurrentTimesheet, pci, (arg0_3) => (new TimesheetListViewMsg(3, arg0_3)), (arg0_4) => (new TimesheetListViewMsg(30, arg0_4)))];
        }
        case 4: {
            const userCode = msg.fields[0];
            const month = msg.fields[1] | 0;
            return [new UserTimesheetState(new ComponentState_6(1), state.SingleClickEdit, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_OfAsyncWith_either((x_2) => {
                Cmd_OfAsync_start(x_2);
            }, (tupledArg) => getUserCodeMonthTimesheet(tupledArg[0], tupledArg[1], tupledArg[2]), [pci, userCode, month], (arg0_5) => (new TimesheetListViewMsg(3, arg0_5)), (arg0_6) => (new TimesheetListViewMsg(30, arg0_6)))];
        }
        case 3: {
            const result_1 = msg.fields[0];
            if (result_1.tag === 1) {
                const statusCode_1 = result_1.fields[0][0] | 0;
                const errorMessage_1 = result_1.fields[0][1];
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, [statusCode_1, errorMessage_1]))];
            }
            else {
                const ts = result_1.fields[0];
                const insertCmdOrNone = (ts.Timesheet.TimesheetStatus === 0) ? Cmd_OfFunc_result(new TimesheetListViewMsg(9)) : Cmd_none();
                return [new UserTimesheetState(new ComponentState_6(3), state.SingleClickEdit, state.User, ts, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), insertCmdOrNone];
            }
        }
        case 10: {
            const timesheetGridLines = msg.fields[0];
            const matchValue_1 = state.UserTimesheet;
            if (matchValue_1 != null) {
                const timesheet = matchValue_1;
                const timesheetGridLinesToRemoveIds = map((tsgl) => tsgl.TimesheetLineId, ofArray(timesheetGridLines));
                const updatedTimesheetGridLines = map((tsl) => {
                    if (contains(tsl.TimesheetLineId, timesheetGridLinesToRemoveIds, {
                        Equals: (x_3, y) => (x_3 === y),
                        GetHashCode: stringHash,
                    })) {
                        if (equals(tsl.GridLineStatus, new GridLineStatus_6(5))) {
                            return new TimesheetGridLine(tsl.TimesheetLineId, tsl.TimesheetId, tsl.AssignmentId, tsl.Date, tsl.UserCode, tsl.Subject, tsl.ProjectCode, tsl.TaskName, tsl.UrgencyName, tsl.RateName, tsl.WorkBillable, tsl.WorkNonBillable, tsl.WorkOvertime, tsl.WorkOvertimeNonBillable, tsl.WorkBudgeted, tsl.WorkRemaining, tsl.WorkActual, tsl.FinishDatePlan, tsl.CreatedOn, tsl.CreatedBy, tsl.ModifiedOn, tsl.ModifiedBy, new GridLineStatus_6(2));
                        }
                        else {
                            return new TimesheetGridLine(tsl.TimesheetLineId, tsl.TimesheetId, tsl.AssignmentId, tsl.Date, tsl.UserCode, tsl.Subject, tsl.ProjectCode, tsl.TaskName, tsl.UrgencyName, tsl.RateName, tsl.WorkBillable, tsl.WorkNonBillable, tsl.WorkOvertime, tsl.WorkOvertimeNonBillable, tsl.WorkBudgeted, tsl.WorkRemaining, tsl.WorkActual, tsl.FinishDatePlan, tsl.CreatedOn, tsl.CreatedBy, tsl.ModifiedOn, tsl.ModifiedBy, new GridLineStatus_6(5));
                        }
                    }
                    else {
                        return tsl;
                    }
                }, timesheet.TimesheetGridLines);
                const updatedTimesheet = new UserTimesheet_9(timesheet.TimesheetOwner, timesheet.Timesheet, timesheet.TimesheetGridOptions, updatedTimesheetGridLines);
                return [new UserTimesheetState(state.ComponentState, state.SingleClickEdit, state.User, updatedTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("TimesheetLinesRemove on timesheet = None")))];
            }
        }
        case 11: {
            const matchValue_2 = state.UserTimesheet;
            if (matchValue_2 != null) {
                const timesheet_1 = matchValue_2;
                const patternInput = unzip(map((tgl_1) => {
                    const matchValue_3 = TimeSheetLineModule_ofTimesheetGridLine(tgl_1.TimesheetId, timesheet_1.Timesheet.StartDate, timesheet_1.TimesheetGridOptions, tgl_1);
                    if (matchValue_3.tag === 1) {
                        const eml = matchValue_3.fields[0];
                        return [void 0, [tgl_1, eml]];
                    }
                    else {
                        const tl = matchValue_3.fields[0];
                        return [tl, void 0];
                    }
                }, filter((tgl) => {
                    if (equals(tgl.GridLineStatus, new GridLineStatus_6(2))) {
                        return true;
                    }
                    else {
                        return equals(tgl.GridLineStatus, new GridLineStatus_6(4));
                    }
                }, timesheet_1.TimesheetGridLines)));
                const timesheetLineOs = patternInput[0];
                const failedTimesheetGridLinesOs = patternInput[1];
                const validatedTimesheetLines = fold((acc, elem) => {
                    if (elem != null) {
                        const elem_1 = elem;
                        return append(acc, singleton(elem_1));
                    }
                    else {
                        return acc;
                    }
                }, empty(), timesheetLineOs);
                const upsertCmd = isEmpty(validatedTimesheetLines) ? Cmd_none() : Cmd_OfFunc_result(new TimesheetListViewMsg(12, validatedTimesheetLines));
                const timsheetLinesToRemoveIds = map((tl_2) => tl_2.TimesheetLineId, filter((tl_1) => equals(tl_1.GridLineStatus, new GridLineStatus_6(5)), timesheet_1.TimesheetGridLines));
                const deleteCmd = isEmpty(timsheetLinesToRemoveIds) ? Cmd_none() : Cmd_OfFunc_result(new TimesheetListViewMsg(14, timsheetLinesToRemoveIds));
                const failedTimesheetGridLines = fold((acc_1, elem_2) => {
                    if (elem_2 != null) {
                        const elem_3 = elem_2;
                        return append(acc_1, singleton(elem_3));
                    }
                    else {
                        return acc_1;
                    }
                }, empty(), failedTimesheetGridLinesOs);
                const failedTimesheetGridLinesIds = map((tupledArg_1) => {
                    const ftgl = tupledArg_1[0];
                    return ftgl.TimesheetLineId;
                }, failedTimesheetGridLines);
                const timesheetLinesMarked = map((tgl_2) => {
                    if (contains(tgl_2.TimesheetLineId, failedTimesheetGridLinesIds, {
                        Equals: (x_4, y_1) => (x_4 === y_1),
                        GetHashCode: stringHash,
                    })) {
                        return new TimesheetGridLine(tgl_2.TimesheetLineId, tgl_2.TimesheetId, tgl_2.AssignmentId, tgl_2.Date, tgl_2.UserCode, tgl_2.Subject, tgl_2.ProjectCode, tgl_2.TaskName, tgl_2.UrgencyName, tgl_2.RateName, tgl_2.WorkBillable, tgl_2.WorkNonBillable, tgl_2.WorkOvertime, tgl_2.WorkOvertimeNonBillable, tgl_2.WorkBudgeted, tgl_2.WorkRemaining, tgl_2.WorkActual, tgl_2.FinishDatePlan, tgl_2.CreatedOn, tgl_2.CreatedBy, tgl_2.ModifiedOn, tgl_2.ModifiedBy, new GridLineStatus_6(4));
                    }
                    else {
                        return tgl_2;
                    }
                }, timesheet_1.TimesheetGridLines);
                let componentState;
                if (!isEmpty(failedTimesheetGridLines)) {
                    const t = tail(failedTimesheetGridLines);
                    const h = head(failedTimesheetGridLines);
                    const failedTimesheetGridLinesInfoes = map((tupledArg_2) => {
                        const timesheetLine = tupledArg_2[0];
                        const errmsgs = tupledArg_2[1];
                        return `TimesheetLine: ${timesheetLine.Date} errors: ${reduce((x_5, y_2) => (x_5 + y_2), errmsgs)}`;
                    }, failedTimesheetGridLines);
                    const failedTimesheetGridLines$0027 = cons("Some Timesheet Lines failed the validation (are market faulty):", failedTimesheetGridLinesInfoes);
                    const failedTimesheetGridLines$0027_1 = failedTimesheetGridLinesInfoes;
                    componentState = (new ComponentState_6(2, failedTimesheetGridLines$0027_1));
                }
                else {
                    componentState = (new ComponentState_6(3));
                }
                const modifiedTimesheet = new UserTimesheet_9(timesheet_1.TimesheetOwner, timesheet_1.Timesheet, timesheet_1.TimesheetGridOptions, timesheetLinesMarked);
                return [new UserTimesheetState(componentState, state.SingleClickEdit, state.User, modifiedTimesheet, state.TimesheetLinesToSave, failedTimesheetGridLines), Cmd_batch(ofArray([upsertCmd, deleteCmd]))];
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("TimesheetLinesRemove on timesheet = None")))];
            }
        }
        case 12: {
            const timesheetLines = msg.fields[0];
            return [new UserTimesheetState(new ComponentState_6(1), state.SingleClickEdit, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_OfAsyncWith_either((x_6) => {
                Cmd_OfAsync_start(x_6);
            }, (tupledArg_3) => postTimesheetLines(tupledArg_3[0], tupledArg_3[1]), [pci, timesheetLines], (arg0_12) => (new TimesheetListViewMsg(13, arg0_12)), (arg0_13) => (new TimesheetListViewMsg(30, arg0_13)))];
        }
        case 13: {
            const response = msg.fields[0];
            if (response.tag === 0) {
                const updatedTimesheeetLinesIds = response.fields[0];
                let updatedUserTimesheet;
                const matchValue_5 = state.UserTimesheet;
                if (matchValue_5 != null) {
                    const ts_1 = matchValue_5;
                    const updatedTimesheetLines = map((tsl_1) => {
                        if (contains(tsl_1.TimesheetLineId, updatedTimesheeetLinesIds, {
                            Equals: (x_7, y_3) => (x_7 === y_3),
                            GetHashCode: stringHash,
                        })) {
                            return new TimesheetGridLine(tsl_1.TimesheetLineId, tsl_1.TimesheetId, tsl_1.AssignmentId, tsl_1.Date, tsl_1.UserCode, tsl_1.Subject, tsl_1.ProjectCode, tsl_1.TaskName, tsl_1.UrgencyName, tsl_1.RateName, tsl_1.WorkBillable, tsl_1.WorkNonBillable, tsl_1.WorkOvertime, tsl_1.WorkOvertimeNonBillable, tsl_1.WorkBudgeted, tsl_1.WorkRemaining, tsl_1.WorkActual, tsl_1.FinishDatePlan, tsl_1.CreatedOn, tsl_1.CreatedBy, tsl_1.ModifiedOn, tsl_1.ModifiedBy, new GridLineStatus_6(3));
                        }
                        else {
                            return tsl_1;
                        }
                    }, ts_1.TimesheetGridLines);
                    updatedUserTimesheet = (new UserTimesheet_9(ts_1.TimesheetOwner, ts_1.Timesheet, ts_1.TimesheetGridOptions, updatedTimesheetLines));
                }
                else {
                    updatedUserTimesheet = (void 0);
                }
                let componentState_1;
                const matchValue_6 = state.TimesheetGridLinesFailedValidation;
                if (!isEmpty(matchValue_6)) {
                    const t_1 = tail(matchValue_6);
                    const h_1 = head(matchValue_6);
                    const failedTimesheetGridLines_1 = matchValue_6;
                    const failedTimesheetGridLinesInfoes_1 = map((tupledArg_4) => {
                        const timesheetLine_1 = tupledArg_4[0];
                        const errmsgs_1 = tupledArg_4[1];
                        return `TimesheetLine: ${timesheetLine_1.Date} errors: ${reduce((x_8, y_4) => (x_8 + y_4), errmsgs_1)}`;
                    }, failedTimesheetGridLines_1);
                    const failedTimesheetGridLines$0027_2 = cons("Some Timesheet Lines failed the validation (are market faulty):", failedTimesheetGridLinesInfoes_1);
                    componentState_1 = (new ComponentState_6(2, failedTimesheetGridLines$0027_2));
                }
                else {
                    componentState_1 = (new ComponentState_6(3));
                }
                return [new UserTimesheetState(componentState_1, state.SingleClickEdit, state.User, updatedUserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_OfFunc_result(new TimesheetListViewMsg(26))];
            }
            else {
                const e = response.fields[0];
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, e))];
            }
        }
        case 14: {
            const timesheetLinesIds = msg.fields[0];
            return [new UserTimesheetState(new ComponentState_6(1), state.SingleClickEdit, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_OfAsyncWith_either((x_9) => {
                Cmd_OfAsync_start(x_9);
            }, (tupledArg_5) => postDeleteTimesheetLines(tupledArg_5[0], tupledArg_5[1]), [pci, timesheetLinesIds], (arg0_16) => (new TimesheetListViewMsg(15, arg0_16)), (arg0_17) => (new TimesheetListViewMsg(30, arg0_17)))];
        }
        case 15: {
            const response_1 = msg.fields[0];
            if (response_1.tag === 0) {
                const deletedTimesheetGridLinesIds = response_1.fields[0];
                let updatedTimesheet_1;
                const matchValue_7 = state.UserTimesheet;
                if (matchValue_7 != null) {
                    const timesheet_2 = matchValue_7;
                    const timesheetGridLinesToExcept = filter((tsgl_2) => contains(tsgl_2.TimesheetLineId, deletedTimesheetGridLinesIds, {
                        Equals: (x_10, y_5) => (x_10 === y_5),
                        GetHashCode: stringHash,
                    }), timesheet_2.TimesheetGridLines);
                    const updatedTimesheetGridLines_1 = List_except(timesheetGridLinesToExcept, timesheet_2.TimesheetGridLines, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    });
                    updatedTimesheet_1 = (new UserTimesheet_9(timesheet_2.TimesheetOwner, timesheet_2.Timesheet, timesheet_2.TimesheetGridOptions, updatedTimesheetGridLines_1));
                }
                else {
                    updatedTimesheet_1 = (void 0);
                }
                return [new UserTimesheetState(new ComponentState_6(3), state.SingleClickEdit, state.User, updatedTimesheet_1, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
            }
            else {
                const e_1 = response_1.fields[0];
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, e_1))];
            }
        }
        case 18: {
            let closeTimesheetCommandOrError;
            const matchValue_8 = state.UserTimesheet;
            if (matchValue_8 == null) {
                closeTimesheetCommandOrError = Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("CloseTimesheetReq: Timesheet is None.")));
            }
            else {
                const uts = matchValue_8;
                closeTimesheetCommandOrError = Cmd_OfAsyncWith_either((x_12) => {
                    Cmd_OfAsync_start(x_12);
                }, (tupledArg_6) => closeTimesheet(tupledArg_6[0], tupledArg_6[1]), [pci, uts.Timesheet.TimesheetId], (arg0_20) => (new TimesheetListViewMsg(19, arg0_20)), (arg0_21) => (new TimesheetListViewMsg(30, arg0_21)));
            }
            return [new UserTimesheetState(new ComponentState_6(1), state.SingleClickEdit, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), closeTimesheetCommandOrError];
        }
        case 19: {
            const closeTimesheetRes = msg.fields[0];
            if (closeTimesheetRes.tag === 1) {
                const statusCode_2 = closeTimesheetRes.fields[0][0] | 0;
                const errorMessage_2 = closeTimesheetRes.fields[0][1];
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, [statusCode_2, errorMessage_2]))];
            }
            else {
                const updatedUserTimesheet_1 = map_1((ut) => {
                    let inputRecord;
                    return new UserTimesheet_9(ut.TimesheetOwner, (inputRecord = ut.Timesheet, new Timesheet_3(inputRecord.TimesheetId, inputRecord.UserId, 1, inputRecord.StartDate, inputRecord.EndDate, inputRecord.PeriodStatus)), ut.TimesheetGridOptions, ut.TimesheetGridLines);
                }, state.UserTimesheet);
                return [new UserTimesheetState(new ComponentState_6(3), state.SingleClickEdit, state.User, updatedUserTimesheet_1, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
            }
        }
        case 20: {
            let openTimesheetCmdOrError;
            const matchValue_9 = state.UserTimesheet;
            if (matchValue_9 == null) {
                openTimesheetCmdOrError = Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("OpenTimesheetReq: Timesheet is None.")));
            }
            else {
                const uts_1 = matchValue_9;
                openTimesheetCmdOrError = Cmd_OfAsyncWith_either((x_13) => {
                    Cmd_OfAsync_start(x_13);
                }, (tupledArg_7) => openTimesheet(tupledArg_7[0], tupledArg_7[1]), [pci, uts_1.Timesheet.TimesheetId], (arg0_24) => (new TimesheetListViewMsg(21, arg0_24)), (arg0_25) => (new TimesheetListViewMsg(30, arg0_25)));
            }
            return [new UserTimesheetState(new ComponentState_6(1), state.SingleClickEdit, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), openTimesheetCmdOrError];
        }
        case 21: {
            const openTimesheetRes = msg.fields[0];
            if (openTimesheetRes.tag === 1) {
                const statusCode_3 = openTimesheetRes.fields[0][0] | 0;
                const errorMessage_3 = openTimesheetRes.fields[0][1];
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, [statusCode_3, errorMessage_3]))];
            }
            else {
                const updatedUserTimesheet_2 = map_1((ut_1) => {
                    let inputRecord_1;
                    return new UserTimesheet_9(ut_1.TimesheetOwner, (inputRecord_1 = ut_1.Timesheet, new Timesheet_3(inputRecord_1.TimesheetId, inputRecord_1.UserId, 0, inputRecord_1.StartDate, inputRecord_1.EndDate, inputRecord_1.PeriodStatus)), ut_1.TimesheetGridOptions, ut_1.TimesheetGridLines);
                }, state.UserTimesheet);
                return [new UserTimesheetState(new ComponentState_6(3), state.SingleClickEdit, state.User, updatedUserTimesheet_2, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
            }
        }
        case 22: {
            const userId = msg.fields[0];
            const rate = msg.fields[1];
            return [state, Cmd_OfAsyncWith_either((x_14) => {
                Cmd_OfAsync_start(x_14);
            }, (tupledArg_8) => setDefaultRate(tupledArg_8[0], tupledArg_8[1], tupledArg_8[2]), [pci, userId, rate], (arg0_28) => (new TimesheetListViewMsg(23, arg0_28)), (arg0_29) => (new TimesheetListViewMsg(30, arg0_29)))];
        }
        case 23: {
            const res = msg.fields[0];
            const matchValue_10 = state.User;
            if (matchValue_10 != null) {
                const user_1 = matchValue_10;
                if (res.tag === 1) {
                    const statusCode_4 = res.fields[0][0] | 0;
                    const errorMessage_4 = res.fields[0][1];
                    return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, [statusCode_4, errorMessage_4]))];
                }
                else {
                    const rate_2 = res.fields[0];
                    const updatedUser = new User_1(user_1.UserId, user_1.UserCode, user_1.UserName, user_1.Email, user_1.UserStatus, user_1.AzureObjectId, user_1.SourceType, rate_2, user_1.IsAdmin);
                    return [new UserTimesheetState(state.ComponentState, state.SingleClickEdit, state.User, map_1((ut_2) => (new UserTimesheet_9(updatedUser, ut_2.Timesheet, ut_2.TimesheetGridOptions, ut_2.TimesheetGridLines)), state.UserTimesheet), state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
                }
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("Can not set default rate - User is none")))];
            }
        }
        case 24: {
            const userId_2 = msg.fields[0];
            return [state, Cmd_OfAsyncWith_either((x_15) => {
                Cmd_OfAsync_start(x_15);
            }, (tupledArg_9) => resetRate(tupledArg_9[0], tupledArg_9[1]), [pci, userId_2], (arg0_32) => (new TimesheetListViewMsg(25, arg0_32)), (arg0_33) => (new TimesheetListViewMsg(30, arg0_33)))];
        }
        case 25: {
            const res_1 = msg.fields[0];
            const matchValue_11 = state.User;
            if (matchValue_11 != null) {
                const user_2 = matchValue_11;
                if (res_1.tag === 1) {
                    const statusCode_5 = res_1.fields[0][0] | 0;
                    const errorMessage_5 = res_1.fields[0][1];
                    return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, [statusCode_5, errorMessage_5]))];
                }
                else {
                    const updatedUser_1 = new User_1(user_2.UserId, user_2.UserCode, user_2.UserName, user_2.Email, user_2.UserStatus, user_2.AzureObjectId, user_2.SourceType, void 0, user_2.IsAdmin);
                    return [new UserTimesheetState(state.ComponentState, state.SingleClickEdit, state.User, map_1((ut_3) => (new UserTimesheet_9(updatedUser_1, ut_3.Timesheet, ut_3.TimesheetGridOptions, ut_3.TimesheetGridLines)), state.UserTimesheet), state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
                }
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("Can not set default rate - User is none.")))];
            }
        }
        case 26: {
            const matchValue_12 = state.UserTimesheet;
            if (matchValue_12 != null) {
                const userTimesheet = matchValue_12;
                const taskNames = List_distinct(map((gridLine_1) => value_5(gridLine_1.TaskName), filter((gridLine) => (gridLine.TaskName != null), userTimesheet.TimesheetGridLines)), {
                    Equals: (x_16, y_7) => (x_16 === y_7),
                    GetHashCode: stringHash,
                });
                const taskIds = reduce(append, map((taskName) => List_distinct(map((taskReferenece_1) => taskReferenece_1.TaskId, filter((taskReferenece) => (taskReferenece.TaskName.indexOf(taskName) >= 0), userTimesheet.TimesheetGridOptions.Tasks)), {
                    Equals: (x_17, y_8) => (x_17 === y_8),
                    GetHashCode: stringHash,
                }), taskNames));
                const requests = isEmpty(taskIds) ? empty() : map((taskId) => Cmd_OfFunc_result(new TimesheetListViewMsg(27, taskId)), taskIds);
                return [state, Cmd_batch(requests)];
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("Can not update work actual - User of UserTimesheet is None.")))];
            }
        }
        case 27: {
            const taskId_1 = msg.fields[0];
            const matchValue_13 = state.UserTimesheet;
            if (matchValue_13 != null) {
                const userTimesheet_1 = matchValue_13;
                const userId_4 = userTimesheet_1.TimesheetOwner.UserId;
                return [state, Cmd_OfAsyncWith_either((x_18) => {
                    Cmd_OfAsync_start(x_18);
                }, (tupledArg_10) => taskWorkActual(tupledArg_10[0], tupledArg_10[1], tupledArg_10[2]), [pci, taskId_1, userId_4], (arg0_39) => (new TimesheetListViewMsg(28, arg0_39)), (arg0_40) => (new TimesheetListViewMsg(30, arg0_40)))];
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("Can not update work actual - UserTimesheet is none.")))];
            }
        }
        case 28: {
            const response_2 = msg.fields[0];
            const matchValue_14 = state.UserTimesheet;
            if (matchValue_14 != null) {
                const userTimesheet_2 = matchValue_14;
                if (response_2.tag === 0) {
                    const workActual = response_2.fields[0][1];
                    const taskId_3 = response_2.fields[0][0];
                    const timesheetGridLines_1 = userTimesheet_2.TimesheetGridLines;
                    const taskReferences = userTimesheet_2.TimesheetGridOptions.Tasks;
                    const taskNameO = map_1((tr_1) => tr_1.TaskName, tryFind((tr) => (tr.TaskId === taskId_3), taskReferences));
                    if (taskNameO != null) {
                        const taskName_1 = taskNameO;
                        const updatedTimesheetGridLines_2 = map((timesheetGridLine) => {
                            const matchValue_15 = timesheetGridLine.TaskName;
                            if (matchValue_15 != null) {
                                const gridLineTaskName = matchValue_15;
                                if (gridLineTaskName.indexOf(taskName_1) >= 0) {
                                    return new TimesheetGridLine(timesheetGridLine.TimesheetLineId, timesheetGridLine.TimesheetId, timesheetGridLine.AssignmentId, timesheetGridLine.Date, timesheetGridLine.UserCode, timesheetGridLine.Subject, timesheetGridLine.ProjectCode, timesheetGridLine.TaskName, timesheetGridLine.UrgencyName, timesheetGridLine.RateName, timesheetGridLine.WorkBillable, timesheetGridLine.WorkNonBillable, timesheetGridLine.WorkOvertime, timesheetGridLine.WorkOvertimeNonBillable, timesheetGridLine.WorkBudgeted, timesheetGridLine.WorkRemaining, toString(workActual), timesheetGridLine.FinishDatePlan, timesheetGridLine.CreatedOn, timesheetGridLine.CreatedBy, timesheetGridLine.ModifiedOn, timesheetGridLine.ModifiedBy, timesheetGridLine.GridLineStatus);
                                }
                                else {
                                    return timesheetGridLine;
                                }
                            }
                            else {
                                return timesheetGridLine;
                            }
                        }, timesheetGridLines_1);
                        const updatedTimesheet_2 = new UserTimesheet_9(userTimesheet_2.TimesheetOwner, userTimesheet_2.Timesheet, userTimesheet_2.TimesheetGridOptions, updatedTimesheetGridLines_2);
                        return [new UserTimesheetState(state.ComponentState, state.SingleClickEdit, state.User, updatedTimesheet_2, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
                    }
                    else {
                        return [state, Cmd_none()];
                    }
                }
                else {
                    const statusCode_6 = response_2.fields[0][0] | 0;
                    const errorMessage_6 = response_2.fields[0][1];
                    return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, [statusCode_6, errorMessage_6]))];
                }
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("Can not update work actual - UserTimesheet is none.")))];
            }
        }
        case 5: {
            const b = msg.fields[0];
            return [new UserTimesheetState(state.ComponentState, b, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
        }
        case 6: {
            const timesgeetGridLine = msg.fields[0];
            const matchValue_16 = state.UserTimesheet;
            if (matchValue_16 != null) {
                const timesheet_3 = matchValue_16;
                const updatedTimesheetGridLines_3 = append(timesheet_3.TimesheetGridLines, singleton(timesgeetGridLine));
                const updatedTimesheet_3 = new UserTimesheet_9(timesheet_3.TimesheetOwner, timesheet_3.Timesheet, timesheet_3.TimesheetGridOptions, updatedTimesheetGridLines_3);
                return [new UserTimesheetState(state.ComponentState, state.SingleClickEdit, state.User, updatedTimesheet_3, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), empty()];
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("TimesheetLinesRemove on timesheet = None")))];
            }
        }
        case 7: {
            const timesheetGridLine_1 = msg.fields[1];
            const isLastRowNode = msg.fields[0];
            const matchValue_17 = state.UserTimesheet;
            if (matchValue_17 != null) {
                const userTimesheet_3 = matchValue_17;
                return [state, (validateTimesheetGridLine = TimeSheetLineModule_ofTimesheetGridLine(userTimesheet_3.Timesheet.TimesheetId, userTimesheet_3.Timesheet.StartDate, userTimesheet_3.TimesheetGridOptions, timesheetGridLine_1), (matchValue_18 = [validateTimesheetGridLine, isLastRowNode], (matchValue_18[0].tag === 0) ? (matchValue_18[1] ? Cmd_batch(singleton(Cmd_OfFunc_result(new TimesheetListViewMsg(9)))) : Cmd_none()) : Cmd_none()))];
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("TimesheetLinesRemove on timesheet = None")))];
            }
        }
        case 8: {
            const timesheetGridLine_2 = msg.fields[0];
            const matchValue_19 = state.UserTimesheet;
            if (matchValue_19 != null) {
                const timesheet_4 = matchValue_19;
                let updatedTimesheetLine;
                let t_3;
                const t_2 = timesheetGridLine_2;
                t_3 = (equals(t_2.GridLineStatus, new GridLineStatus_6(5)) ? t_2 : (new TimesheetGridLine(t_2.TimesheetLineId, t_2.TimesheetId, t_2.AssignmentId, t_2.Date, t_2.UserCode, t_2.Subject, t_2.ProjectCode, t_2.TaskName, t_2.UrgencyName, t_2.RateName, t_2.WorkBillable, t_2.WorkNonBillable, t_2.WorkOvertime, t_2.WorkOvertimeNonBillable, t_2.WorkBudgeted, t_2.WorkRemaining, t_2.WorkActual, t_2.FinishDatePlan, t_2.CreatedOn, t_2.CreatedBy, t_2.ModifiedOn, t_2.ModifiedBy, new GridLineStatus_6(2))));
                const defaultTaskName_1 = OptionBuilder__Run_FCFD9EF(option_8, OptionBuilder__Delay_FCFD9EF(option_8, () => OptionBuilder__Bind_Z424BC9ED(option_8, t_3.ProjectCode, (_arg1_1) => {
                    const projectCode = _arg1_1;
                    return OptionBuilder__Bind_Z424BC9ED(option_8, tryFind((p) => (p.Name === projectCode), timesheet_4.TimesheetGridOptions.Projects), (_arg2) => {
                        let l;
                        const defaultProject = _arg2;
                        const defaultProjectId = defaultProject.Id;
                        const defaultTaskName = map_1((tr_3) => tr_3.TaskName, (l = filter((t_4) => (t_4.ProjectId === defaultProjectId), timesheet_4.TimesheetGridOptions.Tasks), (length(l) === 1) ? head(l) : (void 0)));
                        return OptionBuilder__ReturnFrom_6F691636(option_8, defaultTaskName);
                    });
                })));
                if (defaultTaskName_1 == null) {
                    updatedTimesheetLine = t_3;
                }
                else {
                    const s = defaultTaskName_1;
                    updatedTimesheetLine = (new TimesheetGridLine(t_3.TimesheetLineId, t_3.TimesheetId, t_3.AssignmentId, t_3.Date, t_3.UserCode, t_3.Subject, t_3.ProjectCode, s, t_3.UrgencyName, t_3.RateName, t_3.WorkBillable, t_3.WorkNonBillable, t_3.WorkOvertime, t_3.WorkOvertimeNonBillable, t_3.WorkBudgeted, t_3.WorkRemaining, t_3.WorkActual, t_3.FinishDatePlan, t_3.CreatedOn, t_3.CreatedBy, t_3.ModifiedOn, t_3.ModifiedBy, t_3.GridLineStatus));
                }
                const updatedTimesheetGridLines_4 = map((tgl_3) => {
                    if (tgl_3.TimesheetLineId === timesheetGridLine_2.TimesheetLineId) {
                        return updatedTimesheetLine;
                    }
                    else {
                        return tgl_3;
                    }
                }, timesheet_4.TimesheetGridLines);
                const updatedTimesheet_4 = new UserTimesheet_9(timesheet_4.TimesheetOwner, timesheet_4.Timesheet, timesheet_4.TimesheetGridOptions, updatedTimesheetGridLines_4);
                return [new UserTimesheetState(state.ComponentState, state.SingleClickEdit, state.User, updatedTimesheet_4, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("TimesheetLinesRemove on timesheet = None")))];
            }
        }
        case 9: {
            const defaultRate = OptionBuilder__Run_FCFD9EF(option_8, OptionBuilder__Delay_FCFD9EF(option_8, () => OptionBuilder__Bind_Z424BC9ED(option_8, state.UserTimesheet, (_arg3) => {
                const ut_4 = _arg3;
                return OptionBuilder__ReturnFrom_6F691636(option_8, Rate_nameOptionOfOfByteOption(ut_4.TimesheetOwner.Rate));
            })));
            const updatedTimesheet_5 = OptionBuilder__Run_FCFD9EF(option_8, OptionBuilder__Delay_FCFD9EF(option_8, () => OptionBuilder__Bind_Z424BC9ED(option_8, state.UserTimesheet, (_arg4) => {
                const timesheet_5 = _arg4;
                const gridLine_2 = TimesheetGridLineModule_defaultValues(timesheet_5.TimesheetOwner.UserCode, timesheet_5.Timesheet.TimesheetId, defaultRate);
                const gridLines = append(timesheet_5.TimesheetGridLines, singleton(gridLine_2));
                return OptionBuilder__Return_1505(option_8, new UserTimesheet_9(timesheet_5.TimesheetOwner, timesheet_5.Timesheet, timesheet_5.TimesheetGridOptions, gridLines));
            })));
            if (updatedTimesheet_5 != null) {
                const ut_5 = updatedTimesheet_5;
                return [new UserTimesheetState(state.ComponentState, state.SingleClickEdit, state.User, ut_5, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
            }
            else {
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(30, new Error("Could not insert empty line to timesheet.")))];
            }
        }
        case 29: {
            const updatedUserTimesheet_3 = map_1((ut_6) => {
                const updatedGridLines = map((tgl_4) => {
                    if (equals(tgl_4.GridLineStatus, new GridLineStatus_6(4))) {
                        return new TimesheetGridLine(tgl_4.TimesheetLineId, tgl_4.TimesheetId, tgl_4.AssignmentId, tgl_4.Date, tgl_4.UserCode, tgl_4.Subject, tgl_4.ProjectCode, tgl_4.TaskName, tgl_4.UrgencyName, tgl_4.RateName, tgl_4.WorkBillable, tgl_4.WorkNonBillable, tgl_4.WorkOvertime, tgl_4.WorkOvertimeNonBillable, tgl_4.WorkBudgeted, tgl_4.WorkRemaining, tgl_4.WorkActual, tgl_4.FinishDatePlan, tgl_4.CreatedOn, tgl_4.CreatedBy, tgl_4.ModifiedOn, tgl_4.ModifiedBy, new GridLineStatus_6(2));
                    }
                    else {
                        return tgl_4;
                    }
                }, ut_6.TimesheetGridLines);
                return new UserTimesheet_9(ut_6.TimesheetOwner, ut_6.Timesheet, ut_6.TimesheetGridOptions, updatedGridLines);
            }, state.UserTimesheet);
            return [new UserTimesheetState(new ComponentState_6(3), state.SingleClickEdit, state.User, updatedUserTimesheet_3, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
        }
        case 30: {
            const exn = msg.fields[0];
            return [new UserTimesheetState(new ComponentState_6(2, singleton(exn.message)), state.SingleClickEdit, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
        }
        case 31: {
            const httpError = msg.fields[0];
            const errorMessage_7 = httpError[1];
            const errorCode = httpError[0] | 0;
            const httpErrorMessage = `HTTP Error ${errorCode} - ${errorMessage_7}`;
            return [new UserTimesheetState(new ComponentState_6(2, singleton(httpErrorMessage)), state.SingleClickEdit, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
        }
        case 16: {
            const timesheetId_3 = msg.fields[0];
            return [new UserTimesheetState(new ComponentState_6(1), state.SingleClickEdit, state.User, state.UserTimesheet, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_OfAsyncWith_either((x_19) => {
                Cmd_OfAsync_start(x_19);
            }, (tupledArg_11) => unlockTimesheet(tupledArg_11[0], tupledArg_11[1]), [pci, timesheetId_3], (arg0_48) => (new TimesheetListViewMsg(17, arg0_48)), (arg0_49) => (new TimesheetListViewMsg(30, arg0_49)))];
        }
        case 17: {
            const unlockTimesheetRes = msg.fields[0];
            if (unlockTimesheetRes.tag === 1) {
                const statusCode_7 = unlockTimesheetRes.fields[0][0] | 0;
                const errorMessage_8 = unlockTimesheetRes.fields[0][1];
                return [state, Cmd_OfFunc_result(new TimesheetListViewMsg(31, [statusCode_7, errorMessage_8]))];
            }
            else {
                const updatedUserTimesheet_4 = map_1((ut_7) => {
                    let inputRecord_2;
                    return new UserTimesheet_9(ut_7.TimesheetOwner, (inputRecord_2 = ut_7.Timesheet, new Timesheet_3(inputRecord_2.TimesheetId, inputRecord_2.UserId, 2, inputRecord_2.StartDate, inputRecord_2.EndDate, inputRecord_2.PeriodStatus)), ut_7.TimesheetGridOptions, ut_7.TimesheetGridLines);
                }, state.UserTimesheet);
                return [new UserTimesheetState(new ComponentState_6(3), state.SingleClickEdit, state.User, updatedUserTimesheet_4, state.TimesheetLinesToSave, state.TimesheetGridLinesFailedValidation), Cmd_none()];
            }
        }
        default: {
            return [state, Cmd_OfAsyncWith_either((x) => {
                Cmd_OfAsync_start(x);
            }, getUserByOid, pci, (arg0) => (new TimesheetListViewMsg(1, arg0)), (arg0_1) => (new TimesheetListViewMsg(30, arg0_1)))];
        }
    }
}

