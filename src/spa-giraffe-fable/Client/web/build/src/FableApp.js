import { Union } from "../fable_modules/fable-library.3.7.11/Types.js";
import { obj_type, union_type, list_type, string_type } from "../fable_modules/fable-library.3.7.11/Reflection.js";
import { Http_content, Headers_authorization, Headers_contentType, Http_header, Http_method, Http_send } from "../fable_modules/Fable.SimpleHttp.3.0.0/Http.fs.js";
import { BodyContent, HttpMethod } from "../fable_modules/Fable.SimpleHttp.3.0.0/Types.fs.js";
import { createTypeInfo } from "../fable_modules/Fable.SimpleJson.3.19.0/TypeInfo.Converter.fs.js";
import { Convert_serialize } from "../fable_modules/Fable.SimpleJson.3.19.0/Json.Converter.fs.js";
import { createElement } from "react";
import * as react from "react";
import { Interop_reactApi } from "../fable_modules/Feliz.1.40.0/Interop.fs.js";
import { equals, createObj } from "../fable_modules/fable-library.3.7.11/Util.js";
import { empty, head, tail, isEmpty, append, getSlice, tryFindIndex, cons, map, ofArray } from "../fable_modules/fable-library.3.7.11/List.js";
import { toFail } from "../fable_modules/fable-library.3.7.11/String.js";

export class ComponentState extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Unititilised", "Loading", "Errorneous", "Loaded"];
    }
}

export function ComponentState$reflection() {
    return union_type("FableApp.ComponentState", [], ComponentState, () => [[], [], [["Item", list_type(string_type)]], []]);
}

export function getRequest(idToken, request) {
    let req_2, req_1;
    return Http_send((req_2 = ((req_1 = Http_method(new HttpMethod(0), request), Http_header(Headers_contentType("application/json"), req_1))), Http_header(Headers_authorization(`Bearer ${idToken}`), req_2)));
}

export function postRequest(idToken, jsonObject, request) {
    let req_3, req_2, req_1, typeInfo;
    return Http_send((req_3 = ((req_2 = ((req_1 = Http_method(new HttpMethod(1), request), Http_content(new BodyContent(1, `${((typeInfo = createTypeInfo(obj_type), Convert_serialize(jsonObject, typeInfo)))}`), req_1))), Http_header(Headers_contentType("application/json"), req_2))), Http_header(Headers_authorization(`Bearer ${idToken}`), req_3)));
}

export function row(elems) {
    return createElement("div", {
        className: "row",
        children: Interop_reactApi.Children.toArray(Array.from(elems)),
    });
}

export const unitialisedView = createElement("div", createObj(ofArray([["className", "alert alert-warning"], (() => {
    const elems = [createElement("label", {
        children: "Unitialised Component",
    })];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems))];
})()])));

export const loadingView = createElement("div", createObj(ofArray([["className", "alert alert-info"], (() => {
    const elems = [createElement("label", {
        children: "Loading",
    })];
    return ["children", Interop_reactApi.Children.toArray(Array.from(elems))];
})()])));

export function errorView(errorMessages) {
    const errorInfoes = map((em) => {
        let elems;
        return createElement("div", createObj(ofArray([["className", "alert alert-danger"], (elems = [createElement("label", {
            children: `${em}`,
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
    }, errorMessages);
    return react.createElement(react.Fragment, {}, ...errorInfoes);
}

export function prevMonthCode(mc) {
    return "";
}

export function nextMonthCode(mc) {
    return "";
}

export function createMonthString(y, m) {
    switch (m) {
        case 1: {
            return `${y}0${1}`;
        }
        case 2: {
            return `${y}0${2}`;
        }
        case 3: {
            return `${y}0${3}`;
        }
        case 4: {
            return `${y}0${4}`;
        }
        case 5: {
            return `${y}0${5}`;
        }
        case 6: {
            return `${y}0${6}`;
        }
        case 7: {
            return `${y}0${7}`;
        }
        case 8: {
            return `${y}0${8}`;
        }
        case 9: {
            return `${y}0${9}`;
        }
        case 10: {
            return `${y}${10}`;
        }
        case 11: {
            return `${y}${11}`;
        }
        case 12: {
            return `${y}${12}`;
        }
        default: {
            const n = m | 0;
            return toFail(`Error: invalid month number: ${n}.`);
        }
    }
}

export function List_add(element, listan) {
    return cons(element, listan);
}

export function List_remove(x, xs) {
    const matchValue = tryFindIndex((y) => equals(x, y), xs);
    if (matchValue == null) {
        return xs;
    }
    else if (matchValue === 0) {
        return getSlice(1, void 0, xs);
    }
    else {
        const i = matchValue | 0;
        return append(getSlice(void 0, i - 1, xs), getSlice(i + 1, void 0, xs));
    }
}

export function List_replace(f, sub, xs) {
    const finish = (acc_mut, _arg1_mut) => {
        finish:
        while (true) {
            const acc = acc_mut, _arg1 = _arg1_mut;
            if (!isEmpty(_arg1)) {
                const xs_1 = tail(_arg1);
                const x = head(_arg1);
                acc_mut = cons(x, acc);
                _arg1_mut = xs_1;
                continue finish;
            }
            else {
                return acc;
            }
            break;
        }
    };
    const search = (acc_1_mut, _arg2_mut) => {
        search:
        while (true) {
            const acc_1 = acc_1_mut, _arg2 = _arg2_mut;
            if (!isEmpty(_arg2)) {
                const xs_2 = tail(_arg2);
                const x_1 = head(_arg2);
                if (f(x_1)) {
                    return finish(cons(sub(x_1), xs_2), acc_1);
                }
                else {
                    acc_1_mut = cons(x_1, acc_1);
                    _arg2_mut = xs_2;
                    continue search;
                }
            }
            else {
                throw (new Error("replace failed!"));
            }
            break;
        }
    };
    return search(empty(), xs);
}

export function List_tryReplace(f, sub, xs) {
    const finish = (acc_mut, _arg1_mut) => {
        finish:
        while (true) {
            const acc = acc_mut, _arg1 = _arg1_mut;
            if (!isEmpty(_arg1)) {
                const xs_1 = tail(_arg1);
                const x = head(_arg1);
                acc_mut = cons(x, acc);
                _arg1_mut = xs_1;
                continue finish;
            }
            else {
                return acc;
            }
            break;
        }
    };
    const search = (acc_1_mut, _arg2_mut) => {
        search:
        while (true) {
            const acc_1 = acc_1_mut, _arg2 = _arg2_mut;
            if (!isEmpty(_arg2)) {
                const xs_2 = tail(_arg2);
                const x_1 = head(_arg2);
                if (f(x_1)) {
                    return finish(cons(sub(x_1), xs_2), acc_1);
                }
                else {
                    acc_1_mut = cons(x_1, acc_1);
                    _arg2_mut = xs_2;
                    continue search;
                }
            }
            else {
                return void 0;
            }
            break;
        }
    };
    return search(empty(), xs);
}

