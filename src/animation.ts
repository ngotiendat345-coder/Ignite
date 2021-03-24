export const FadeIn = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.75,
    },
  
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.75 },
  },
};

export const PopUp = {
  hidden: {
    scale: 0.5,
    opacity: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.75 },
  },
};
