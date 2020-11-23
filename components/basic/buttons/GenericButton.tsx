import { forwardRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { buttonVariants } from '@variants/data';

interface GenericButtonProps {
  text?: string;
  fasIcon?: string;
  fabIcon?: string;
  small?: boolean;
  type?: string;
  color?: string;
  href?: string;
}

const Wrapper = ({ type = 'button', children, className, href, wrapperRef }) => {
  if (type === 'span') {
    return (
      <motion.span ref={wrapperRef} variants={buttonVariants} whileHover="hover" className={className}>
        {children}
      </motion.span>
    );
  }
  if (type === 'anchor') {
    return (
      <motion.a
        ref={wrapperRef}
        href={href || undefined}
        // target="_blank"
        rel="noreferrer"
        variants={buttonVariants}
        whileHover="hover"
        className={className}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button ref={wrapperRef} variants={buttonVariants} whileHover="hover" className={className}>
      {children}
    </motion.button>
  );
};

const GenericButton: React.FC<GenericButtonProps> = forwardRef(
  ({ text, fasIcon, fabIcon, small = false, type = 'button', color = 'light', href = '' }, ref) => {
    useEffect(() => {
      if (type) {
      }
    }, []);

    return (
      <Wrapper wrapperRef={ref} type={type} className={`button is-${color} ${small ? 'is-small' : ''}`} href={href}>
        {text && <span>{text}</span>}
        {(fasIcon || fabIcon) && (
          <span className="icon is-small">
            {fasIcon && <i className={`fas fa-${fasIcon}`} />}
            {fabIcon && <i className={`fab fa-${fabIcon}`} />}
          </span>
        )}
      </Wrapper>
    );
  }
);

export default GenericButton;
