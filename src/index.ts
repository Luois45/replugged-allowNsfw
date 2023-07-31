import { Injector, webpack } from "replugged";

const injector = new Injector();
let intervalId: NodeJS.Timeout | null = null;

export function waitForValue(): Promise<any> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const v = webpack.getByProps("getCurrentUser").getCurrentUser();
      if (typeof v !== "undefined") {
        if (v.hasOwnProperty("nsfwAllowed")) {
          clearInterval(interval);
          resolve(v);
        }
      }
    }, 1);
  });
}

export async function start(): Promise<void> {
  const v = await waitForValue();

  v.nsfwAllowed = true;
}

export function stop(): void {
  injector.uninjectAll();

  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
