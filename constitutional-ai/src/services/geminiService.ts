export const getConstitutionResponse = async (question: string) => {
  const res = await fetch("http://127.0.0.1:8000/api/predict/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch from backend");
  }

  const data = await res.json();

  return formatResponse(data);
};

// Convert Django response → Markdown chat text
const formatResponse = (data: any) => {
  if (!data?.predicted_answers?.length) {
    return "No relevant answers found.";
  }

  return data.predicted_answers
    .map(
      (item: any) =>
        `### Answer ${item.rank}

${item.answer}

**Confidence:** ${item.similarity}`
    )
    .join("\n\n---\n\n");
};