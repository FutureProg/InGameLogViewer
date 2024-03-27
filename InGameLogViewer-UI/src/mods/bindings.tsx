import { bindValue, trigger, useValue } from "cs2/api";
import mod from '../../mod.json';

export const logPanelEnabled$ = bindValue<boolean>(mod.fullname, 'LogPanelEnabled', false);
export function toggleLogPanel() {
    trigger(mod.fullname, 'LogPanelToggled');
}

export function closeLogPanel() {
    trigger(mod.fullname, 'LogPanelClosed');
}

export const logFiles$ = bindValue<string[]>(mod.fullname, 'LogFiles', ["abc", "def", "ghi", "jkl", "mno"]);
export const logFileSelected$ = bindValue<string>(mod.fullname, "LogFileSelected", "");
export function openLogFile(fileName : string) {    
    trigger(mod.fullname, 'OpenLogFile', fileName);    
}

export const logContent$ = bindValue<string>(mod.fullname, 'LogContent', '');
