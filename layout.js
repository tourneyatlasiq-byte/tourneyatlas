import { supabase, DEMO_TEAM_ID } from "../lib/supabaseClient";

const fmtMoney = (n) => `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
const fmtDate = (d) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";

const decisionColor = { Yes: "#6FA873", Maybe: "#E0A339", No: "#8CA0B3" };
const decisionLabel = { Yes: "COMMITTED", Maybe: "CONSIDERING", No: "PASSED" };

export default async function Home() {
  const { data: tournaments, error } = await supabase
    .from("tournaments")
    .select("id, name, location, start_date, end_date, total_cost, decision, travel_type, notes")
    .eq("team_id", DEMO_TEAM_ID)
    .order("start_date");

  const groups = { Yes: [], Maybe: [], No: [] };
  (tournaments || []).forEach((t) => groups[t.decision || "Maybe"]?.push(t));

  return (
    <main
      style={{
        background: "#151E29",
        color: "#F5F3EE",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        padding: "32px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 32,
            fontWeight: 800,
            marginBottom: 4,
          }}
        >
          TOURNEYATLAS <span style={{ color: "#E0A339" }}>IQ</span>
        </h1>
        <p style={{ color: "#8CA0B3", fontSize: 13, marginBottom: 28 }}>
          Tournament Board — live from your database
        </p>

        {error && (
          <div
            style={{
              background: "rgba(201,114,70,0.15)",
              border: "1px solid #A2492F",
              color: "#C97246",
              padding: "12px 16px",
              borderRadius: 6,
              marginBottom: 20,
              fontSize: 14,
            }}
          >
            Couldn't load tournaments: {error.message}. Make sure 01_schema.sql and 02_seed.sql
            have both been run in the Supabase SQL editor.
          </div>
        )}

        {!error && (tournaments || []).length === 0 && (
          <div style={{ color: "#8CA0B3", fontSize: 14 }}>
            No tournaments found yet — run 02_seed.sql in your Supabase SQL editor, then refresh.
          </div>
        )}

        {["Yes", "Maybe", "No"].map((key) =>
          groups[key].length ? (
            <div key={key} style={{ marginBottom: 32 }}>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: decisionColor[key],
                  marginBottom: 12,
                  letterSpacing: "0.03em",
                }}
              >
                {decisionLabel[key]} ({groups[key].length})
              </h2>
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
                {groups[key].map((t) => (
                  <div
                    key={t.id}
                    style={{
                      background: "#1E2A38",
                      border: "1px solid rgba(245,243,238,0.1)",
                      borderRadius: 8,
                      padding: 16,
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#8CA0B3", marginBottom: 12 }}>
                      {fmtDate(t.start_date)}
                      {t.end_date && t.end_date !== t.start_date ? `–${fmtDate(t.end_date)}` : ""} ·{" "}
                      {t.location}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 18,
                        fontWeight: 700,
                        borderTop: "1px solid rgba(245,243,238,0.1)",
                        paddingTop: 10,
                      }}
                    >
                      {fmtMoney(t.total_cost)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </main>
  );
}
