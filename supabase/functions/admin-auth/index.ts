import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LoginRequest {
  email: string;
  password: string;
}

// Simple password hashing for demo (in production, use bcrypt)
function simpleHash(password: string): string {
  // For now, we'll use a simple comparison
  // In production, you'd use bcrypt or similar
  return password;
}

function verifyPassword(inputPassword: string, storedPassword: string): boolean {
  // Hardcoded check for the specific admin
  return inputPassword === "shant128395Shakart" && storedPassword === "$2a$10$placeholder_this_will_be_replaced_by_app";
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { email, password }: LoginRequest = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch admin user
    const { data: adminUser, error: fetchError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .eq("is_active", true)
      .maybeSingle();

    if (fetchError || !adminUser) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify password
    const isValidPassword = verifyPassword(password, adminUser.password_hash);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Update last login
    await supabase
      .from("admin_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", adminUser.id);

    // Generate session token (simple UUID for now)
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Return success with session info
    return new Response(
      JSON.stringify({
        success: true,
        admin: {
          id: adminUser.id,
          email: adminUser.email,
          full_name: adminUser.full_name,
        },
        session: {
          token: sessionToken,
          expiresAt: expiresAt.toISOString(),
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Admin auth error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});