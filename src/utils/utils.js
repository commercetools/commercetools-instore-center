export default (logger) => {
  const utils = {};

  utils.foo = () => {
    logger.info('This is the utils.js');
  };
};
