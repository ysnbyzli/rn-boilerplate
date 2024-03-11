import {
  Text as RNText,
  TextStyle,
  TextProps as RNTextProps,
} from "react-native";
import { UITextView } from "react-native-uitextview";

import { useTheme, atoms, web, flatten } from "#/alf";
import { isIOS } from "#/platform/detection";

export type TextProps = RNTextProps & {
  /**
   * Lets the user select text, to use the native copy and paste functionality.
   */
  selectable?: boolean;
};

/**
 * Util to calculate lineHeight from a text size atom and a leading atom
 *
 * Example:
 *   `leading(atoms.text_md, atoms.leading_normal)` // => 24
 */
export function leading<
  Size extends { fontSize?: number },
  Leading extends { lineHeight?: number }
>(textSize: Size, leading: Leading) {
  const size = textSize?.fontSize || atoms.text_md.fontSize;
  const lineHeight = leading?.lineHeight || atoms.leading_normal.lineHeight;
  return Math.round(size * lineHeight);
}

/**
 * Ensures that `lineHeight` defaults to a relative value of `1`, or applies
 * other relative leading atoms.
 *
 * If the `lineHeight` value is > 2, we assume it's an absolute value and
 * returns it as-is.
 */
function normalizeTextStyles(styles: TextStyle[]) {
  const s = flatten(styles);
  // should always be defined on these components
  const fontSize = s.fontSize || atoms.text_md.fontSize;

  if (s?.lineHeight) {
    if (s.lineHeight <= 2) {
      s.lineHeight = Math.round(fontSize * s.lineHeight);
    }
  } else {
    s.lineHeight = fontSize;
  }

  return s;
}

/**
 * Our main text component. Use this most of the time.
 */
export function Text({ style, selectable, ...rest }: TextProps) {
  const t = useTheme();
  const s = normalizeTextStyles([atoms.text_sm, t.atoms.text, flatten(style)]);
  return selectable && isIOS ? (
    <UITextView style={s} {...rest} />
  ) : (
    <RNText selectable={selectable} style={s} {...rest} />
  );
}

export function H1({ style, selectable, ...rest }: TextProps) {
  const t = useTheme();
  const s = normalizeTextStyles([
    atoms.text_5xl,
    atoms.font_bold,
    t.atoms.text,
    flatten(style),
  ]);

  return selectable && isIOS ? (
    <UITextView style={s} {...rest} />
  ) : (
    <RNText {...rest} style={s} />
  );
}

export function H2({ style, selectable, ...rest }: TextProps) {
  const t = useTheme();
  const s = normalizeTextStyles([
    atoms.text_4xl,
    atoms.font_bold,
    t.atoms.text,
    flatten(style),
  ]);

  return selectable && isIOS ? (
    <UITextView style={s} {...rest} />
  ) : (
    <RNText {...rest} style={s} />
  );
}

export function H3({ style, selectable, ...rest }: TextProps) {
  const t = useTheme();
  const s = normalizeTextStyles([
    atoms.text_3xl,
    atoms.font_bold,
    t.atoms.text,
    flatten(style),
  ]);

  return selectable && isIOS ? (
    <UITextView style={s} {...rest} />
  ) : (
    <RNText {...rest} style={s} />
  );
}

export function H4({ style, selectable, ...rest }: TextProps) {
  const t = useTheme();
  const s = normalizeTextStyles([
    atoms.text_2xl,
    atoms.font_bold,
    t.atoms.text,
    flatten(style),
  ]);

  return selectable && isIOS ? (
    <UITextView style={s} {...rest} />
  ) : (
    <RNText {...rest} style={s} />
  );
}

export function H5({ style, selectable, ...rest }: TextProps) {
  const t = useTheme();
  const s = normalizeTextStyles([
    atoms.text_xl,
    atoms.font_bold,
    t.atoms.text,
    flatten(style),
  ]);

  return selectable && isIOS ? (
    <UITextView style={s} {...rest} />
  ) : (
    <RNText {...rest} style={s} />
  );
}

export function H6({ style, selectable, ...rest }: TextProps) {
  const t = useTheme();
  const s = normalizeTextStyles([
    atoms.text_lg,
    atoms.font_bold,
    t.atoms.text,
    flatten(style),
  ]);

  return selectable && isIOS ? (
    <UITextView style={s} {...rest} />
  ) : (
    <RNText {...rest} style={s} />
  );
}

export function P({ style, selectable, ...rest }: TextProps) {
  const t = useTheme();
  const s = normalizeTextStyles([
    atoms.text_md,
    atoms.leading_normal,
    t.atoms.text,
    flatten(style),
  ]);

  return selectable && isIOS ? (
    <UITextView style={s} {...rest} />
  ) : (
    <RNText {...rest} style={s} />
  );
}
