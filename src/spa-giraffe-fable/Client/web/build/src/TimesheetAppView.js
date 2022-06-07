import * as style from "../../../src/style.scss";
import { createElement } from "react";
import { singleton } from "../fable_modules/fable-library.3.7.11/List.js";
import { Interop_reactApi } from "../fable_modules/Feliz.1.40.0/Interop.fs.js";

export function Render(renderInputProps) {
    const dispatch = renderInputProps.dispatch;
    const state = renderInputProps.state;
    const children = singleton(createElement("p", {
        children: "AAD Demo",
    }));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

