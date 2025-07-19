declare module 'aos' {
  interface AosOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    offset?: number;
    delay?: number;
    disable?: boolean | ((mediaQuery: string, width: number, height: number) => boolean);
  }

  interface Aos {
    init(options?: AosOptions): void;
    refresh(hard?: boolean): void;
    refreshHard(): void;
  }

  const aos: Aos;
  export = aos;
} 