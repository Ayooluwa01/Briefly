import { Text, TextProps } from "react-native";

export function ThemedText({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-slate-900 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
}

// Headings
export function H1({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-4xl font-inter-black text-slate-900 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
}

export function H2({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-3xl font-inter-bold text-slate-900 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
}

export function H3({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-2xl font-inter-semibold text-slate-900 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
}

export function H4({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-xl font-inter-semibold text-slate-900 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
}

// Body Text
export function BodyLarge({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-lg font-inter text-slate-900 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
}

export function Body({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-base font-inter text-slate-900 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
}

export function BodySmall({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-sm font-inter font-medium text-slate-900 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
}

// Supporting Text
export function Caption({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-xs font-inter text-slate-600 dark:text-slate-400 ${className}`}
      {...props}
    />
  );
}

export function Label({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-sm font-inter-medium text-slate-700 dark:text-slate-300 ${className}`}
      {...props}
    />
  );
}

// Secondary Text (for less important content)
export function TextSecondary({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-base font-inter text-slate-600 dark:text-slate-300 ${className}`}
      {...props}
    />
  );
}

// Tertiary Text (for least important content)
export function TextTertiary({ className = "", ...props }: TextProps) {
  return (
    <Text
      className={`text-base font-inter text-slate-400 dark:text-slate-500 ${className}`}
      {...props}
    />
  );
}
