import nats, { Empty } from "nats";
import { Subjects } from "../subjects/Subjects";
interface Event {
  subject: Subjects;
  data: any;
}
export abstract class RequestPublisher<T extends Event> {
  abstract subject: T["subject"];
  protected client;
  constructor(client: any) {
    this.client = client;
  }
  async publish(data: T["data"]): Promise<any> {
    return new Promise<any>(async (res, rej) => {
      try {
        const response = await this.client.request(
          this.subject,
          JSON.stringify(data),
          {
            timeout: 5000,
          }
        );
        return res(response);
      } catch (error) {
        return rej(error);
      }
    });
  }
}
