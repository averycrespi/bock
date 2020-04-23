import { fetchSeriesDetails } from "./common";

describe("test series details fetch", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("fetch series details", () => {
    fetch.once(
      JSON.stringify({
        terms: {
          url: "https://www.bankofcanada.ca/terms/",
        },
        seriesDetail: {
          FXUSDCAD: {
            label: "USD/CAD",
            description: "US dollar to Canadian dollar daily exchange rate",
            dimension: {
              key: "d",
              name: "date",
            },
          },
        },
        observations: [
          {
            d: "2020-04-07",
            FXUSDCAD: {
              v: "1.3986",
            },
          },
          {
            d: "2020-04-06",
            FXUSDCAD: {
              v: "1.4127",
            },
          },
        ],
      })
    );
    return expect(fetchSeriesDetails("FXUSDCAD")).resolves.toStrictEqual({
      name: "FXUSDCAD",
      label: "USD/CAD",
      description: "US dollar to Canadian dollar daily exchange rate",
      observations: [
        { date: "2020-04-06", value: 1.4127 },
        { date: "2020-04-07", value: 1.3986 },
      ],
    });
  });
});
