import path from 'path';
import fs from 'fs';
import conf from 'nconf';


export default (stores) => {
  const storesFiles = stores || {};
  const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  const rootPath = path.normalize(`${__dirname}/../..`);

  console.log('%s - \u001b[32minfo\u001b[39m: [config] using [%s] configuration',
    new Date().toISOString(), env);


  //  Hierarchy
  //
  //  1. Environment variables
  //  2. Arguments
  //  3. ConfigFiles
  conf.env('__');
  conf.argv();

  let i = 1;
  storesFiles.forEach((configFile) => {
    let file = configFile;

    if (file) {
      if (fs.existsSync(file)) {
        if (file.indexOf('/') !== 0) {
          file = `${rootPath}/env/${file}`;
        }
        file = path.normalize(file);
        console.log('%s - \u001b[32minfo\u001b[39m: [config] using file [%s]',
          new Date().toISOString(),
          file);
        try {
          if (!fs.existsSync(file)) {
            throw new Error('File doesn\'t exist');
          }
          const obj = {
            type: 'file',
            file,
          };
          conf.use(`z${i++}`, obj);
        } catch (e) {
          console.log('%s - \u001b[31merror\u001b[39m: [config] file [%s] error [%s]',
            new Date().toISOString(),
            file,
            e.message);
        }
      } else {
        console.log('%s - \u001b[31mwarn\u001b[39m: [config] file [%s] not exists',
          new Date().toISOString(),
          file);
      }
    }
  });

  conf.set('env', env);
  conf.set('rootPath', rootPath);

  return conf;
};
