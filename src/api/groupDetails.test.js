import { fetchGroupDetails } from "./groupDetails";

describe("test group details fetch", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("fetch group details", () => {
    fetch.once(
      JSON.stringify({
        terms: {
          url: "https://www.bankofcanada.ca/terms/",
        },
        groupDetails: {
          name: "FX_RATES_DAILY",
          label: "Daily exchange rates",
          description:
            "Daily average exchange rates - published once each business day by 16:30 ET. All Bank of Canada exchange rates are indicative rates only.",
          groupSeries: {
            FXAUDCAD: {
              label: "AUD/CAD",
              link: "https://www.bankofcanada.ca/valet/series/FXAUDCAD",
            },
            FXBRLCAD: {
              label: "BRL/CAD",
              link: "https://www.bankofcanada.ca/valet/series/FXBRLCAD",
            },
          },
        },
      })
    );

    return expect(fetchGroupDetails("FX_RATES_DAILY")).resolves.toStrictEqual({
      name: "FX_RATES_DAILY",
      label: "Daily exchange rates",
      description:
        "Daily average exchange rates - published once each business day by 16:30 ET. All Bank of Canada exchange rates are indicative rates only.",
      series: [
        {
          name: "FXAUDCAD",
          label: "AUD/CAD",
          link: "https://www.bankofcanada.ca/valet/series/FXAUDCAD",
        },
        {
          name: "FXBRLCAD",
          label: "BRL/CAD",
          link: "https://www.bankofcanada.ca/valet/series/FXBRLCAD",
        },
      ],
    });
  });
});
