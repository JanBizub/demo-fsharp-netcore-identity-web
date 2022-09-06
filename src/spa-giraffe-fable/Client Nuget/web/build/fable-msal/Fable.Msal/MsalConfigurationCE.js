import { class_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { Configuration, BrowserAuthOptionsModule_empty } from "./Fable.Msal.Types.js";

export class ConfigurationBuilder {
    constructor() {
    }
}

export function ConfigurationBuilder$reflection() {
    return class_type("Fable.Msal.MsalConfigurationCE.ConfigurationBuilder", void 0, ConfigurationBuilder);
}

export function ConfigurationBuilder_$ctor() {
    return new ConfigurationBuilder();
}

export function ConfigurationBuilder__Yield_1505(_, _arg1) {
    return new Configuration(BrowserAuthOptionsModule_empty(), void 0);
}

export function ConfigurationBuilder__Auth_27E9ADC4(_, state, auth) {
    return new Configuration(auth, state.cache);
}

export const msalConfiguration = ConfigurationBuilder_$ctor();

