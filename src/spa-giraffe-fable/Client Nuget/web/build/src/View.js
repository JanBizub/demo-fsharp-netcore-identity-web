import * as style from "../../../src/style.scss";
import { createElement } from "react";
import { ofArray, reduce, isEmpty } from "../fable_modules/fable-library.3.7.11/List.js";
import { Msg } from "./Types.js";
import { Interop_reactApi } from "../fable_modules/Feliz.1.40.0/Interop.fs.js";

export function Render(renderInputProps) {
    let matchValue, e;
    const dispatch = renderInputProps.dispatch;
    const state = renderInputProps.state;
    const children = ofArray([createElement("p", {
        children: (matchValue = state.ErrorMessage, (matchValue != null) ? ((e = matchValue, e)) : ""),
    }), createElement("p", {
        children: "AAD Demo",
    }), createElement("p", {
        children: isEmpty(state.Cars) ? "" : reduce((x, y) => (x + y), state.Cars),
    }), createElement("button", {
        children: "Fetch Cars",
        onClick: (_arg1) => {
            dispatch(new Msg(0));
        },
    })]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

