import styles from "./components.module.scss";

import { Button, Dropdown, DropdownItem, FloatingButton, Icon, IconButtonTheme, MenuButton, Panel, PanelTheme, Scrollable } from "cs2/ui";
import { LogView } from "./LogView";
import { LogListComponent } from "./LogList";

export const LogPanel = () => {
    // This is a void component that does not output anynthing.
    // Cities: Skylines 2 UI is built with React and mods support outputting standard
    // React JSX elements!
    console.log("Hello InGameLogViewer-UI!");   
    const panelTheme : Partial<PanelTheme> = {
        
    };
    const iconButtonTheme : IconButtonTheme = {
        icon: "coui://uil/Standard/Anarchy.svg",
        button: "X"
    };
    const header = (
        <div>
            Log <small>log.log</small>
        </div>
    )
    const dropDownContent = (
        <DropdownItem value={'fdas'}>xasdf</DropdownItem>
    )
    return (        
        <Panel className={styles.logPanel} initialPosition={{x: 0.2, y:0.2}} header={header} onClose={()=>console.log("Close")} draggable={true} title="Name">                                
            <div className={styles.logPanelContent}>
                <LogView />
                <LogListComponent />
            </div>            
        </Panel>        
    )
}