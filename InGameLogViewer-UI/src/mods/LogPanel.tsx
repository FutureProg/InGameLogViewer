import styles from "./components.module.scss";

import { bindValue, trigger, useValue } from "cs2/api";
import { Button, Dropdown, DropdownItem, FloatingButton, Icon, IconButtonTheme, MenuButton, Panel, PanelTheme, Scrollable } from "cs2/ui";
import { LogView } from "./LogView";
import { LogListComponent } from "./LogList";
import mod from '../../mod.json';
import { ModuleRegistryAppend } from "cs2/modding";

export const logPanelEnabled$ = bindValue<boolean>(mod.id, 'LogPanelEnabled');

export function handleClose() {
    trigger(mod.id, 'LogPanelClosed');
}

export const LogPanel: ModuleRegistryAppend =  () => {
    const logPanelEnabled : boolean = useValue(logPanelEnabled$);    
    if (!logPanelEnabled) {
        return null;
    }
    const header = (
        <div>
            Log <small>log.log</small>
        </div>
    )
    return (        
        <Panel className={styles.logPanel} initialPosition={{x: 0.2, y:0.2}} header={header} onClose={handleClose} draggable={true} title="Name">                                
            <div className={styles.logPanelContent}>
                <LogView />
                <LogListComponent />
            </div>            
        </Panel>        
    );
}
