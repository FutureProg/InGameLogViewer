import { Scrollable } from 'cs2/ui';
import styles from './components.module.scss';

export const LogView = () => {
    return (
        <Scrollable className={styles.logView}>        
            <div>
            A<br/><br/>A<br/><br/>A<br/><br/>A<br/><br/>A<br/><br/>A<br/><br/>A<br/><br/>A<br/><br/>                                
            </div>                                    
        </Scrollable>
    )
}