import { UserMessage } from "./schema"

export interface SerializeSelectionsInput {
  userInput: string
  selections: Record<string, string | string[] | boolean>
}

export const serializeSelections = ({
  userInput,
  selections,
}: SerializeSelectionsInput): UserMessage => ({
  role: "user",
  content: userInput,
  structured_selections: selections,
})
