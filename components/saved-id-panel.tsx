"use client";

import { FormEvent, useState } from "react";
import type { Hub } from "@/lib/catalog";
import {
  MAX_SAVED_IDS_PER_HUB,
  addSavedId,
  deleteSavedId,
  lastUsedSavedId,
  maskGameId,
  updateSavedId,
  useSavedStore,
  type SavedGameId,
} from "@/lib/saved-ids";

export function SavedIdPanel({
  hub,
  selectedId,
  onSelect,
}: {
  hub: Hub;
  selectedId: string | null;
  onSelect: (saved: SavedGameId) => void;
}) {
  const store = useSavedStore();
  const ids = store.ids
    .filter((item) => item.hubId === hub.id)
    .sort((a, b) => {
      const aUsed = a.lastUsedAt ?? a.createdAt;
      const bUsed = b.lastUsedAt ?? b.createdAt;
      return bUsed.localeCompare(aUsed);
    });
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [editing, setEditing] = useState<SavedGameId | null>(null);
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("main");
  const [error, setError] = useState("");
  const last = lastUsedSavedId(hub.id);

  function startAdd() {
    setMode("add");
    setValue("");
    setLabel(ids.length ? "smurf" : "main");
    setError("");
  }

  function startEdit(item: SavedGameId) {
    setEditing(item);
    setValue(item.value);
    setLabel(item.label);
    setMode("edit");
    setError("");
  }

  function onSave(e: FormEvent) {
    e.preventDefault();
    if (mode === "edit" && editing) {
      const result = updateSavedId(editing.id, { value, label });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onSelect(result.saved);
      setMode("list");
      return;
    }
    const result = addSavedId(hub.id, value, label);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSelect(result.saved);
    setMode("list");
  }

  if (mode !== "list") {
    return (
      <form onSubmit={onSave} className="rounded-2xl border border-line bg-panel p-4">
        <p className="text-sm font-semibold">
          {mode === "edit" ? "Edit saved ID" : `Save a ${hub.idLabel}`}
        </p>
        <label className="mt-3 block text-xs text-muted">
          Short label
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="main"
            maxLength={16}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-gold"
          />
        </label>
        <label className="mt-3 block text-xs text-muted">
          {hub.idLabel}
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={hub.idPlaceholder}
            autoComplete="off"
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-base text-ink outline-none focus:border-gold"
          />
        </label>
        {error ? <p className="mt-2 text-sm text-rust">{error}</p> : null}
        <div className="mt-3 flex gap-2">
          <button
            type="submit"
            className="thumb-btn flex-1 rounded-full bg-gold text-sm font-semibold text-paper"
          >
            Save on this phone
          </button>
          <button
            type="button"
            onClick={() => setMode("list")}
            className="thumb-btn rounded-full border border-line px-4 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-2">
      {ids.length ? (
        <ul className="space-y-2">
          {ids.map((item) => {
            const selected = selectedId === item.id;
            return (
              <li
                key={item.id}
                className={`rounded-2xl border px-3 py-3 ${
                  selected ? "border-gold bg-panel" : "border-line bg-paper-2"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  className="w-full text-left"
                >
                  <p className="text-sm font-semibold">
                    {item.label}
                    {last?.id === item.id ? (
                      <span className="ml-2 text-[10px] font-medium tracking-wide text-gold uppercase">
                        last used
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-muted">{maskGameId(item.value)}</p>
                </button>
                <div className="mt-2 flex gap-3 text-xs">
                  <button
                    type="button"
                    className="text-teal underline-offset-4 hover:underline"
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-rust underline-offset-4 hover:underline"
                    onClick={() => {
                      deleteSavedId(item.id);
                      if (selectedId === item.id) {
                        const next = ids.find((row) => row.id !== item.id);
                        if (next) onSelect(next);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-muted">No saved {hub.idLabel.toLowerCase()} yet.</p>
      )}
      {ids.length < MAX_SAVED_IDS_PER_HUB ? (
        <button
          type="button"
          onClick={startAdd}
          className="text-sm text-gold underline-offset-4 hover:underline"
        >
          Save another ID
        </button>
      ) : (
        <p className="text-xs text-muted">Max {MAX_SAVED_IDS_PER_HUB} IDs on this hub.</p>
      )}
    </div>
  );
}
