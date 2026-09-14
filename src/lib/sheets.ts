import { createSign } from "node:crypto";

const scope = "https://www.googleapis.com/auth/spreadsheets";
const aud = "https://oauth2.googleapis.com/token";
const URN = "urn:ietf:params:oauth:grant-type:jwt-bearer";

type Row = [
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  workshop: string,
  submittedAt: string,
];

export const createJWT = () => {
  const iss = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!iss || !key)
    throw new Error("Brak wystarczającej ilości danych aby utworzyć podpis!");

  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const payload = {
    iss,
    scope,
    aud,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
    "base64url",
  );

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );

  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const sign = createSign("RSA-SHA256")
    .update(signingInput)
    .sign(key)
    .toString("base64url");

  return `${signingInput}.${sign}`;
};

export async function getAccessToken(): Promise<string> {
  const urlParams = new URLSearchParams({
    grant_type: URN,
    assertion: createJWT(),
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: urlParams,
  });
  if (!response.ok) {
    const raw = await response.text();
    try {
      const rawParsed = JSON.parse(raw);
      console.error("[sheets] Nie udało się uzyskać tokenu", {
        status: response.status,
        error: rawParsed,
        description: raw,
      });
    } catch {
      console.error(raw);
    }

    throw new Error("Błąd w procesie uzyskiwania tokenu dostępu");
  }
  const data = await response.json();

  const { access_token } = data;

  if (typeof access_token !== "string")
    throw new Error("Błędny output - token dostępu nie jest stringiem");

  return access_token;
}

export const appendRow = async (values: Row): Promise<void> => {
  const id = process.env.GOOGLE_SHEET_ID;

  if (!id) throw new Error("Błąd w odczytywaniu zmiennych");
  const accessToken = await getAccessToken();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent("zapisy!A:F")}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const mappedValues = values.map((value) => {
    const trimmedValue = value.trim();
    if (
      trimmedValue.startsWith("@") ||
      trimmedValue.startsWith("=") ||
      trimmedValue.startsWith("+") ||
      trimmedValue.startsWith("-")
    ) {
      return `'${trimmedValue}`;
    } else {
      return trimmedValue;
    }
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [mappedValues],
    }),
  });

  if (!response.ok) {
    const raw = await response.text();

    try {
      const rawParsed = JSON.parse(raw);
      console.error("[sheets] Nie udało się dodać danych do bazy", {
        status: response.status,
        error: rawParsed,
        description: raw,
      });
    } catch {
      console.error(raw);
    }
    throw new Error("Błąd w procesie dodawania danych do arkusza");
  }
};
