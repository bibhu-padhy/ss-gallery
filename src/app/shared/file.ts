export interface FileDataModel {
  folderId: string;
  name: string;
  size: number;
  type: string;
  uid: string;
  url: string;
  date: Date;
  tags: TagsDataType[] | Array<string>;
}

interface TagsDataType {
  document: string;
  bankDocument: string;
  kycDocument: string
}
