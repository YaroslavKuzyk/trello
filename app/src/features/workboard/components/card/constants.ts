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

// Заголовок секції всередині модалки картки (Content, Checklist, Materials…).
export const DIALOG_SECTION_TITLE =
  "flex items-center gap-2 text-sm font-medium";

// Олівець редагування секції: з'являється на ховер/фокус самої секції,
// на тач-екранах видимий завжди — там ховера не існує.
export const REVEAL_ON_SECTION_HOVER =
  "opacity-0 transition-opacity group-hover/section:opacity-100 " +
  "group-focus-within/section:opacity-100 max-md:opacity-100";

// Кнопка редагування позиційована абсолютно у правому верхньому куті картки.
// Без обкладинки вона накриває верхні рядки контенту, тож їм потрібен відступ.
export const RESERVE_ACTION = "pr-10";
