//SEGURIDAD EN LAS RUTAS
export {default} from "next-auth/middleware"

export const config = {
    matcher: ["/dashboard/:path*"]
}