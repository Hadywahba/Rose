export type Notification = {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link: string;
  createdAt: string;
  updatedAt: string;
};

export type NotificationsResponse = {
  data: Notification[];
  metadata: MetaData;
};

export type MarkAllNotificationsAsReadResponse = {
  status: boolean;
  code: number;
  message: string;
};
