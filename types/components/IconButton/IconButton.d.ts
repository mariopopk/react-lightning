import { ReactNode } from "react";
import { Variant, Size, Color } from "../../theme/variables";
export interface IconButtonProps {
    children?: ReactNode;
    variant?: Variant;
    size?: Size;
    color?: Color;
}
export declare function IconButton({ children, variant, size, color, ...rest }: IconButtonProps): JSX.Element;
