// Назва картки — це зазвичай коротке речення, тож ліміт більший, ніж у списку.
export const MAX_CARD_NAME_LENGTH = 200;

// Дії картки з'являються на ховер/фокус, але на тач-екранах видимі завжди.
export const REVEAL_ON_HOVER =
  "opacity-0 transition-opacity group-hover/task:opacity-100 " +
  "group-focus-within/task:opacity-100 max-md:opacity-100";

export const REVEAL_CHECKBOX =
  "w-0 opacity-0 transition-[width,opacity] " +
  "group-hover/task:w-4 group-hover/task:opacity-100 " +
  "group-focus-within/task:w-4 group-focus-within/task:opacity-100 " +
  "data-[state=checked]:w-4 data-[state=checked]:opacity-100 " +
  "max-md:w-4 max-md:opacity-100";

// Кнопка редагування позиційована абсолютно у правому верхньому куті картки.
// Без обкладинки вона накриває верхні рядки контенту, тож їм потрібен відступ.
export const RESERVE_ACTION = "pr-10";
