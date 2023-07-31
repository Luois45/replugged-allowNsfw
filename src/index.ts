import { Injector, webpack } from "replugged";

const injector = new Injector();
let intervalId: NodeJS.Timeout | null = null;

export async function start(): Promise<void> {
  intervalId = setInterval(() => {
    const v = webpack.getByProps("getCurrentUser").getCurrentUser();

    if (typeof v === "undefined") return;
    if (v == true) return;

    v.nsfwAllowed = true;
  }, 1000);
}

export function stop(): void {
  // Remove all injections when the plugin is stopped
  injector.uninjectAll();

  // Clear the interval when the plugin is stopped
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
