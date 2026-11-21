import type { Memorial } from "@/lib/store";

function loadCardPhoto(photo: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("photo"));
    image.src = photo;
  });
}

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function createMemorialCardBlob(memorial: Memorial, photo: string | null): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.fillStyle = "#f7f3ec";
  ctx.fillRect(0, 0, 1080, 1350);
  ctx.strokeStyle = "#d8c8ae";
  ctx.lineWidth = 3;
  ctx.strokeRect(38, 38, 1004, 1274);
  ctx.strokeStyle = "#e7dccb";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(58, 58, 964, 1234);

  ctx.textAlign = "center";
  ctx.fillStyle = "#6b827f";
  ctx.font = "500 24px Arial, sans-serif";
  ctx.fillText("GENTLEWICK  ·  IN LOVING MEMORY", 540, 150);
  ctx.strokeStyle = "#c7a46c";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(420, 190);
  ctx.lineTo(510, 190);
  ctx.moveTo(570, 190);
  ctx.lineTo(660, 190);
  ctx.stroke();

  const circleX = 540, circleY = 430, radius = 190;
  ctx.save();
  ctx.beginPath();
  ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#efe6d6";
  ctx.fillRect(circleX - radius, circleY - radius, radius * 2, radius * 2);
  if (photo) {
    const image = await loadCardPhoto(photo);
    const scale = Math.max((radius * 2) / image.width, (radius * 2) / image.height);
    const w = image.width * scale, h = image.height * scale;
    ctx.drawImage(image, circleX - w / 2, circleY - h / 2, w, h);
  } else {
    ctx.fillStyle = "#3f6d82";
    ctx.font = "96px Georgia, serif";
    ctx.fillText(memorial.name.trim().charAt(0).toUpperCase() || "·", circleX, circleY + 32);
  }
  ctx.restore();
  ctx.strokeStyle = "#d4b16a";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(circleX, circleY, radius + 7, 0, Math.PI * 2);
  ctx.stroke();

  const nameSize = Math.min(76, Math.max(42, 1000 / Math.max(1, memorial.name.length) * 2.5));
  ctx.fillStyle = "#2a2622";
  ctx.font = `600 ${nameSize}px Georgia, serif`;
  ctx.fillText(memorial.name, 540, 720, 900);
  const dates = [memorial.years, memorial.departed].filter(Boolean).join("  ·  ");
  ctx.fillStyle = "#6f675f";
  ctx.font = "30px Arial, sans-serif";
  if (dates) ctx.fillText(dates, 540, 780, 900);

  if (memorial.dedication.trim()) {
    ctx.fillStyle = "#433d38";
    ctx.font = "italic 34px Georgia, serif";
    const lines = wrapCanvasText(ctx, memorial.dedication.trim(), 790).slice(0, 4);
    const startY = 850 - (lines.length - 1) * 22;
    lines.forEach((line, index) => ctx.fillText(line, 540, startY + index * 54));
  }

  ctx.fillStyle = "#c9a15b";
  ctx.beginPath();
  ctx.moveTo(540, 1075);
  ctx.bezierCurveTo(565, 1040, 568, 1024, 540, 990);
  ctx.bezierCurveTo(515, 1026, 512, 1045, 540, 1075);
  ctx.fill();
  ctx.fillStyle = "#fff6e4";
  ctx.beginPath();
  ctx.moveTo(540, 1062);
  ctx.bezierCurveTo(551, 1044, 550, 1036, 540, 1022);
  ctx.bezierCurveTo(530, 1037, 529, 1048, 540, 1062);
  ctx.fill();
  ctx.fillStyle = "#e9dfcf";
  ctx.fillRect(510, 1080, 60, 90);
  ctx.strokeStyle = "#d4b16a";
  ctx.lineWidth = 2;
  ctx.strokeRect(510, 1080, 60, 90);
  ctx.fillStyle = "#6b827f";
  ctx.font = "24px Arial, sans-serif";
  ctx.fillText("A little light. A lifetime of love.", 540, 1220);
  ctx.fillStyle = "#6f675f";
  ctx.font = "22px Arial, sans-serif";
  ctx.fillText("gentlewick.com", 540, 1260);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("export")), "image/png");
  });
}

export function downloadMemorialCard(blob: Blob, slug: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slug || "memorial"}-keepsake.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
