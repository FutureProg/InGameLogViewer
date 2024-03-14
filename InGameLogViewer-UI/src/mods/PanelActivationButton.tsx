import { Button } from "cs2/ui"
import { toggleLogPanel } from "./bindings";

export const PanelActivationButton = () => {
    return (
        <Button variant="menu" onSelect={toggleLogPanel} onMouseOver={() => console.log("Hello UI")}>Logs</Button>
    );
}