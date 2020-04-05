import { fetchGroups } from "./api";

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
});
