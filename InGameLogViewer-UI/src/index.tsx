import { ModRegistrar } from "cs2/modding";
import { LogPanel } from "mods/LogPanel";

const register: ModRegistrar = (moduleRegistry) => {
    // While launching game in UI development mode (include --uiDeveloperMode in the launch options)
    // - Access the dev tools by opening localhost:9444 in chrome browser.
    // - You should see a hello world output to the console.
    // - use the useModding() hook to access exposed UI, api and native coherent engine interfaces. 
    // Good luck and have fun!
    moduleRegistry.append('Menu', LogPanel);
    console.log(moduleRegistry.find("game-ui/common/panel/"));
    let tof = moduleRegistry.get('game-ui/common/panel/draggable-panel/draggable-panel.tsx', 'DraggablePanel');
    console.log(Object.keys(tof));
}

export default register;