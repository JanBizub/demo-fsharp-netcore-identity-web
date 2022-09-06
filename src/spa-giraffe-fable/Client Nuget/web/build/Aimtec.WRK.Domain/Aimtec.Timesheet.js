import { FSharpRef, toString as toString_2, Union, Record } from "../fable_modules/fable-library.3.7.11/Types.js";
import { union_type, bool_type, option_type, uint8_type, list_type, int32_type, record_type, string_type, class_type } from "../fable_modules/fable-library.3.7.11/Reflection.js";
import { value as value_7, map } from "../fable_modules/fable-library.3.7.11/Option.js";
import { Result_Map, FSharpResult$2, Result_Bind, FSharpChoice$5 } from "../fable_modules/fable-library.3.7.11/Choice.js";
import { find, exists, filter, tryFind, singleton, ofArray } from "../fable_modules/fable-library.3.7.11/List.js";
import { newGuid } from "../fable_modules/fable-library.3.7.11/Guid.js";
import { month, tryParse, minValue, toString, now } from "../fable_modules/fable-library.3.7.11/Date.js";
import { tryParse as tryParse_1, fromParts, toString as toString_1 } from "../fable_modules/fable-library.3.7.11/Decimal.js";
import Decimal from "../fable_modules/fable-library.3.7.11/Decimal.js";
import { startsWith, isNullOrWhiteSpace, isNullOrEmpty } from "../fable_modules/fable-library.3.7.11/String.js";
import { ValidationCE_validation, ValidationCE_ValidationBuilder__Delay_Z29103BAD, ValidationCE_ValidationBuilder__Run_Z29103BAD } from "../fable_modules/FsToolkit.ErrorHandling.2.0.0/ValidationCE.fs.js";
import { Validation_ofResult, Validation_zip, Validation_bind } from "../fable_modules/FsToolkit.ErrorHandling.2.0.0/Validation.fs.js";
import { ResultCE_result, ResultCE_ResultBuilder__Delay_Z4709C901 } from "../fable_modules/FsToolkit.ErrorHandling.2.0.0/ResultCE.fs.js";

export class EntityReference extends Record {
    constructor(Id, Name) {
        super();
        this.Id = Id;
        this.Name = Name;
    }
}

export function EntityReference$reflection() {
    return record_type("Aimtec.Timesheets.EntityReference", [], EntityReference, () => [["Id", class_type("System.Guid")], ["Name", string_type]]);
}

export class OptionReference extends Record {
    constructor(Option, Label) {
        super();
        this.Option = (Option | 0);
        this.Label = Label;
    }
}

export function OptionReference$reflection() {
    return record_type("Aimtec.Timesheets.OptionReference", [], OptionReference, () => [["Option", int32_type], ["Label", string_type]]);
}

export class TaskReference extends Record {
    constructor(TaskId, ProjectId, TaskName) {
        super();
        this.TaskId = TaskId;
        this.ProjectId = ProjectId;
        this.TaskName = TaskName;
    }
}

export function TaskReference$reflection() {
    return record_type("Aimtec.Timesheets.TaskReference", [], TaskReference, () => [["TaskId", class_type("System.Guid")], ["ProjectId", class_type("System.Guid")], ["TaskName", string_type]]);
}

export class TimesheetGridOptions extends Record {
    constructor(Users, Projects, Tasks, Urgencies, Rates) {
        super();
        this.Users = Users;
        this.Projects = Projects;
        this.Tasks = Tasks;
        this.Urgencies = Urgencies;
        this.Rates = Rates;
    }
}

export function TimesheetGridOptions$reflection() {
    return record_type("Aimtec.Timesheets.TimesheetGridOptions", [], TimesheetGridOptions, () => [["Users", list_type(EntityReference$reflection())], ["Projects", list_type(EntityReference$reflection())], ["Tasks", list_type(TaskReference$reflection())], ["Urgencies", list_type(OptionReference$reflection())], ["Rates", list_type(OptionReference$reflection())]]);
}

export class User extends Record {
    constructor(UserId, UserCode, UserName, Email, UserStatus, AzureObjectId, SourceType, Rate, IsAdmin) {
        super();
        this.UserId = UserId;
        this.UserCode = UserCode;
        this.UserName = UserName;
        this.Email = Email;
        this.UserStatus = UserStatus;
        this.AzureObjectId = AzureObjectId;
        this.SourceType = SourceType;
        this.Rate = Rate;
        this.IsAdmin = IsAdmin;
    }
}

export function User$reflection() {
    return record_type("Aimtec.Timesheets.User", [], User, () => [["UserId", class_type("System.Guid")], ["UserCode", string_type], ["UserName", string_type], ["Email", string_type], ["UserStatus", uint8_type], ["AzureObjectId", option_type(class_type("System.Guid"))], ["SourceType", uint8_type], ["Rate", option_type(uint8_type)], ["IsAdmin", bool_type]]);
}

export class GridLineStatus extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Created", "Fetched", "Modified", "Saved", "Faulty", "ToRemove"];
    }
}

export function GridLineStatus$reflection() {
    return union_type("Aimtec.Timesheets.GridLineStatus", [], GridLineStatus, () => [[], [], [], [], [], []]);
}

export class TimesheetGridLine extends Record {
    constructor(TimesheetLineId, TimesheetId, AssignmentId, Date$, UserCode, Subject, ProjectCode, TaskName, UrgencyName, RateName, WorkBillable, WorkNonBillable, WorkOvertime, WorkOvertimeNonBillable, WorkBudgeted, WorkRemaining, WorkActual, FinishDatePlan, CreatedOn, CreatedBy, ModifiedOn, ModifiedBy, GridLineStatus) {
        super();
        this.TimesheetLineId = TimesheetLineId;
        this.TimesheetId = TimesheetId;
        this.AssignmentId = AssignmentId;
        this.Date = Date$;
        this.UserCode = UserCode;
        this.Subject = Subject;
        this.ProjectCode = ProjectCode;
        this.TaskName = TaskName;
        this.UrgencyName = UrgencyName;
        this.RateName = RateName;
        this.WorkBillable = WorkBillable;
        this.WorkNonBillable = WorkNonBillable;
        this.WorkOvertime = WorkOvertime;
        this.WorkOvertimeNonBillable = WorkOvertimeNonBillable;
        this.WorkBudgeted = WorkBudgeted;
        this.WorkRemaining = WorkRemaining;
        this.WorkActual = WorkActual;
        this.FinishDatePlan = FinishDatePlan;
        this.CreatedOn = CreatedOn;
        this.CreatedBy = CreatedBy;
        this.ModifiedOn = ModifiedOn;
        this.ModifiedBy = ModifiedBy;
        this.GridLineStatus = GridLineStatus;
    }
}

export function TimesheetGridLine$reflection() {
    return record_type("Aimtec.Timesheets.TimesheetGridLine", [], TimesheetGridLine, () => [["TimesheetLineId", class_type("System.Guid")], ["TimesheetId", class_type("System.Guid")], ["AssignmentId", option_type(class_type("System.Guid"))], ["Date", option_type(string_type)], ["UserCode", option_type(string_type)], ["Subject", option_type(string_type)], ["ProjectCode", option_type(string_type)], ["TaskName", option_type(string_type)], ["UrgencyName", option_type(string_type)], ["RateName", option_type(string_type)], ["WorkBillable", option_type(string_type)], ["WorkNonBillable", option_type(string_type)], ["WorkOvertime", option_type(string_type)], ["WorkOvertimeNonBillable", option_type(string_type)], ["WorkBudgeted", option_type(string_type)], ["WorkRemaining", option_type(string_type)], ["WorkActual", option_type(string_type)], ["FinishDatePlan", option_type(string_type)], ["CreatedOn", option_type(class_type("System.DateTime"))], ["CreatedBy", option_type(class_type("System.Guid"))], ["ModifiedOn", option_type(class_type("System.DateTime"))], ["ModifiedBy", option_type(class_type("System.Guid"))], ["GridLineStatus", GridLineStatus$reflection()]]);
}

export class TimeSheetLine extends Record {
    constructor(TimesheetLineId, TimesheetId, AssignmentId, Date$, UserId, Subject, ProjectId, TaskId, Urgency, Rate, WorkBillable, WorkNonBillable, WorkOvertime, WorkOvertimeNonBillable, WorkBudgeted, WorkRemaining, WorkActual, FinishDatePlan, CreatedOn, CreatedBy, ModifiedOn, ModifiedBy) {
        super();
        this.TimesheetLineId = TimesheetLineId;
        this.TimesheetId = TimesheetId;
        this.AssignmentId = AssignmentId;
        this.Date = Date$;
        this.UserId = UserId;
        this.Subject = Subject;
        this.ProjectId = ProjectId;
        this.TaskId = TaskId;
        this.Urgency = (Urgency | 0);
        this.Rate = (Rate | 0);
        this.WorkBillable = WorkBillable;
        this.WorkNonBillable = WorkNonBillable;
        this.WorkOvertime = WorkOvertime;
        this.WorkOvertimeNonBillable = WorkOvertimeNonBillable;
        this.WorkBudgeted = WorkBudgeted;
        this.WorkRemaining = WorkRemaining;
        this.WorkActual = WorkActual;
        this.FinishDatePlan = FinishDatePlan;
        this.CreatedOn = CreatedOn;
        this.CreatedBy = CreatedBy;
        this.ModifiedOn = ModifiedOn;
        this.ModifiedBy = ModifiedBy;
    }
}

export function TimeSheetLine$reflection() {
    return record_type("Aimtec.Timesheets.TimeSheetLine", [], TimeSheetLine, () => [["TimesheetLineId", class_type("System.Guid")], ["TimesheetId", class_type("System.Guid")], ["AssignmentId", option_type(class_type("System.Guid"))], ["Date", class_type("System.DateTime")], ["UserId", class_type("System.Guid")], ["Subject", string_type], ["ProjectId", class_type("System.Guid")], ["TaskId", class_type("System.Guid")], ["Urgency", int32_type], ["Rate", int32_type], ["WorkBillable", class_type("System.Decimal")], ["WorkNonBillable", class_type("System.Decimal")], ["WorkOvertime", class_type("System.Decimal")], ["WorkOvertimeNonBillable", class_type("System.Decimal")], ["WorkBudgeted", class_type("System.Decimal")], ["WorkRemaining", class_type("System.Decimal")], ["WorkActual", class_type("System.Decimal")], ["FinishDatePlan", option_type(class_type("System.DateTime"))], ["CreatedOn", class_type("System.DateTime")], ["CreatedBy", class_type("System.Guid")], ["ModifiedOn", class_type("System.DateTime")], ["ModifiedBy", class_type("System.Guid")]]);
}

export class Timesheet extends Record {
    constructor(TimesheetId, UserId, TimesheetStatus, StartDate, EndDate, PeriodStatus) {
        super();
        this.TimesheetId = TimesheetId;
        this.UserId = UserId;
        this.TimesheetStatus = TimesheetStatus;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.PeriodStatus = PeriodStatus;
    }
}

export function Timesheet$reflection() {
    return record_type("Aimtec.Timesheets.Timesheet", [], Timesheet, () => [["TimesheetId", class_type("System.Guid")], ["UserId", class_type("System.Guid")], ["TimesheetStatus", uint8_type], ["StartDate", class_type("System.DateTime")], ["EndDate", class_type("System.DateTime")], ["PeriodStatus", uint8_type]]);
}

export function Rate_nameOfByte(byteValue) {
    switch (byteValue) {
        case 1: {
            return "AppCon";
        }
        case 2: {
            return "OnSite";
        }
        case 3: {
            return "PCPgm";
        }
        case 4: {
            return "SAPCon";
        }
        default: {
            return "Unrecognized Rate";
        }
    }
}

export function Rate_nameOptionOfOfByteOption(byteOption) {
    return map((byteValue) => {
        switch (byteValue) {
            case 1: {
                return "AppCon";
            }
            case 2: {
                return "OnSite";
            }
            case 3: {
                return "PCPgm";
            }
            case 4: {
                return "SAPCon";
            }
            default: {
                return "Unrecognized Rate";
            }
        }
    }, byteOption);
}

export function TimesheetModule_$007COpenedTimesheet$007CClosedTimesheet$007CUnlockedTimesheet$007COpenedTimesheetInClosedPeriod$007CInvalidStateTimesheet$007C(timesheetStatus, periodStatus) {
    let ts;
    const matchValue = [timesheetStatus, periodStatus];
    let pattern_matching_result, periodStatus_1, timesheetStatus_1;
    if (matchValue[0] != null) {
        if (matchValue[1] != null) {
            pattern_matching_result = 0;
            periodStatus_1 = matchValue[1];
            timesheetStatus_1 = matchValue[0];
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
            if ((ts = timesheetStatus_1, (ts === 0) && (periodStatus_1 === 1))) {
                const ts_1 = timesheetStatus_1;
                return new FSharpChoice$5(3, void 0);
            }
            else {
                switch (timesheetStatus_1) {
                    case 0: {
                        return new FSharpChoice$5(0, void 0);
                    }
                    case 1: {
                        return new FSharpChoice$5(1, void 0);
                    }
                    case 2: {
                        return new FSharpChoice$5(2, void 0);
                    }
                    default: {
                        return new FSharpChoice$5(4, void 0);
                    }
                }
            }
        }
        case 1: {
            return new FSharpChoice$5(4, void 0);
        }
    }
}

export class AccessLevel extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["CanGoToTimesheet", "CanEditTimesheet", "CanOpenTimesheet", "CanCloseTimesheet", "CanUlonckTimesheet"];
    }
}

export function AccessLevel$reflection() {
    return union_type("Aimtec.Timesheets.AccessLevel", [], AccessLevel, () => [[], [], [], [], []]);
}

export function AccessLevelModule_timesheetAccessLevel(timesheet, user) {
    let u, t, u_2, t_2, u_4, t_4, u_6, t_6;
    const matchValue = [timesheet, user];
    if ((u = matchValue[1], (t = matchValue[0], user.IsAdmin && (timesheet.PeriodStatus === 0)))) {
        const u_1 = matchValue[1];
        const t_1 = matchValue[0];
        return ofArray([new AccessLevel(0), new AccessLevel(3), new AccessLevel(2), new AccessLevel(1)]);
    }
    else if ((u_2 = matchValue[1], (t_2 = matchValue[0], user.IsAdmin && (timesheet.PeriodStatus === 1)))) {
        const u_3 = matchValue[1];
        const t_3 = matchValue[0];
        return ofArray([new AccessLevel(0), new AccessLevel(3), new AccessLevel(4), new AccessLevel(1)]);
    }
    else if ((u_4 = matchValue[1], (t_4 = matchValue[0], ((timesheet.UserId === u_4.UserId) && (timesheet.PeriodStatus === 0)) && (timesheet.TimesheetStatus === 1)))) {
        const u_5 = matchValue[1];
        const t_5 = matchValue[0];
        return ofArray([new AccessLevel(0), new AccessLevel(2)]);
    }
    else if ((u_6 = matchValue[1], (t_6 = matchValue[0], (timesheet.UserId === u_6.UserId) && (timesheet.PeriodStatus === 0)))) {
        const u_7 = matchValue[1];
        const t_7 = matchValue[0];
        return ofArray([new AccessLevel(0), new AccessLevel(3), new AccessLevel(1), new AccessLevel(2)]);
    }
    else {
        return singleton(new AccessLevel(0));
    }
}

export class UserTimesheet extends Record {
    constructor(TimesheetOwner, Timesheet, TimesheetGridOptions, TimesheetGridLines) {
        super();
        this.TimesheetOwner = TimesheetOwner;
        this.Timesheet = Timesheet;
        this.TimesheetGridOptions = TimesheetGridOptions;
        this.TimesheetGridLines = TimesheetGridLines;
    }
}

export function UserTimesheet$reflection() {
    return record_type("Aimtec.Timesheets.UserTimesheet", [], UserTimesheet, () => [["TimesheetOwner", User$reflection()], ["Timesheet", Timesheet$reflection()], ["TimesheetGridOptions", TimesheetGridOptions$reflection()], ["TimesheetGridLines", list_type(TimesheetGridLine$reflection())]]);
}

export class Period extends Record {
    constructor(PeriodId, PeriodName, StartDate, EndDate, PeriodStatus) {
        super();
        this.PeriodId = PeriodId;
        this.PeriodName = PeriodName;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.PeriodStatus = PeriodStatus;
    }
}

export function Period$reflection() {
    return record_type("Aimtec.Timesheets.Period", [], Period, () => [["PeriodId", class_type("System.Guid")], ["PeriodName", string_type], ["StartDate", class_type("System.DateTime")], ["EndDate", class_type("System.DateTime")], ["PeriodStatus", uint8_type]]);
}

export function TimesheetGridLineModule_empty(userId, timesheetId) {
    return new TimesheetGridLine(newGuid(), timesheetId, void 0, void 0, userId, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GridLineStatus(0));
}

export function TimesheetGridLineModule_defaultValues(userCode, timesheetId, rate) {
    let copyOfStruct;
    return new TimesheetGridLine(newGuid(), timesheetId, void 0, (copyOfStruct = now(), toString(copyOfStruct, "yyyy-MM-dd")), userCode, void 0, void 0, void 0, "3 Low", rate, toString_1(fromParts(0, 0, 0, false, 0)), toString_1(fromParts(0, 0, 0, false, 0)), toString_1(fromParts(0, 0, 0, false, 0)), toString_1(fromParts(0, 0, 0, false, 0)), toString_1(fromParts(0, 0, 0, false, 0)), toString_1(fromParts(0, 0, 0, false, 0)), toString_1(fromParts(0, 0, 0, false, 0)), void 0, void 0, void 0, void 0, void 0, new GridLineStatus(0));
}

export function TimesheetLineValidation_cIEquals(s1, s2) {
    const s1Lower = s1.toLocaleLowerCase();
    const s2Lower = s2.toLocaleLowerCase();
    return s1Lower === s2Lower;
}

export function TimesheetLineValidation_cIContains(s1, s2) {
    const s1Lower = s1.toLocaleLowerCase();
    const s2Lower = s2.toLocaleLowerCase();
    return s1Lower.indexOf(s2Lower) >= 0;
}

export function TimeSheetLineModule_op_GreaterGreaterEquals(a, f) {
    return Result_Bind(f, a);
}

function TimeSheetLineModule_subject(name, value) {
    let suject, s;
    if (value == null) {
        return new FSharpResult$2(1, `${name} must be nonempty.`);
    }
    else {
        const subject = value_7(value);
        if ((suject = subject, (s = toString_2(suject), isNullOrEmpty(s) ? true : isNullOrWhiteSpace(s)))) {
            const suject_1 = subject;
            return new FSharpResult$2(1, `${name} must be not be NullOrEmpty or NullOrWhiteSpace.`);
        }
        else {
            const subject_1 = subject;
            return new FSharpResult$2(0, subject_1);
        }
    }
}

function TimeSheetLineModule_parseDate(value) {
    if (value == null) {
        return new FSharpResult$2(1, "Date must be nonempty.");
    }
    else {
        const value_1 = value;
        let patternInput;
        let outArg = minValue();
        patternInput = [tryParse(value_1, new FSharpRef(() => outArg, (v) => {
            outArg = v;
        })), outArg];
        const parsedDate = patternInput[1];
        const couldParse = patternInput[0];
        if (couldParse) {
            return new FSharpResult$2(0, parsedDate);
        }
        else {
            return new FSharpResult$2(1, "Failed to parse DateTime value of field date.");
        }
    }
}

function TimeSheetLineModule_parseDecimal(fieldName, value) {
    if (value == null) {
        return new FSharpResult$2(1, `${fieldName} must be nonempty.`);
    }
    else {
        const value_1 = value;
        let patternInput;
        let outArg = new Decimal(0);
        patternInput = [tryParse_1(value_1, new FSharpRef(() => outArg, (v) => {
            outArg = v;
        })), outArg];
        const parsedDate = patternInput[1];
        const couldParse = patternInput[0];
        if (couldParse) {
            return new FSharpResult$2(0, parsedDate);
        }
        else {
            return new FSharpResult$2(1, `Failed to parse Decimal value of field ${fieldName}.`);
        }
    }
}

function TimeSheetLineModule_checkDateFromTimesheetMonth(timesheetStartDate, date) {
    if (month(date) === month(timesheetStartDate)) {
        return new FSharpResult$2(0, date);
    }
    else {
        return new FSharpResult$2(1, `Provided date ${toString_2(date)} is not from timesheet month.`);
    }
}

function TimeSheetLineModule_checkDateParsedFromTimesheetMonth(timesheetStartDate, date) {
    return TimeSheetLineModule_op_GreaterGreaterEquals(TimeSheetLineModule_parseDate(date), (d) => TimeSheetLineModule_checkDateFromTimesheetMonth(timesheetStartDate, d));
}

function TimeSheetLineModule_checkFinishDatePlan(value) {
    if (value == null) {
        return new FSharpResult$2(0, void 0);
    }
    else {
        const value_1 = value;
        if (isNullOrEmpty(value_1) ? true : isNullOrWhiteSpace(value_1)) {
            return new FSharpResult$2(0, void 0);
        }
        else {
            let patternInput;
            let outArg = minValue();
            patternInput = [tryParse(value_1, new FSharpRef(() => outArg, (v) => {
                outArg = v;
            })), outArg];
            const parsedDate = patternInput[1];
            const couldParse = patternInput[0];
            if (couldParse) {
                return new FSharpResult$2(0, parsedDate);
            }
            else {
                return new FSharpResult$2(1, "Failed to parse DateTime value of field finish date.");
            }
        }
    }
}

function TimeSheetLineModule_findTaskReferenceIdByName(fieldName, name, taskReferences, projectRef) {
    if (name != null) {
        const name_1 = name;
        const matchValue = tryFind((tr) => TimesheetLineValidation_cIEquals(tr.TaskName, name_1), taskReferences);
        if (matchValue == null) {
            return new FSharpResult$2(1, `Field ${fieldName}: no Id value found for ${name_1}`);
        }
        else {
            const tr_1 = matchValue;
            const allowedTasks = filter((t) => {
                if (t.ProjectId === projectRef.Id) {
                    return true;
                }
                else {
                    return startsWith(t.TaskName, projectRef.Name, 5);
                }
            }, taskReferences);
            if (exists((t_1) => (t_1.TaskId === tr_1.TaskId), allowedTasks)) {
                return new FSharpResult$2(0, tr_1.TaskId);
            }
            else {
                return new FSharpResult$2(1, `Task with name <<${tr_1.TaskName}>> with Id <<${tr_1.TaskId} does not belong to project: <<${projectRef.Name} with Id ${projectRef.Id}>>`);
            }
        }
    }
    else {
        return new FSharpResult$2(1, `Field ${fieldName}: is NONE ${name}`);
    }
}

function TimeSheetLineModule_findEntityReferenceIdByName(fieldName, name, entityReferences) {
    if (name != null) {
        const name_1 = name;
        const matchValue = tryFind((er) => TimesheetLineValidation_cIContains(er.Name, name_1), entityReferences);
        if (matchValue == null) {
            return new FSharpResult$2(1, `Field ${fieldName}: no Id value found for ${name_1}`);
        }
        else {
            const er_1 = matchValue;
            return new FSharpResult$2(0, er_1.Id);
        }
    }
    else {
        return new FSharpResult$2(1, `Field ${fieldName}: is NONE ${name}`);
    }
}

function TimeSheetLineModule_findOptionReferenceIdByName(fieldName, name, optionReferences) {
    if (name != null) {
        const name_1 = name;
        const matchValue = tryFind((oref) => TimesheetLineValidation_cIContains(oref.Label, name_1), optionReferences);
        if (matchValue == null) {
            return new FSharpResult$2(1, `Field ${fieldName}: no Option found for ${name_1}`);
        }
        else {
            const oref_1 = matchValue;
            return new FSharpResult$2(0, oref_1.Option);
        }
    }
    else {
        return new FSharpResult$2(1, `Field ${fieldName}: is NONE ${name}`);
    }
}

export function TimeSheetLineModule_ofTimesheetGridLine(timesheetId, timesheetStartDate, timesheetGridOptions, tsgl) {
    return ValidationCE_ValidationBuilder__Run_Z29103BAD(ValidationCE_validation, ValidationCE_ValidationBuilder__Delay_Z29103BAD(ValidationCE_validation, () => Validation_bind((_arg1) => {
        let t1_12, t2_12, t1_11, t2_11, t1_10, t2_10, t1_9, t2_9, t1_8, t2_8, t1_7, t2_7, t1_6, t2_6, t1_5, t2_5, t1_4, t2_4, t1_3, t2_3, t1_2, t2_2, t1_1, t2_1, t1, t2;
        const projectId = _arg1;
        const projectReference = find((p) => (p.Id === projectId), timesheetGridOptions.Projects);
        return Result_Map((_arg2) => {
            const workRemaining = _arg2[1][1][1][1][1][1][1][1][1][1][1][0];
            const workOvertimeNonBillable = _arg2[1][1][1][1][1][1][1][1][1][0];
            const workOvertime = _arg2[1][1][1][1][1][1][1][1][0];
            const workNonBillable = _arg2[1][1][1][1][1][1][1][0];
            const workBudgeted = _arg2[1][1][1][1][1][1][1][1][1][1][0];
            const workBillable = _arg2[1][1][1][1][1][1][0];
            const workActual = _arg2[1][1][1][1][1][1][1][1][1][1][1][1][0];
            const userId = _arg2[1][1][1][1][1][0];
            const urgency = _arg2[1][1][1][0] | 0;
            const taskId = _arg2[1][0];
            const subject = _arg2[1][1][0];
            const rate = _arg2[1][1][1][1][0] | 0;
            const finishDatePlan = _arg2[1][1][1][1][1][1][1][1][1][1][1][1][1];
            const date = _arg2[0];
            const timesheetLine = new TimeSheetLine(tsgl.TimesheetLineId, timesheetId, tsgl.AssignmentId, date, userId, subject, projectId, taskId, urgency, rate, workBillable, workNonBillable, workOvertime, workOvertimeNonBillable, workBudgeted, workRemaining, workActual, finishDatePlan, now(), userId, now(), userId);
            return timesheetLine;
        }, (t1_12 = TimeSheetLineModule_checkDateParsedFromTimesheetMonth(timesheetStartDate, tsgl.Date), (t2_12 = ((t1_11 = TimeSheetLineModule_findTaskReferenceIdByName("TaskId", tsgl.TaskName, timesheetGridOptions.Tasks, projectReference), (t2_11 = ((t1_10 = TimeSheetLineModule_subject("Subject", tsgl.Subject), (t2_10 = ((t1_9 = TimeSheetLineModule_findOptionReferenceIdByName("Urgency", tsgl.UrgencyName, timesheetGridOptions.Urgencies), (t2_9 = ((t1_8 = TimeSheetLineModule_findOptionReferenceIdByName("Rate", tsgl.RateName, timesheetGridOptions.Rates), (t2_8 = ((t1_7 = TimeSheetLineModule_findEntityReferenceIdByName("UserId", tsgl.UserCode, timesheetGridOptions.Users), (t2_7 = ((t1_6 = TimeSheetLineModule_parseDecimal("Work Billable", tsgl.WorkBillable), (t2_6 = ((t1_5 = TimeSheetLineModule_parseDecimal("Work Non Billable", tsgl.WorkNonBillable), (t2_5 = ((t1_4 = TimeSheetLineModule_parseDecimal("Work Overtime", tsgl.WorkOvertime), (t2_4 = ((t1_3 = TimeSheetLineModule_parseDecimal("Work Overtime Non Billable", tsgl.WorkOvertimeNonBillable), (t2_3 = ((t1_2 = TimeSheetLineModule_parseDecimal("Work Budgeted", tsgl.WorkOvertimeNonBillable), (t2_2 = ((t1_1 = TimeSheetLineModule_parseDecimal("Work Remaining", tsgl.WorkRemaining), (t2_1 = ((t1 = TimeSheetLineModule_parseDecimal("Work Actual", tsgl.WorkActual), (t2 = TimeSheetLineModule_checkFinishDatePlan(tsgl.FinishDatePlan), Validation_zip(Validation_ofResult(t1), Validation_ofResult(t2))))), Validation_zip(Validation_ofResult(t1_1), t2_1)))), Validation_zip(Validation_ofResult(t1_2), t2_2)))), Validation_zip(Validation_ofResult(t1_3), t2_3)))), Validation_zip(Validation_ofResult(t1_4), t2_4)))), Validation_zip(Validation_ofResult(t1_5), t2_5)))), Validation_zip(Validation_ofResult(t1_6), t2_6)))), Validation_zip(Validation_ofResult(t1_7), t2_7)))), Validation_zip(Validation_ofResult(t1_8), t2_8)))), Validation_zip(Validation_ofResult(t1_9), t2_9)))), Validation_zip(Validation_ofResult(t1_10), t2_10)))), Validation_zip(Validation_ofResult(t1_11), t2_11)))), Validation_zip(Validation_ofResult(t1_12), t2_12))));
    }, Validation_ofResult(ResultCE_ResultBuilder__Delay_Z4709C901(ResultCE_result, () => TimeSheetLineModule_findEntityReferenceIdByName("ProjectId", tsgl.ProjectCode, timesheetGridOptions.Projects))()))));
}

