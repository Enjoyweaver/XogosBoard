import { getDocument } from "@/lib/actions";
import { SpreadsheetDocumentView } from "./SpreadsheetDocumentView";

export default async function SpreadsheetPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data = null, error = null } = await getDocument({ documentId: id });

  return <SpreadsheetDocumentView initialDocument={data} initialError={error} />;
}
