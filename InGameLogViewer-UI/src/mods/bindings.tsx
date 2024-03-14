import { bindValue, trigger, useValue } from "cs2/api";
import mod from '../../mod.json';

export const logPanelEnabled$ = bindValue<boolean>(mod.id, 'LogPanelEnabled', false);
export function toggleLogPanel() {
    trigger(mod.id, 'LogPanelToggled');
}

export function closeLogPanel() {
    trigger(mod.id, 'LogPanelClosed');
}

export const logFiles$ = bindValue<string[]>(mod.id, 'LogFiles', ["abc", "def", "ghi", "jkl", "mno"]);
export const logFileSelected$ = bindValue<string>(mod.id, "LogFileSelected", "");
export function openLogFile(fileName : string) {
    trigger(mod.id, 'OpenLogFile', fileName);    
}