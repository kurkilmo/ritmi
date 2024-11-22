import { getAllSongs } from "@/services/mock-songservice";

export async function GET() {
    return Response.json(getAllSongs())
}