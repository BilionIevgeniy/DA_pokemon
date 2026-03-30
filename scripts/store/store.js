import { initialState } from "../../db.js";
import { ACTION_HANDLERS } from "./hendlers.js";

export let state = { ...initialState };

export async function applyAction(action, payload = {}) {
  const handler =
    ACTION_HANDLERS[action] ||
    function () {
      console.warn("no action: " + action);
    };
  state = await handler(state, payload);
}
