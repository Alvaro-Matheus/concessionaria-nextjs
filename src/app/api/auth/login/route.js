import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "Token não enviado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = await getAuth().verifyIdToken(token);

    return Response.json({
      message: "Usuário autenticado com sucesso",
      user: {
        uid: decoded.uid,
        email: decoded.email,
      },
    });
  } catch (err) {

    return Response.json(
      {
        error: "Token inválido ou expirado",
        code: err.code,
      },
      { status: 401 }
    );
  }
}