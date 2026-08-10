"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { exportAnalyticsCsv } from "@/lib/export/analytics-csv";
import { exportAnalyticsPdf } from "@/lib/export/analytics-pdf";
import type { AnalyticsExportContext } from "@/lib/export/analytics-report";

interface AnalyticsExportButtonsProps {
  context: AnalyticsExportContext;
}

export function AnalyticsExportButtons({
  context,
}: AnalyticsExportButtonsProps) {
  const [pendingFormat, setPendingFormat] = useState<"csv" | "pdf" | null>(
    null,
  );

  function handleExport(format: "csv" | "pdf") {
    setPendingFormat(format);

    try {
      if (format === "csv") {
        exportAnalyticsCsv(context);
      } else {
        exportAnalyticsPdf(context);
      }
    } finally {
      // Keep a short pending state so the click feels acknowledged.
      window.setTimeout(() => setPendingFormat(null), 250);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="secondary"
        onClick={() => handleExport("csv")}
        disabled={pendingFormat !== null}
        className="min-h-9 px-3 text-xs"
      >
        {pendingFormat === "csv" ? "Exporting…" : "Export spreadsheet"}
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => handleExport("pdf")}
        disabled={pendingFormat !== null}
        className="min-h-9 px-3 text-xs"
      >
        {pendingFormat === "pdf" ? "Exporting…" : "Export PDF"}
      </Button>
    </div>
  );
}
