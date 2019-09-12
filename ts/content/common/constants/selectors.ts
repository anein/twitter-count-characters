export enum Selector {
  COUNTER = 'visible-counter',
  CIRCLE = 'js-progress-circle',
  TEXTAREA = 'textarea',
  M_BUTTON = "[data-testid='tweet-button']:not(.button-clone)",
  M_PROGRESSBAR = "[role='progressbar']",
  W_BUTTON = 'button.tweet-action:not(.button-clone)',
  W_COUNTDOWN_COUNTER = 'tweet-counter',
  W_BOX_EDITOR = '.tweet-box.rich-editor',
  BUTTON_CLONE = 'button-clone',
}

export enum TD_Selector {
  SOURCE_COUNTER = 'js-character-count',
  BUTTON = 'js-send-button',
}
export enum WEB_Selector {
  CIRCLE = "div[role='progressbar']",
  BUTTON = "div[data-testid='tweetButtonInline']",
  TOOLBAR_RIGHT_PANEL = "div[data-testid='toolBar'] div:nth-child(2)",
  MODAL = "div[aria-labelledby='modal-header']",
  COLUMN = "div[data-testid='primaryColumn']",
}
