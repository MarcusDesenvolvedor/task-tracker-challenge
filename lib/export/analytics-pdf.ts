import {
  buildAnalyticsReportLines,
  type AnalyticsExportContext,
} from "./analytics-report";
import { buildExportFilename, downloadBlob } from "./download";

function escapePdfText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

/**
 * Minimal multi-page text PDF writer (PDF 1.4) for analytics exports.
 * Avoids extra dependencies while still producing a downloadable PDF.
 */
export function buildAnalyticsPdf(context: AnalyticsExportContext): Blob {
  const lines = buildAnalyticsReportLines(context);
  const fontSize = 10;
  const lineHeight = 14;
  const marginLeft = 48;
  const marginTop = 752;
  const linesPerPage = 48;

  const pages: string[][] = [];
  for (let index = 0; index < lines.length; index += linesPerPage) {
    pages.push(lines.slice(index, index + linesPerPage));
  }

  if (pages.length === 0) {
    pages.push(["Task Tracker Analytics Report"]);
  }

  const objects: string[] = [];
  const pageObjectNumbers: number[] = [];

  // 1: Catalog, 2: Pages, 3: shared Helvetica font
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = ""; // filled after page objects exist
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  let nextObject = 4;

  for (const pageLines of pages) {
    const contentCommands = [
      "BT",
      `/F1 ${fontSize} Tf`,
      `${marginLeft} ${marginTop} Td`,
    ];

    pageLines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        contentCommands.push(`0 -${lineHeight} Td`);
      }
      contentCommands.push(`(${escapePdfText(line)}) Tj`);
    });
    contentCommands.push("ET");

    const stream = contentCommands.join("\n");
    const contentObjectNumber = nextObject;
    objects[contentObjectNumber] =
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    nextObject += 1;

    const pageObjectNumber = nextObject;
    objects[pageObjectNumber] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents ${contentObjectNumber} 0 R /Resources << /Font << /F1 3 0 R >> >> >>`;
    pageObjectNumbers.push(pageObjectNumber);
    nextObject += 1;
  }

  objects[2] =
    `<< /Type /Pages /Kids [${pageObjectNumbers
      .map((number) => `${number} 0 R`)
      .join(" ")}] /Count ${pageObjectNumbers.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let number = 1; number < nextObject; number += 1) {
    offsets[number] = pdf.length;
    pdf += `${number} 0 obj\n${objects[number]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${nextObject}\n`;
  pdf += "0000000000 65535 f \n";

  for (let number = 1; number < nextObject; number += 1) {
    pdf += `${String(offsets[number]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${nextObject} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

export function exportAnalyticsPdf(context: AnalyticsExportContext): void {
  const blob = buildAnalyticsPdf(context);
  downloadBlob(blob, buildExportFilename("task-analytics", "pdf"));
}
