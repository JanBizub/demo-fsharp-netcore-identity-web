import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { LicenseManager, AllModules } from "@ag-grid-enterprise/all-modules";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import * as ag_grid from "@ag-grid-community/core/dist/styles/ag-grid.css";
import * as ag_theme_alpine from "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import * as ag_theme_alpine_dark from "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import * as ag_theme_balham from "@ag-grid-community/core/dist/styles/ag-theme-balham.css";
import * as ag_theme_balham_dark from "@ag-grid-community/core/dist/styles/ag-theme-balham-dark.css";
import * as ag_theme_material from "@ag-grid-community/core/dist/styles/ag-theme-material.css";
import { Union } from "../../fable_modules/fable-library.3.7.11/Types.js";
import { union_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { printf, toText } from "../../fable_modules/fable-library.3.7.11/String.js";
import { createElement } from "react";
import { curry } from "../../fable_modules/fable-library.3.7.11/Util.js";
import { map } from "../../fable_modules/fable-library.3.7.11/Array.js";

export const agGrid = AgGridReact;

export const clientSideRowModelModule = ClientSideRowModelModule;

export const allEnterpriseModules = AllModules;

export const licenceManager = LicenseManager;

export const rangeSelectionModule = RangeSelectionModule;

export const clipboardModule = ClipboardModule;







export class RowSelection extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Single", "Multiple"];
    }
}

export function RowSelection$reflection() {
    return union_type("Feliz.AgGrid.RowSelection", [], RowSelection, () => [[], []]);
}

export class RowFilter extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Number", "Text", "Date"];
    }
}

export function RowFilter$reflection() {
    return union_type("Feliz.AgGrid.RowFilter", [], RowFilter, () => [[], [], []]);
}

export function RowFilter__get_FilterText(this$) {
    return toText(printf("ag%OColumnFilter"))(this$);
}

export class DOMLayout extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Normal", "AutoHeight", "Print"];
    }
}

export function DOMLayout$reflection() {
    return union_type("Feliz.AgGrid.DOMLayout", [], DOMLayout, () => [[], [], []]);
}

export function DOMLayout__get_LayoutText(this$) {
    switch (this$.tag) {
        case 1: {
            return "autoHeight";
        }
        case 2: {
            return "print";
        }
        default: {
            return "normal";
        }
    }
}

export const ThemeClass_Alpine = "ag-theme-alpine";

export const ThemeClass_AlpineDark = "ag-theme-alpine-dark";

export const ThemeClass_Balham = "ag-theme-balham";

export const ThemeClass_BalhamDark = "ag-theme-balham-dark";

export const ThemeClass_Material = "ag-theme-material";

export function columnDefProp() {
    return (value) => value;
}

export class ColumnType extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["RightAligned", "NumericColumn"];
    }
}

export function ColumnType$reflection() {
    return union_type("Feliz.AgGrid.ColumnType", [], ColumnType, () => [[], []]);
}

export function openClosed(_arg1) {
    if (_arg1) {
        return "open";
    }
    else {
        return "closed";
    }
}

export function CellRendererComponent(cellRendererComponentInputProps) {
    const p = cellRendererComponentInputProps.p;
    const render = cellRendererComponentInputProps.render;
    return render(p.value)(p.data);
}

export function ColumnDef$2_cellRendererFramework_2C70A0D6(render) {
    return columnDefProp()(["cellRendererFramework", (p) => createElement(CellRendererComponent, {
        render: curry(2, render),
        p: p,
    })]);
}

export function columnGroupDefProp() {
    return (value) => value;
}

export function agGridProp(x) {
    return x;
}

export function AgGrid_onColumnGroupOpened_127B6E36(callback) {
    const onColumnGroupOpened = (ev) => {
        callback({
            AutoSizeGroupColumns: () => {
                setTimeout(() => {
                    const colIds = map((x) => x.colId, ev.columnGroup.children);
                    ev.columnApi.autoSizeColumns(colIds);
                }, 0);
            },
        });
    };
    return agGridProp(["onColumnGroupOpened", onColumnGroupOpened]);
}

