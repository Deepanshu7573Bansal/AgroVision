// Simple mock prediction — replace with real model call later.
const diseases = [
  "Bacterial Spot",
  "Late Blight",
  "Yellow Leaf Curl Virus",
  "Septoria Leaf Spot",
  "Early Blight",
  "Healthy"
];

export function runMockPrediction({ modelName, filename }) {
  // deterministic-ish based on filename
  const idx = Math.abs(
    [...filename].reduce((s, ch) => s + ch.charCodeAt(0), 0)
  ) % diseases.length;
  const disease = diseases[idx];
  // pretend confidence higher for ResNet
  let base = 70 + (idx % 20);
  if (modelName && modelName.toLowerCase().includes("resnet")) base += 8;
  if (base > 99) base = 99;
  const confidence = Math.round(base + Math.random() * (100 - base));
  return { disease, confidence };
}
