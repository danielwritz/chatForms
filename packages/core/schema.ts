export type ChatFormType =
  | "single_choice"
  | "multi_choice"
  | "dropdown"
  | "input"
  | "confirm"

export interface ChatFormOption {
  id: string
  label: string
}

export interface ChatFormBlock {
  id: string
  type: ChatFormType
  label?: string
  options?: ChatFormOption[]
  required?: boolean
}

export interface AssistantMessage {
  role: "assistant"
  content: string
  ui?: ChatFormBlock
}

export interface UserMessage {
  role: "user"
  content: string
  structured_selections?: Record<string, string | string[] | boolean>
}
