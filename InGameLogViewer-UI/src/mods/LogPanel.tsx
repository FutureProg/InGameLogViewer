import styles from "./components.module.scss";

import { bindValue, trigger, useValue } from "cs2/api";
import { Button, Dropdown, DropdownItem, FloatingButton, Icon, IconButtonTheme, MenuButton, Panel, PanelTheme, Scrollable } from "cs2/ui";
import { LogView } from "./LogView";
import { LogListComponent } from "./LogList";
import mod from '../../mod.json';
import { ModuleRegistryAppend } from "cs2/modding";
import { closeLogPanel, logPanelEnabled$ } from "./bindings";

export const LogPanel: ModuleRegistryAppend =  () => {
    const logPanelEnabled : boolean = useValue(logPanelEnabled$);    
    // if (!logPanelEnabled) {
    //     return (
    //         <div style={{}}>

    //         </div>
    //     );
    // }
    const header = (
        <div>
            Log
        </div>
    )
    return (        
        <Panel className={styles.logPanel} style={{display: logPanelEnabled? 'block': 'none'}} initialPosition={{x: 0.2, y:0.2}} header={header} onClose={closeLogPanel} draggable={true}>                                
            <div className={styles.logPanelContent}>
                <LogView />
                <LogListComponent />
            </div>            
        </Panel>        
    );
}
