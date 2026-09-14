import { FIELD_NAMES, validateField, type FieldName } from "@/lib/registration";
import { getContent } from "@/lib/content";
import { appendRow } from "@/lib/sheets";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const readField = (name: string) => String(payload[name] ?? "").trim();

  if (readField("website")) {
    return Response.json({ ok: true });
  }

  const content = await getContent();
  const allowedWorkshops = content.workshops.map((workshop) => workshop.title);

  const errors: Partial<Record<FieldName, string>> = {};

  for (const name of FIELD_NAMES) {
    const message = validateField(name, readField(name));
    if (message) errors[name] = message;
  }

  const workshop = readField("workshop");
  if (!errors.workshop && !allowedWorkshops.includes(workshop)) {
    errors.workshop =
      "Ten warsztat nie jest już dostępny. Odśwież stronę i wybierz z aktualnej listy.";
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const submittedAt = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "Europe/Warsaw",
    dateStyle: "short",
    timeStyle: "medium",
  }).format();

  try {
    await appendRow([
      readField("firstName"),
      readField("lastName"),
      readField("email"),
      readField("phone"),
      workshop,
      submittedAt,
    ]);
  } catch (err) {
    console.error("[zapisy] Nie udało się dopisać wiersza do arkusza.", err);
    return Response.json(
      {
        ok: false,
        message:
          "Nie udało się zapisać zgłoszenia. Spróbuj ponownie za chwilę.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
