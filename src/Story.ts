export type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
  page: number;
  list: Array<Story>;
  concat: any;
  filter: any;
};
