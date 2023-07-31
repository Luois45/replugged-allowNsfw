import { Injector, webpack } from "replugged";

const injector = new Injector();

export async function start(): Promise<void> {
  // Find the module containing the getCurrentUser function
  const v = webpack.getByProps("getCurrentUser").getCurrentUser();

  if (typeof v === "undefined") return;

  v.nsfwAllowed = true;

  console.log(v);
}

export function stop(): void {
  // Remove all injections when the plugin is stopped
  injector.uninjectAll();
}
