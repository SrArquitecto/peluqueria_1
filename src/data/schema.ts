import { z } from "astro/zod";

const texto = z.string().min(1);
const url = z.union([z.literal(""), z.url()]);

export const Negocio = z.strictObject({
  nombre: texto,
  lema: texto,
  descripcion: texto.max(160, "máx. 160 caracteres para Google"),
  sobre: texto,
  colorPrincipal: z.string().regex(/^#[0-9a-fA-F]{6}$/, "formato #rrggbb"),
  colorSobrePrincipal: z.string().regex(/^#[0-9a-fA-F]{6}$/, "formato #rrggbb"),
  imagenPortada: z.string().optional(),
  imagenPortadaDerecha: z.string().optional(),
  telefono: z.string().regex(/^[\d\s+]{9,}$/, "solo dígitos, espacios o +"),
  whatsapp: z.string().regex(/^(\d{9,15})?$/, "solo dígitos con prefijo, sin +"),
  email: z.union([z.literal(""), z.email()]),
  direccion: texto,
  mapaUrl: url,
  redes: z.strictObject({ instagram: url, facebook: url }),
  horario: z.array(z.strictObject({ dias: texto, horas: texto })).min(1),
  servicios: z
    .array(
      z.strictObject({
        categoria: texto,
        items: z
          .array(
            z.strictObject({
              nombre: texto,
              precio: texto,
              descripcion: z.string().optional(),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
  // Datos obligatorios del titular (LSSI-CE art. 10). Los rellena el cliente, no el agente.
  legal: z.strictObject({
    titular: texto,
    nif: texto,
    domicilio: texto,
    email: z.email(),
    registroMercantil: z.string().optional(),
  }),
  antesDespues: z.array(z.strictObject({ antes: texto, despues: texto, alt: texto })),
  galeria: z.array(z.strictObject({ src: texto, alt: texto })),
  opiniones: z.array(
    z.strictObject({
      nombre: texto,
      texto: texto,
      estrellas: z.number().int().min(1).max(5),
    }),
  ),
});
