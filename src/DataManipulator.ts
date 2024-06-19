import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  timestamp: Date,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const timestamp1 = serverResponds[0].timestamp
    const timestamp2 = serverResponds[1].timestamp
    const upperbound = 1.05;
    const lowerbound = 0.95;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      timestamp: timestamp1 > timestamp2 ? timestamp1 : timestamp2,
      ratio,
      upper_bound: upperbound,
      lower_bound: lowerbound,
      trigger_alert: (ratio > upperbound || ratio < lowerbound) ? ratio : undefined,
    };
  }
}
