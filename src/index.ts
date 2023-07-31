import { Injector, webpack } from "replugged";

const injector = new Injector();
let intervalId: NodeJS.Timeout | null = null;

export async function start(): Promise<void> {
  intervalId = setInterval(() => {
    const v = webpack.getByProps("getCurrentUser").getCurrentUser();

    if (typeof v === "undefined") return;
    if (v.nsfwAllowed == true) return;

    v.nsfwAllowed = true;
  }, 1000);
}

export function stop(): void {
  injector.uninjectAll();

  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
