import styles from "./components.module.scss";

import { useValue } from "cs2/api";
import { Panel } from "cs2/ui";
import { LogView } from "./LogView";
import { LogListComponent } from "./LogList";
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
