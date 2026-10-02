import { revalidateTag } from "next/cache";

/*
 * Laravel paneli məzmun dəyişəndə bura POST göndərir ({ secret }).
 * "cms" teqli bütün API sorğuları dərhal köhnəlir — növbəti açılışda təzə məzmun gəlir.
 */
export async function POST(request: Request) {
  const { secret } = (await request.json().catch(() => ({}))) as { secret?: string };
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidateTag("cms", { expire: 0 });
  return Response.json({ ok: true, revalidated: "cms" });
}
