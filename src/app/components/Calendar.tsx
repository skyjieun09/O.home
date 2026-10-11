"use client";

import { useState } from "react";

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0~11
  const [selected, setSelected] = useState<number | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const weekNames = ["일", "월", "화", "수", "목", "금", "토"];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= lastDate; d++) cells.push(d);

  function goPrev() {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
    setSelected(null);
  }

  function goNext() {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
    setSelected(null);
  }

  const isToday = (d: number) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div style={{ maxWidth: 320, padding: 16, border: "1px solid #ccc", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={goPrev}>◀</button>
        <strong>{year}년 {month + 1}월</strong>
        <button onClick={goNext}>▶</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", gap: 4 }}>
        {weekNames.map((w) => (
          <div key={w} style={{ fontWeight: "bold", fontSize: 13 }}>{w}</div>
        ))}

        {cells.map((d, i) => (
          <div
            key={i}
            onClick={() => d && setSelected(d)}
            style={{
              padding: "8px 0",
              borderRadius: 8,
              cursor: d ? "pointer" : "default",
              background: d === selected ? "#4f46e5" : isToday(d ?? -1) ? "#e0e7ff" : "transparent",
              color: d === selected ? "#fff" : "inherit",
            }}
          >
            {d ?? ""}
          </div>
        ))}
      </div>

      {selected && (
        <p style={{ marginTop: 12, fontSize: 14 }}>
          선택한 날짜: {year}-{String(month + 1).padStart(2, "0")}-{String(selected).padStart(2, "0")}
        </p>
      )}
    </div>
  );
}
