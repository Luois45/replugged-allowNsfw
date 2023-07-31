import { Injector, Logger, webpack } from "replugged";

const inject = new Injector();
const logger = Logger.plugin("allowNsfw");

export async function start(): Promise<void> {
  const getCurrentUserMod = await webpack.waitForModule<{
    getCurrentUser: () => {
      nsfwAllowed: boolean;
    };
  }>(webpack.filters.byProps("getCurrentUser"));

  if (getCurrentUserMod) {
    inject.after(getCurrentUserMod, "getCurrentUser", (args, ret) => {
      if (ret) {
        ret.nsfwAllowed = true;
      }
    });
  }
}

export function stop(): void {
  inject.uninjectAll();
}
