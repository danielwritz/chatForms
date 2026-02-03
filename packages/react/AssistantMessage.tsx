import React from "react"

import {
  AssistantMessage as AssistantMessageType,
  ChatFormBlock,
} from "../core/schema"

export type SelectionValue = string | string[] | boolean

export interface AssistantMessageProps {
  message: AssistantMessageType
  selections: Record<string, SelectionValue>
  onSelectionChange: (id: string, value: SelectionValue) => void
}

const renderLabel = (block: ChatFormBlock) =>
  block.label ? <p>{block.label}</p> : null

const isSelected = (value: SelectionValue, optionId: string) =>
  Array.isArray(value) ? value.includes(optionId) : value === optionId

const toggleMulti = (value: SelectionValue, optionId: string) => {
  const current = Array.isArray(value) ? value : []
  if (current.includes(optionId)) {
    return current.filter((id) => id !== optionId)
  }
  return [...current, optionId]
}

const SingleChoice = ({
  block,
  value,
  onChange,
}: {
  block: ChatFormBlock
  value: SelectionValue
  onChange: (value: SelectionValue) => void
}) => (
  <div>
    {renderLabel(block)}
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {block.options?.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            backgroundColor: isSelected(value, option.id) ? "#111827" : "#fff",
            color: isSelected(value, option.id) ? "#fff" : "#111827",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
)

const MultiChoice = ({
  block,
  value,
  onChange,
}: {
  block: ChatFormBlock
  value: SelectionValue
  onChange: (value: SelectionValue) => void
}) => (
  <div>
    {renderLabel(block)}
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {block.options?.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(toggleMulti(value, option.id))}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            backgroundColor: isSelected(value, option.id) ? "#111827" : "#fff",
            color: isSelected(value, option.id) ? "#fff" : "#111827",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
)

const Dropdown = ({
  block,
  value,
  onChange,
}: {
  block: ChatFormBlock
  value: SelectionValue
  onChange: (value: SelectionValue) => void
}) => (
  <label>
    {renderLabel(block)}
    <select
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(event.target.value)}
      style={{ padding: 6, borderRadius: 6, marginTop: 4 }}
    >
      <option value="" disabled>
        Select an option
      </option>
      {block.options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
)

const InputField = ({
  block,
  value,
  onChange,
}: {
  block: ChatFormBlock
  value: SelectionValue
  onChange: (value: SelectionValue) => void
}) => (
  <label>
    {renderLabel(block)}
    <input
      type="text"
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(event.target.value)}
      style={{
        display: "block",
        padding: 6,
        borderRadius: 6,
        marginTop: 4,
        border: "1px solid #ccc",
      }}
    />
  </label>
)

const Confirm = ({
  block,
  value,
  onChange,
}: {
  block: ChatFormBlock
  value: SelectionValue
  onChange: (value: SelectionValue) => void
}) => (
  <div>
    {renderLabel(block)}
    <div style={{ display: "flex", gap: 8 }}>
      <button
        type="button"
        onClick={() => onChange(true)}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          backgroundColor: value === true ? "#16a34a" : "#fff",
          color: value === true ? "#fff" : "#111827",
        }}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          backgroundColor: value === false ? "#dc2626" : "#fff",
          color: value === false ? "#fff" : "#111827",
        }}
      >
        No
      </button>
    </div>
  </div>
)

const renderBlock = ({
  block,
  value,
  onChange,
}: {
  block: ChatFormBlock
  value: SelectionValue
  onChange: (value: SelectionValue) => void
}) => {
  switch (block.type) {
    case "single_choice":
      return <SingleChoice block={block} value={value} onChange={onChange} />
    case "multi_choice":
      return <MultiChoice block={block} value={value} onChange={onChange} />
    case "dropdown":
      return <Dropdown block={block} value={value} onChange={onChange} />
    case "input":
      return <InputField block={block} value={value} onChange={onChange} />
    case "confirm":
      return <Confirm block={block} value={value} onChange={onChange} />
    default:
      return null
  }
}

export const AssistantMessage = ({
  message,
  selections,
  onSelectionChange,
}: AssistantMessageProps) => {
  const block = message.ui

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <p style={{ margin: 0 }}>{message.content}</p>
      {block
        ? renderBlock({
            block,
            value: selections[block.id],
            onChange: (value) => onSelectionChange(block.id, value),
          })
        : null}
    </div>
  )
}
