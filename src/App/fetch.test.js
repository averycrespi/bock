import { fetchGroups } from "./fetch";

describe("test App fetch", () => {
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
          "swp-2012-37": {
            label: "Staff Working Paper 2012-37",
            link: "https://www.bankofcanada.ca/valet/groups/swp-2012-37",
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
      {
        name: "swp-2012-37",
        label: "Staff Working Paper 2012-37",
        link: "https://www.bankofcanada.ca/valet/groups/swp-2012-37",
      },
    ]);
  });

  test("fetch groups with empty labels", () => {
    fetch.once(
      JSON.stringify({
        terms: {
          url: "https://www.bankofcanada.ca/terms/",
        },
        groups: {
          "sdp-2012-8": {
            label: " ",
            link: "https://www.bankofcanada.ca/valet/groups/sdp-2012-8",
          },
        },
      })
    );
    return expect(fetchGroups()).resolves.toStrictEqual([]);
  });
});
