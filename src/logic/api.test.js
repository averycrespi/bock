import {
  fetchGroups,
  fetchGroupDetails,
  fetchSeriesDetails,
  fetchObservations,
} from "./api";

describe("testing api", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("fetch groups", () => {
    fetch.once(
      JSON.stringify({
        terms: {
          url: "https://www.bankofcanada.ca/terms/",
        },
        groups: {
          "sdp-2012-8": {
            label: "Staff Discussion Paper 2012-8",
            link: "https://www.bankofcanada.ca/valet/groups/sdp-2012-8",
          },
        },
      })
    );
    return expect(fetchGroups()).resolves.toStrictEqual([
      {
        name: "sdp-2012-8",
        label: "Staff Discussion Paper 2012-8",
        link: "https://www.bankofcanada.ca/valet/groups/sdp-2012-8",
      },
    ]);
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
      ],
    });
  });

  test("fetch series details", () => {
    fetch.once(
      JSON.stringify({
        terms: {
          url: "https://www.bankofcanada.ca/terms/",
        },
        seriesDetails: {
          name: "FXAUDCAD",
          label: "AUD/CAD",
          description:
            "Australian dollar to Canadian dollar daily exchange rate",
        },
      })
    );
    return expect(fetchSeriesDetails("FXAUDCAD")).resolves.toStrictEqual({
      name: "FXAUDCAD",
      label: "AUD/CAD",
      description: "Australian dollar to Canadian dollar daily exchange rate",
    });
  });

  test("fetch observations", () => {
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
            d: "2020-04-03",
            FXUSDCAD: {
              v: "1.4142",
            },
          },
        ],
      })
    );
    return expect(fetchObservations("FXUSDCAD")).resolves.toStrictEqual([
      { date: "2020-04-03", value: 1.4142 },
    ]);
  });
});
