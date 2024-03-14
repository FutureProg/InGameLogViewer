import styles from "./components.module.scss";
import { Button, Scrollable } from "cs2/ui";

export const LogListComponent = () => {

    const filenames: string[] = ["abc", "def", "ghi", "jkl", "mno"];    
    const buttonList = filenames.map((file, idx) => (
        <div key={idx} className={styles.logListItem}>
           <Button key={idx} style={{width: '100%'}} variant="floating">{file}</Button>
        </div>
    ))
    return (
        <Scrollable className={styles.logList}>
            <div>            
                {buttonList}
            </div>
        </Scrollable>
    );
}