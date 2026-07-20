"use strict";

const TsFetchType = `export type ApiResponse<T = unknown> = {
  data: T;
  status: number;
};
`;

module.exports = { TsFetchType };
