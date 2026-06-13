import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    try {

        console.log("SUPABASE_URL exists:", !!process.env.SUPABASE_URL);
        console.log(
            "SERVICE_ROLE exists:",
            !!process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data, error } = await supabase
            .from("vault_attempts")
            .select("*")
            .limit(1);

        console.log("Data:", data);
        console.log("Error:", error);

        return res.status(200).json({
            success: true,
            debug: true,
            data,
            error,
        });

    } catch (err) {

        console.error("CRASH:", err);

        return res.status(500).json({
            success: false,
            error: String(err),
        });

    }
}