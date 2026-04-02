import { useEffect, useState } from "react";

type ContactRow = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
};

const ContactTable = () => {
  const [items, setItems] = useState<ContactRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = (import.meta.env.VITE_BACKEND_API_URL as string | undefined) || "";

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${apiBaseUrl}/api/contact`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Request failed");
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data;
        if (!Array.isArray(list)) {
          throw new Error("Invalid response");
        }

        if (!cancelled) {
          setItems(list);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load contact messages. Please verify GET /api/contact is available.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  return (
    <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm">
      <div className="p-5 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Contact</h2>
        <p className="text-sm text-muted-foreground">Contact form messages</p>
      </div>

      <div className="p-5">
        {isLoading && (
          <div className="text-sm text-muted-foreground">Loading...</div>
        )}

        {!isLoading && error && (
          <div className="text-sm text-destructive">{error}</div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="text-sm text-muted-foreground">No contact messages yet.</div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="py-3 pr-4 font-semibold">Name</th>
                  <th className="py-3 pr-4 font-semibold">Email</th>
                  <th className="py-3 pr-4 font-semibold">Message</th>
                  <th className="py-3 pr-0 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={it.id || it._id || idx} className="border-b border-border last:border-b-0">
                    <td className="py-3 pr-4 font-medium text-foreground whitespace-nowrap">{it.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">{it.email}</td>
                    <td className="py-3 pr-4 text-muted-foreground min-w-[360px]">{it.message}</td>
                    <td className="py-3 pr-0 text-muted-foreground whitespace-nowrap">
                      {it.createdAt ? new Date(it.createdAt).toLocaleString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactTable;
