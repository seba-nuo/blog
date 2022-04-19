import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import formidable from "formidable";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "POST":
      const form = formidable({ multiples: false });

      form.parse(
        req,
        async function (
          err,
          fields: formidable.Fields,
          files: formidable.Files
        ) {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          await saveFile(files.foto);
          const prisma = new PrismaClient();
          const nombre = Array.isArray(fields.nombre)
            ? fields.nombre[0]
            : fields.nombre;

          await prisma.usuario
            .create({
              data: {
                nombre: Array.isArray(fields.nombre)
                  ? fields.nombre[0]
                  : fields.nombre,
                apellido: Array.isArray(fields.apellido)
                  ? fields.apellido[0]
                  : fields.apellido,
                email: Array.isArray(fields.correo)
                  ? fields.correo[0]
                  : fields.correo,
                contrasena: Array.isArray(fields.contraseña)
                  ? fields.contraseña[0]
                  : fields.contraseña,
                foto: Array.isArray(fields.foto) ? fields.foto[0] : fields.foto,
              },
            })
            .catch((error) => {
              console.log(error);              
              res.status(500).end();
              return
            });

          res.setHeader(
            "set-cookie",
            cookie.serialize("nombre", nombre, {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 3, // 3 days
              sameSite: "strict",
              path: "/",
            })
          );
        }
      );

      const saveFile = async (foto: any) => {
        if (!Array.isArray(foto)) {
          const data = fs.readFileSync(foto.filepath);
          fs.writeFileSync(`./public/img/${foto.newFilename}`, data);
          fs.unlinkSync(foto.filepath);
        }
      };

      res.status(200).end();
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
