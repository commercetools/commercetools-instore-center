import _ from 'lodash';
import defaultsAssets from './default';
import developmentAssets from './development';
import stageAssets from './stage';
import productionAssets from './production';
import testAssets from './test';

export default (env) => {
  if (env === 'development') {
    return _.merge(defaultsAssets, developmentAssets);
  } else if (env === 'stage') {
    return _.merge(defaultsAssets, stageAssets);
  } else if (env === 'production') {
    return _.merge(defaultsAssets, productionAssets);
  } else if (env === 'test') {
    return _.merge(defaultsAssets, testAssets);
  }
};
