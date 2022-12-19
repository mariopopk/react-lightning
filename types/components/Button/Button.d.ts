import { ReactNode } from "react";
import { Variant, Size, Color } from "../../theme/variables";
export interface ButtonProps {
    children?: ReactNode;
    variant?: Variant;
    size?: Size;
    color?: Color;
}
export declare function Button({ children, variant, size, color, ...rest }: ButtonProps): JSX.Element;
