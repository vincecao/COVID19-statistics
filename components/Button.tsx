import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import type { ReactElement, Ref } from "react";
import { forwardRef } from "react";

import ButtonExt from "./ButtonExt";

type ButtonProps = {
  text?: string;
  icon?: IconProp;
  small?: boolean;
  type?: "span" | "anchor" | "button";
  color?: string;
  href?: string;
};

function Button({ text, icon, small, type, color, href }: ButtonProps, ref: Ref<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>): ReactElement {
  return (
    <ButtonExt ref={ref} type={type} className={classNames(`button is-${color || "light"}`, { "is-small": small })} href={href}>
      {text && <span>{text}</span>}
      {icon && (
        <span className="icon is-small">
          {icon && <FontAwesomeIcon icon={icon} />}
        </span>
      )}
    </ButtonExt>
  );
}

export default forwardRef(Button);