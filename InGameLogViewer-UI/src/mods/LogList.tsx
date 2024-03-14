import { Entity } from "cs2/utils";
import styles from "./components.module.scss";
import { Button, DropdownItem, DropdownMenuTheme, Dropdown, FOCUS_AUTO, Scrollable, DropdownToggle } from "cs2/ui";
import { useValue } from "cs2/api";
import { logFileSelected$, logFiles$, openLogFile } from "./bindings";

export const LogListComponent = () => {

    const filenames: string[] = useValue(logFiles$);
    const selectedFile: string = useValue(logFileSelected$);
    // const buttonList = filenames.map((file, idx) => (
    //     <div className={styles.logListItem}>
    //        <Button style={{width: '100%'}} variant="floating">{file}</Button>
    //     </div>
    // ))
    //theme: {dropdownItem: styles.dropdownItem},
    const dropDownList = (
        <div>
            {
                filenames.map((value, idx) => DropdownItem<string>({
                    theme: {dropdownItem: styles.dropdownItem},
                    focusKey: FOCUS_AUTO, 
                    value: value, 
                    closeOnSelect: true,
                    children: value, 
                    onChange:openLogFile, 
                    sounds: {select: 'select-item'}}
                ))
            }
        </div>
    );
    const dropdownTheme : DropdownMenuTheme = {
        dropdownMenu: styles.dropdownMenu,
        scrollable: "scrollable",
        dropdownPopup: styles.dropdownPopup
    };
    return (
        <Scrollable className={styles.logList}>
            <div>            
                <Dropdown focusKey={FOCUS_AUTO} initialFocused={"Test"} content={dropDownList}>
                    <DropdownToggle className="TEST">
                        {selectedFile}
                    </DropdownToggle>
                </Dropdown>
            </div>
        </Scrollable>
    );
}