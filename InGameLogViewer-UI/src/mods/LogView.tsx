import { Scrollable } from 'cs2/ui';
import styles from './components.module.scss';
import { useValue } from 'cs2/api';
import { logContent$ } from './bindings';
import { useEffect, useMemo, useRef } from 'react';

export const LogView = () => {    
    let content = useValue(logContent$);
    let contentArr = content.split('\n').map((value) => <p>{value}</p>);

    let divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;            
        }        
    }, [divRef, content]);       
    
    useMemo(() => {
    }, [divRef]);
    

    return (
        // <div className={styles.logView} ref={divRef}>
        <Scrollable className={styles.logView} ref={divRef}>
            {contentArr}                 
        </Scrollable>
        // </div>
    )
}