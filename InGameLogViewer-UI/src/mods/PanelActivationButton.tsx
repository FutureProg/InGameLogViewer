import { Button } from "cs2/ui"
import { toggleLogPanel } from "./bindings";

export const PanelActivationButton = () => {
    return (
        <Button variant="menu" onSelect={toggleLogPanel}>Logs</Button>
    );
}