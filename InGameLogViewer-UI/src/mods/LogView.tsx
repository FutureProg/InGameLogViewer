import { Scrollable } from 'cs2/ui';
import styles from './components.module.scss';
import { useValue } from 'cs2/api';
import { logContent$, logFileSelected$ } from './bindings';
import { useEffect, useRef } from 'react';

export const LogView = () => {    
    let content = useValue(logContent$);
    let fileSelected = useValue(logFileSelected$);
    let contentArr = content.split('\n').map((value) => <p>{value}</p>);

    let divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;            
        }        
    }, [divRef, content]);
    

    return (
        // <div className={styles.logView} ref={divRef}>
        <div className={styles.logView} ref={divRef}>
            {contentArr}                 
        </div>
        // </div>
    )
}