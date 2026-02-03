import React, { useState } from "react"

import {
  AssistantMessage,
  AssistantMessageType,
  serializeSelections,
} from "../packages/react"

const assistantMessage: AssistantMessageType = {
  role: "assistant",
  content: "I need one more detail before continuing.",
  ui: {
    id: "priority_level",
    type: "single_choice",
    label: "How urgent is this?",
    options: [
      { id: "low", label: "Low priority" },
      { id: "medium", label: "Medium priority" },
      { id: "high", label: "High priority" },
    ],
    required: true,
  },
}

export const App = () => {
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [payload, setPayload] = useState<string>("")

  return (
    <div style={{ fontFamily: "sans-serif", padding: 32, maxWidth: 480 }}>
      <h1>ChatForms Playground</h1>
      <AssistantMessage
        message={assistantMessage}
        selections={selections}
        onSelectionChange={(id, value) =>
          setSelections((prev) => ({ ...prev, [id]: value as string }))
        }
      />
      <button
        type="button"
        onClick={() => {
          const result = serializeSelections({
            userInput: "This blocks a customer launch",
            selections,
          })
          setPayload(JSON.stringify(result, null, 2))
        }}
        style={{ marginTop: 16, padding: "8px 14px" }}
      >
        Serialize selections
      </button>
      {payload ? (
        <pre
          style={{
            marginTop: 16,
            padding: 12,
            background: "#f3f4f6",
            borderRadius: 8,
          }}
        >
          {payload}
        </pre>
      ) : null}
    </div>
  )
}
