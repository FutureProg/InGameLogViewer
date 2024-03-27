import { Button, ButtonProps, Portal } from "cs2/ui"
import { toggleLogPanel } from "./bindings";
import { Number2 } from "cs2/bindings";

export const PanelActivationButton = (buttonVariant: "menu" | "flat", position?: Number2) => { 
    return (
        <Button variant={buttonVariant} onSelect={toggleLogPanel} onMouseOver={() => console.log("Hello UI")}>Logs</Button>
    );
}

export const createPanelActivationButton = (buttonVariant: "menu" | "flat", position?: Number2) => () => (
    <Portal>
        <Button 
            variant="menu" 
            onSelect={toggleLogPanel} 
            onClick={toggleLogPanel}
            onMouseOver={() => console.log("Hello UI")}
            style={position? {'position': "absolute", top: `${position.y} rem`, left: `${position.x} rem`} : {}}
            >
            Logs
        </Button>
    </Portal>    
)