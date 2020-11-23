export const headerItemVariants = (index: number) => ({
  hidden: {
    scale: 0.5,
    x: `-100vw`,
  },
  visible: {
    scale: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
      delay: 0.1 * index,
    },
  },
});

export const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      yoyo: Infinity,
    },
  },
};

export const mainVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      // ease: 'easeInOut',
      // duration: 0.7,
    },
  },
};

export const stickyVariants = {
  hidden: {
    y: '-50vh',
  },
  visible: {
    y: 0,
    transition: {
      type: 'tween',
    },
  },
  exit: {
    y: '-50vh',
    transition: {
      ease: 'easeInOut',
    },
  },
};

export const containerVariants = (index: number) => ({
  hidden: {
    opacity: 0,
    x: '100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 8,
      delay: 0.2 * index,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      ease: 'easeInOut',
    },
  },
});

export const usDomesticRedirectVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
      delay: 0.5,
    },
  },
};

export const footerVariants = {
  hidden: {
    scale: 0.5,
    y: `100vw`,
  },
  visible: {
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
    },
  },
};

export const cardItemVariants = (index: number) => ({
  hidden: {
    y: '-50vh',
  },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
      delay: 0.2 * index,
    },
  },
});
