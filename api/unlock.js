import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            error: "Method not allowed",
        });

    }

    const ip =
        req.headers["x-forwarded-for"]
            ?.toString()
            .split(",")[0]
        || req.socket.remoteAddress
        || "unknown";

    const { password } = req.body;

    const { data: existing } = await supabase
        .from("vault_attempts")
        .select("*")
        .eq("ip", ip)
        .maybeSingle();

    // CHECK LOCK

    if (
        existing?.locked_until &&
        new Date(existing.locked_until) > new Date()
    ) {

        return res.status(429).json({
            success: false,
            locked: true,
            lockedUntil: existing.locked_until,
        });

    }

    // CORRECT PASSWORD

    if (password === process.env.VAULT_PASSWORD) {

        await supabase
            .from("vault_attempts")
            .delete()
            .eq("ip", ip);

        return res.status(200).json({
            success: true,
        });

    }

    // WRONG PASSWORD

    const attempts =
        (existing?.attempts || 0) + 1;

    // LOCK AFTER 4 ATTEMPTS

    if (attempts >= 4) {

        const lockedUntil = new Date(
            Date.now() + 3 * 60 * 60 * 1000
        );

        await supabase
            .from("vault_attempts")
            .upsert({
                ip,
                attempts,
                locked_until:
                    lockedUntil.toISOString(),
            });

        return res.status(429).json({
            success: false,
            locked: true,
            lockedUntil,
        });

    }

    // SAVE FAILED ATTEMPT

    await supabase
        .from("vault_attempts")
        .upsert({
            ip,
            attempts,
        });

    return res.status(401).json({
        success: false,
        remaining: 4 - attempts,
    });

}