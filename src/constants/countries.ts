export type Country = {
  abbr?: string;
  code?: string;
  mask: string | RegExp;
  name?: string;
  placeholder?: string;
  test: RegExp;
};

export const COUNTRIES: Record<string, Country> = {
  Russia: {
    abbr: "RU",
    code: "7",
    mask: "+{7} (000) 000-00-00",
    test: /^7\d{10}$/,
  },
  Belarus: {
    abbr: "BY",
    code: "375",
    mask: "+{375} (00) 000-00-00",
    test: /^375\d{10}$/,
  },
  Kazakhstan: {
    abbr: "KZ",
    code: "7",
    mask: "+{7} (000) 000-00-00",
    test: /^7\d{10}$/,
  },
  Kyrgyzstan: {
    abbr: "KG",
    code: "996",
    mask: "+{996} (000) 00-00-00",
    test: /^996\d{9}$/,
  },
  Turkey: {
    abbr: "TR",
    code: "90",
    mask: "+{9\\0} (000) 000-00-00",
    test: /^90\d{10}$/,
  },
  China: {
    abbr: "CN",
    code: "86",
    mask: "+{86} (000) `0000-000`[0]",
    placeholder: "+86 (___) ____-____",
    test: /^86\d{10,11}$/,
  },
  Unknown: {
    abbr: "UNKNOWN",
    code: undefined,
    mask: /^(\+){0,1}([\d\s()-])*$/,
    test: /.*/,
  },
};

export const DIRECTORIES = {
  Russia: 191,
  Belarus: 36,
  Kazakhstan: 125,
  Kyrgyzstan: 116,
  Turkey: 225,
  China: 48,
};
