import styles from "./components.module.scss";

import { useValue } from "cs2/api";
import { Panel } from "cs2/ui";
import { LogView } from "./LogView";
import { LogListComponent } from "./LogList";
import { ModuleRegistryAppend } from "cs2/modding";
import { closeLogPanel, logPanelEnabled$ } from "./bindings";

export const LogPanel: ModuleRegistryAppend =  () => {
    // logPanelEnabled is set to false by default
    const logPanelEnabled : boolean = useValue(logPanelEnabled$);    

    // if (!logPanelEnabled) { 
    //     // Returning this or null after the Panel component has been set removes the game UI
    //     // This if-block needs to be commented out for it to work properly. (just use style change)         
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
    // In order to make this work without breaking the game UI, need to rely on the 'display' css attribute;
    return (        
        <Panel className={styles.logPanel} transition={{enter: 'fade'}} style={{display: logPanelEnabled? 'block': 'none'}} initialPosition={{x: 0.2, y:0.2}} header={header} onClose={closeLogPanel} draggable={true}>                                
            <div className={styles.logPanelContent}>
                <LogView />
                <LogListComponent />
            </div>            
        </Panel>        
    );
}
