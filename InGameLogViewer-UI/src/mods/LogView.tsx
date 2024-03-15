import { Scrollable } from 'cs2/ui';
import styles from './components.module.scss';
import { useValue } from 'cs2/api';
import { logContent$ } from './bindings';

export const LogView = () => {    
    let content = useValue(logContent$);
    let contentArr = content.split('\n').map((value) => <p>{value}</p>);

    return (
        <div className={styles.logView}>                    
            {contentArr}            
        </div>
    )
}