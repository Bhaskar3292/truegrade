import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Booking() {
  const [fuelType, setFuelType] = useState<"Regular" | "Ultra" | "Diesel">("Regular");
  const [gallons, setGallons] = useState<number>(50);
  const [stationName, setStationName] = useState("");
  const [address, setAddress] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!stationName.trim() || !address.trim()) {
      setError("Station name/address required");
      return;
    }

    const token = localStorage.getItem("tg_token");
    if (!token) {
      setError("Please login again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fuelType,
          gallons,
          stationName,
          address,
          dateTime,
          notes,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.message || "Server error");
        return;
      }

      setSuccess("Order submitted. Our team will email you a confirmation shortly.");
      // optional: reset form
      // setStationName(""); setAddress(""); setDateTime(""); setNotes(""); setGallons(50); setFuelType("Regular");
    } catch {
      setError("Server not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black">Request Fuel Delivery</h1>
        <p className="text-muted-foreground mt-1">Choose gallons, fuel type, and station details.</p>

        <form onSubmit={submit} className="mt-8 rounded-2xl border bg-white p-6 shadow-sm space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 text-green-800 px-3 py-2 text-sm border border-green-200">
              {success}
            </div>
          )}

          <div>
            <label className="text-sm font-semibold">Fuel Type</label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value as any)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            >
              <option value="Regular">Regular</option>
              <option value="Ultra">Ultra</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Gallons</label>
            <input
              type="number"
              min={1}
              value={gallons}
              onChange={(e) => setGallons(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
            <p className="text-xs text-muted-foreground mt-1">Enter how many gallons you need.</p>
          </div>

          <div>
            <label className="text-sm font-semibold">Station Name</label>
            <input
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              placeholder="e.g. Chevron"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Station Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              placeholder="Street, City, State, ZIP"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Preferred Date & Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 min-h-[110px]"
              placeholder="Gate code, pump location, special instructions..."
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 text-white py-3 font-semibold hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Fuel Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
