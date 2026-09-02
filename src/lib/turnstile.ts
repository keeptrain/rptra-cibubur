"use server";

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET;
const TURNSTILE_HOSTNAMES = (process.env.TURNSTILE_HOSTNAMES ?? "")
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

if (!TURNSTILE_SECRET) {
  throw new Error("TURNSTILE_SECRET is not configured");
}

if (TURNSTILE_HOSTNAMES.length === 0) {
  throw new Error("TURNSTILE_HOSTNAMES is not configured");
}

export async function verifyTurnstile({
  token,
  expectedAction,
  remoteIp,
}: {
  token: string | null | undefined;
  expectedAction: string;
  remoteIp?: string | null;
}): Promise<{ success: boolean; error?: string }> {
  const secret = TURNSTILE_SECRET;
  const hostnames = TURNSTILE_HOSTNAMES;

  if (!secret) {
    return { success: false, error: "TURNSTILE_SECRET not configured" };
  }

  if (!token || token.length === 0 || token.length > 2048) {
    return { success: false, error: "Missing token" };
  }

  if (hostnames.length === 0) {
    return { success: false, error: "TURNSTILE_HOSTNAMES not configured" };
  }

  let result: {
    success: boolean;
    action?: string;
    hostname?: string;
    "error-codes"?: string[];
  };
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10_000),
        body: new URLSearchParams({
          secret,
          response: token,
          ...(remoteIp ? { remoteip: remoteIp } : {}),
        }),
      },
    );
    if (!res.ok) throw new Error(`siteverify ${res.status}`);
    result = await res.json();
  } catch {
    return { success: false, error: "Verification failed" };
  }

  if (
    !result.success ||
    result.action !== expectedAction ||
    !result.hostname ||
    !hostnames.includes(result.hostname)
  ) {
    return {
      success: false,
      error: `Invalid token: ${result["error-codes"]?.join(",")}`,
    };
  }

  return { success: true };
}
