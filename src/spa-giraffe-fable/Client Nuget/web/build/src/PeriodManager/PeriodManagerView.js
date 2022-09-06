import * as PeriodManagerStyles from "../../../../src/PeriodManager/PeriodManagerStyles.css";
import { unitialisedView, errorView, loadingView } from "../FableApp.js";
import { singleton, delay, toList } from "../../fable_modules/fable-library.3.7.11/Seq.js";
import { map } from "../../fable_modules/fable-library.3.7.11/List.js";
import { createElement } from "react";
import * as react from "react";
import { join } from "../../fable_modules/fable-library.3.7.11/String.js";
import { PeriodManagerMsg } from "./PeriodManagerTypes.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.1.40.0/Interop.fs.js";


export function Render(renderInputProps) {
    const canEdit = renderInputProps.canEdit;
    const dispatch = renderInputProps.dispatch;
    const state = renderInputProps.state;
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
            const xs_4 = toList(delay(() => {
                let periods;
                const arg00 = map((p) => {
                    if (p.PeriodStatus === 0) {
                        return createElement("button", {
                            className: join(" ", ["btn", "btn-warning"]),
                            onClick: (_arg1) => {
                                dispatch(new PeriodManagerMsg(2, p.PeriodId));
                            },
                            children: `Close period ${p.PeriodName}`,
                        });
                    }
                    else {
                        return createElement("button", {
                            className: join(" ", ["btn", "btn-success"]),
                            onClick: (_arg2) => {
                                dispatch(new PeriodManagerMsg(4, p.PeriodId));
                            },
                            children: `Open period ${p.PeriodName}`,
                        });
                    }
                }, state.Periods);
                periods = react.createElement(react.Fragment, {}, ...arg00);
                return singleton(createElement("div", {
                    className: "periods-container",
                    children: Interop_reactApi.Children.toArray([periods]),
                }));
            }));
            return react.createElement(react.Fragment, {}, ...xs_4);
        }
        default: {
            return unitialisedView;
        }
    }
}

