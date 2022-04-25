const { writeFile } = require('fs')
const { loadConfig } = require('unconfig')

async function fn() {
  const { config } = await loadConfig({
    sources: [
      // load from `my.config.xx`
      {
        files: ['./configs/packages/1', './configs/packages/2', './configs/packages/3', './configs/packages/5', './configs/packages/5', './package'],
        // default extensions
        extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
      },
      // load `my` field in `package.json` if no above config files found
      // {
      //   files: 'package.json',
      //   extensions: [],
      //   rewrite(config) {
      //     return config?.my
      //   },
      // },
      // load inline config from `vite.config`
      // {
      //   files: 'vite.config',
      //   async rewrite(config) {
      //     const config = await (typeof config === 'function' ? config() : config)
      //     return config?.my
      //   },
      // },
      // ...
    ],
    // if false, the only the first matched will be loaded
    // if true, all matched will be loaded and deep merged
    merge: true,
  })

  return config
}

fn()
  .then((data) => {
    writeFile('./configs/packages/package.json', JSON.stringify(data), (err) => {
      if (err) throw err
      console.error('complete')
    })
  })
  .catch((err) => {
    console.error(err)
  })
