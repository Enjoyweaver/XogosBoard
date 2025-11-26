"use client";

import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { nanoid } from "nanoid";
import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useState,
  CSSProperties,
} from "react";
import {
  BoldIcon,
  ItalicIcon,
  PlusIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from "@/icons";
import {
  Cell,
  CellFormat,
  Column,
  Row,
  useMutation,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { Button } from "@/primitives/Button";
import { DocumentSpinner } from "@/primitives/Spinner";
import { Tooltip } from "@/primitives/Tooltip";
import styles from "./Spreadsheet.module.css";

const DEFAULT_COLUMN_WIDTH = 100;
const DEFAULT_ROW_HEIGHT = 36;
const INITIAL_COLUMNS = 8;
const INITIAL_ROWS = 20;

// Type for immutable column/row data from useStorage
type ImmutableColumn = { readonly id: string; readonly width: number };
type ImmutableRow = { readonly id: string; readonly height: number };
type ImmutableCell = { readonly value: string; readonly format?: CellFormat };

// Generate column header letters (A, B, C, ... Z, AA, AB, etc.)
function getColumnLabel(index: number): string {
  let label = "";
  let num = index;
  while (num >= 0) {
    label = String.fromCharCode((num % 26) + 65) + label;
    num = Math.floor(num / 26) - 1;
  }
  return label;
}

// Create cell key from column and row IDs
function getCellKey(columnId: string, rowId: string): string {
  return `${columnId}:${rowId}`;
}

export function Spreadsheet() {
  return (
    <ClientSideSuspense fallback={<DocumentSpinner />}>
      {() => <SpreadsheetEditor />}
    </ClientSideSuspense>
  );
}

function SpreadsheetEditor() {
  const isReadOnly = useSelf((me) => !me.canWrite);
  const [selectedCell, setSelectedCell] = useState<{
    columnId: string;
    rowId: string;
  } | null>(null);

  // Get spreadsheet data from storage (returns immutable data)
  const columns = useStorage((root) => root.spreadsheet?.columns ?? null);
  const rows = useStorage((root) => root.spreadsheet?.rows ?? null);
  const cells = useStorage((root) => root.spreadsheet?.cells ?? null);

  // Get current cell format
  const currentCellFormat = selectedCell
    ? cells?.get(getCellKey(selectedCell.columnId, selectedCell.rowId))?.format
    : undefined;

  // Initialize spreadsheet if it doesn't exist
  const initializeSpreadsheet = useMutation(({ storage }) => {
    if (storage.get("spreadsheet")) return;

    const initialColumns = new LiveList<Column>([]);
    const initialRows = new LiveList<Row>([]);
    const initialCells = new LiveMap<string, Cell>();

    // Create initial columns
    for (let i = 0; i < INITIAL_COLUMNS; i++) {
      initialColumns.push(
        new LiveObject({
          id: nanoid(),
          width: DEFAULT_COLUMN_WIDTH,
        })
      );
    }

    // Create initial rows
    for (let i = 0; i < INITIAL_ROWS; i++) {
      initialRows.push(
        new LiveObject({
          id: nanoid(),
          height: DEFAULT_ROW_HEIGHT,
        })
      );
    }

    storage.set(
      "spreadsheet",
      new LiveObject({
        cells: initialCells,
        columns: initialColumns,
        rows: initialRows,
      })
    );
  }, []);

  // Initialize on mount if needed
  useEffect(() => {
    if (columns === null) {
      initializeSpreadsheet();
    }
  }, [columns, initializeSpreadsheet]);

  // Update cell value
  const updateCell = useMutation(
    ({ storage }, columnId: string, rowId: string, value: string) => {
      const spreadsheetData = storage.get("spreadsheet");
      if (!spreadsheetData) return;

      const cellsMap = spreadsheetData.get("cells");
      const cellKey = getCellKey(columnId, rowId);

      const existingCell = cellsMap.get(cellKey);
      if (existingCell) {
        existingCell.set("value", value);
      } else if (value !== "") {
        cellsMap.set(cellKey, new LiveObject({ value }));
      }
    },
    []
  );

  // Update cell format
  const updateCellFormat = useMutation(
    (
      { storage },
      columnId: string,
      rowId: string,
      formatUpdate: Partial<CellFormat>
    ) => {
      const spreadsheetData = storage.get("spreadsheet");
      if (!spreadsheetData) return;

      const cellsMap = spreadsheetData.get("cells");
      const cellKey = getCellKey(columnId, rowId);

      const existingCell = cellsMap.get(cellKey);
      if (existingCell) {
        const currentFormat = existingCell.get("format") || {};
        existingCell.set("format", { ...currentFormat, ...formatUpdate });
      } else {
        cellsMap.set(
          cellKey,
          new LiveObject({ value: "", format: formatUpdate })
        );
      }
    },
    []
  );

  // Add column
  const addColumn = useMutation(({ storage }) => {
    const spreadsheetData = storage.get("spreadsheet");
    if (!spreadsheetData) return;

    spreadsheetData.get("columns").push(
      new LiveObject({
        id: nanoid(),
        width: DEFAULT_COLUMN_WIDTH,
      })
    );
  }, []);

  // Add row
  const addRow = useMutation(({ storage }) => {
    const spreadsheetData = storage.get("spreadsheet");
    if (!spreadsheetData) return;

    spreadsheetData.get("rows").push(
      new LiveObject({
        id: nanoid(),
        height: DEFAULT_ROW_HEIGHT,
      })
    );
  }, []);

  const getCellData = useCallback(
    (columnId: string, rowId: string): ImmutableCell | null => {
      if (!cells) return null;
      const cell = cells.get(getCellKey(columnId, rowId));
      return cell ?? null;
    },
    [cells]
  );

  const handleCellSelect = useCallback(
    (columnId: string, rowId: string) => {
      setSelectedCell({ columnId, rowId });
    },
    []
  );

  const toggleFormat = useCallback(
    (formatKey: keyof CellFormat) => {
      if (!selectedCell) return;
      const currentValue = currentCellFormat?.[formatKey];
      updateCellFormat(selectedCell.columnId, selectedCell.rowId, {
        [formatKey]: !currentValue,
      });
    },
    [selectedCell, currentCellFormat, updateCellFormat]
  );

  const setAlignment = useCallback(
    (align: "left" | "center" | "right") => {
      if (!selectedCell) return;
      updateCellFormat(selectedCell.columnId, selectedCell.rowId, {
        textAlign: align,
      });
    },
    [selectedCell, updateCellFormat]
  );

  if (!columns || !rows) {
    return <DocumentSpinner />;
  }

  // Convert readonly arrays to regular arrays for mapping
  const columnsArray: ImmutableColumn[] = [...columns];
  const rowsArray: ImmutableRow[] = [...rows];

  return (
    <div className={styles.container}>
      {!isReadOnly && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarGroup}>
            <Tooltip content="Add column">
              <Button
                icon={<PlusIcon />}
                onClick={addColumn}
                variant="subtle"
                className={styles.toolbarButton}
              >
                Column
              </Button>
            </Tooltip>
            <Tooltip content="Add row">
              <Button
                icon={<PlusIcon />}
                onClick={addRow}
                variant="subtle"
                className={styles.toolbarButton}
              >
                Row
              </Button>
            </Tooltip>
          </div>

          <div className={styles.toolbarSeparator} />

          <div className={styles.toolbarGroup}>
            <Tooltip content="Bold">
              <Button
                icon={<BoldIcon />}
                onClick={() => toggleFormat("bold")}
                variant="subtle"
                className={`${styles.toolbarButton} ${
                  currentCellFormat?.bold ? styles.toolbarButtonActive : ""
                }`}
                disabled={!selectedCell}
              />
            </Tooltip>
            <Tooltip content="Italic">
              <Button
                icon={<ItalicIcon />}
                onClick={() => toggleFormat("italic")}
                variant="subtle"
                className={`${styles.toolbarButton} ${
                  currentCellFormat?.italic ? styles.toolbarButtonActive : ""
                }`}
                disabled={!selectedCell}
              />
            </Tooltip>
            <Tooltip content="Underline">
              <Button
                icon={<UnderlineIcon />}
                onClick={() => toggleFormat("underline")}
                variant="subtle"
                className={`${styles.toolbarButton} ${
                  currentCellFormat?.underline ? styles.toolbarButtonActive : ""
                }`}
                disabled={!selectedCell}
              />
            </Tooltip>
          </div>

          <div className={styles.toolbarSeparator} />

          <div className={styles.toolbarGroup}>
            <Tooltip content="Align left">
              <Button
                icon={<AlignLeftIcon />}
                onClick={() => setAlignment("left")}
                variant="subtle"
                className={`${styles.toolbarButton} ${
                  currentCellFormat?.textAlign === "left"
                    ? styles.toolbarButtonActive
                    : ""
                }`}
                disabled={!selectedCell}
              />
            </Tooltip>
            <Tooltip content="Align center">
              <Button
                icon={<AlignCenterIcon />}
                onClick={() => setAlignment("center")}
                variant="subtle"
                className={`${styles.toolbarButton} ${
                  currentCellFormat?.textAlign === "center"
                    ? styles.toolbarButtonActive
                    : ""
                }`}
                disabled={!selectedCell}
              />
            </Tooltip>
            <Tooltip content="Align right">
              <Button
                icon={<AlignRightIcon />}
                onClick={() => setAlignment("right")}
                variant="subtle"
                className={`${styles.toolbarButton} ${
                  currentCellFormat?.textAlign === "right"
                    ? styles.toolbarButtonActive
                    : ""
                }`}
                disabled={!selectedCell}
              />
            </Tooltip>
          </div>

          {selectedCell && (
            <>
              <div className={styles.toolbarSeparator} />
              <div className={styles.selectedCellInfo}>
                Cell:{" "}
                {getColumnLabel(
                  columnsArray.findIndex((c) => c.id === selectedCell.columnId)
                )}
                {rowsArray.findIndex((r) => r.id === selectedCell.rowId) + 1}
              </div>
            </>
          )}
        </div>
      )}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.cornerCell}></th>
              {columnsArray.map((col: ImmutableColumn, index: number) => (
                <th
                  key={col.id}
                  className={styles.headerCell}
                  style={{ width: col.width }}
                >
                  {getColumnLabel(index)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowsArray.map((row: ImmutableRow, rowIndex: number) => (
              <tr key={row.id}>
                <td className={styles.rowHeader}>{rowIndex + 1}</td>
                {columnsArray.map((col: ImmutableColumn) => (
                  <SpreadsheetCell
                    key={getCellKey(col.id, row.id)}
                    columnId={col.id}
                    rowId={row.id}
                    cellData={getCellData(col.id, row.id)}
                    onUpdate={updateCell}
                    onSelect={handleCellSelect}
                    isReadOnly={isReadOnly}
                    isSelected={
                      selectedCell?.columnId === col.id &&
                      selectedCell?.rowId === row.id
                    }
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Underline icon component (not in icons folder)
function UnderlineIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 3v7a6 6 0 0 0 12 0V3M4 21h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SpreadsheetCellProps {
  columnId: string;
  rowId: string;
  cellData: ImmutableCell | null;
  onUpdate: (columnId: string, rowId: string, value: string) => void;
  onSelect: (columnId: string, rowId: string) => void;
  isReadOnly: boolean;
  isSelected: boolean;
}

function SpreadsheetCell({
  columnId,
  rowId,
  cellData,
  onUpdate,
  onSelect,
  isReadOnly,
  isSelected,
}: SpreadsheetCellProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onUpdate(columnId, rowId, e.target.value);
    },
    [columnId, rowId, onUpdate]
  );

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      e.target.select();
      onSelect(columnId, rowId);
    },
    [columnId, rowId, onSelect]
  );

  const format = cellData?.format;
  const cellStyle: CSSProperties = {
    fontWeight: format?.bold ? "bold" : undefined,
    fontStyle: format?.italic ? "italic" : undefined,
    textDecoration: format?.underline ? "underline" : undefined,
    textAlign: format?.textAlign || "left",
    color: format?.textColor,
    backgroundColor: format?.bgColor,
  };

  return (
    <td className={`${styles.cell} ${isSelected ? styles.cellSelected : ""}`}>
      <input
        type="text"
        className={styles.cellInput}
        value={cellData?.value ?? ""}
        onChange={handleChange}
        onFocus={handleFocus}
        readOnly={isReadOnly}
        style={cellStyle}
      />
    </td>
  );
}
