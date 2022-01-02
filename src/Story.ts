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

export type ListProps = {
  list?: Story;
  data: Story[];
  onRemoveItem: (item: Story) => void;
};

export type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  // what is void?????
};
