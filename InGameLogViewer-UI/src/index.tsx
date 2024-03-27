import { ModRegistrar, ModuleRegistryAppend } from "cs2/modding";
import { useRem } from "cs2/utils";
import { LogPanel } from "mods/LogPanel";
import { PanelActivationButton, createPanelActivationButton } from "mods/PanelActivationButton";

const register: ModRegistrar = (moduleRegistry) => {
    // While launching game in UI development mode (include --uiDeveloperMode in the launch options)
    // - Access the dev tools by opening localhost:9444 in chrome browser.
    // - You should see a hello world output to the console.
    // - use the useModding() hook to access exposed UI, api and native coherent engine interfaces. 
    // Good luck and have fun!
    moduleRegistry.append('Menu', LogPanel, 1);
    moduleRegistry.append('Menu', createPanelActivationButton("menu"), 2);

    moduleRegistry.append('Game', LogPanel, 1);    
    moduleRegistry.append('GameBottomRight', createPanelActivationButton("flat"));

    moduleRegistry.append('Editor', LogPanel, 1);    
    moduleRegistry.append('Editor', createPanelActivationButton("flat", {x: 20, y: 20}));
}

export default register;