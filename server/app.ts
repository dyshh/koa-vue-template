import * as Koa from "koa";
import * as serve from "koa-static";
import * as koaWebpack from 'koa-webpack'
import * as history from 'koa2-history-api-fallback'
const {IS_PROD, PORT} = require('./config')


async function init() {
  const app: Koa = new Koa()

  app.use(history())

  app.use(serve(__dirname + "/public"));

  if (!IS_PROD) {
    // 开发环境webpack热更新
    const middleware = await koaWebpack({
        config: require('../client/webpack.config.js'),
        devMiddleware: {
            stats: 'minimal'
        }
    })
    app.use(middleware)
  }

  app.listen(PORT);

  return app
}

init()
