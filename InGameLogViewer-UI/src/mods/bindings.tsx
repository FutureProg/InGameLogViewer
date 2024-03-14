import { bindValue, trigger, useValue } from "cs2/api";
import mod from '../../mod.json';

export const logPanelEnabled$ = bindValue<boolean>(mod.id, 'LogPanelEnabled');
export function handleToggle() {
    trigger(mod.id, 'LogPanelToggled');
}