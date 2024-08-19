import { boot } from 'quasar/wrappers'
import { FullStory, init } from '@fullstory/browser';

init({
  orgId: process.env.FULLSTORY_ORG_ID,
  devMode: process.env.NODE_ENV === 'development',
});

export default boot(({ app }) => {

  app.config.globalProperties.$fullstory = FullStory;
})
