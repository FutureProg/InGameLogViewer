import { ModRegistrar } from "cs2/modding";
import { LogPanel } from "mods/LogPanel";
import { PanelActivationButton } from "mods/PanelActivationButton";

const register: ModRegistrar = (moduleRegistry) => {
    // While launching game in UI development mode (include --uiDeveloperMode in the launch options)
    // - Access the dev tools by opening localhost:9444 in chrome browser.
    // - You should see a hello world output to the console.
    // - use the useModding() hook to access exposed UI, api and native coherent engine interfaces. 
    // Good luck and have fun!
    moduleRegistry.append('Menu', LogPanel, 1);
    moduleRegistry.append('Menu', PanelActivationButton, 2);
}

export default register;