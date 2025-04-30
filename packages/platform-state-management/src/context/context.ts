import { ApplicationContext } from './applicationContext'

class ApplicationInstance {
  static applicationContext: ApplicationContext = new ApplicationContext()

  getContext(): ApplicationContext {
    return ApplicationInstance.applicationContext
  }

  setContext(ctx: ApplicationContext): void {
    ApplicationInstance.applicationContext = ctx
  }
}

export const applicationInstance = new ApplicationInstance()
